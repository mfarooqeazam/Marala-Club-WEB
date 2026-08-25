import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { EQUIPMENT, type EquipmentKey } from "./Equipment";

/* ------------------------------------------------------------------ */
/*  Verlet rope                                                        */
/* ------------------------------------------------------------------ */

type Rope = {
  count: number;
  segLen: number;
  pos: THREE.Vector3[];
  prev: THREE.Vector3[];
  target: THREE.Vector3[];
  pinned: boolean[];
  /** Gravity multiplier per node. Nodes carrying equipment are heavier, so
   *  the line visibly loads up under each piece instead of hanging flat. */
  weight: number[];
};

const GRAVITY = new THREE.Vector3(0, -15, 0);
// Hoisted scratch vectors: step() runs every frame, so it must not allocate.
const _v = new THREE.Vector3();
const _d = new THREE.Vector3();

function createRope(count: number, span: number, segLen: number): Rope {
  const pos: THREE.Vector3[] = [];
  const prev: THREE.Vector3[] = [];
  const target: THREE.Vector3[] = [];
  const pinned: boolean[] = [];
  const weight: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const p = new THREE.Vector3(-span / 2 + t * span, ROPE_ANCHOR_Y, 0);
    pos.push(p);
    prev.push(p.clone());
    target.push(p.clone());
    pinned.push(false);
    weight.push(1);
  }
  pinned[0] = true;
  pinned[count - 1] = true;
  return { count, segLen, pos, prev, target, pinned, weight };
}

/**
 * One physics tick. Pinned nodes are snapped to their target *without*
 * touching prev, so (pos - prev) still holds the drag velocity — that is
 * what lets a released object fly off with the momentum you gave it.
 */
function step(r: Rope, dt: number, iterations = 12, damping = 0.978) {
  for (let i = 0; i < r.count; i++) {
    if (r.pinned[i]) {
      r.prev[i].copy(r.pos[i]);
      r.pos[i].copy(r.target[i]);
      continue;
    }
    _v.subVectors(r.pos[i], r.prev[i]).multiplyScalar(damping);
    r.prev[i].copy(r.pos[i]);
    r.pos[i].add(_v).addScaledVector(GRAVITY, dt * dt * r.weight[i]);
  }

  // Relaxation. Enough passes to distribute slack globally into a smooth
  // catenary; too few and it settles as standing waves instead of a drape.
  // The give under a hard pull comes from the solver still not fully
  // converging on a fast drag, which is exactly the elasticity we want.
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < r.count - 1; i++) {
      const a = r.pos[i];
      const b = r.pos[i + 1];
      _d.subVectors(b, a);
      const len = _d.length() || 1e-6;
      const diff = (len - r.segLen) / len;
      const wa = r.pinned[i] ? 0 : 1;
      const wb = r.pinned[i + 1] ? 0 : 1;
      const w = wa + wb;
      if (w === 0) continue;
      a.addScaledVector(_d, diff * (wa / w));
      b.addScaledVector(_d, -diff * (wb / w));
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Slots: which node each object hangs from, and what it currently is */
/* ------------------------------------------------------------------ */

const ROPE_COUNT = 58;
const ROPE_SPAN = 18;
// Rest length just over the node spacing (22/57 = 0.386) so the line carries
// a little slack and settles into a real catenary rather than a taut wire.
const ROPE_SEG = 0.335;
const ROPE_ANCHOR_Y = 3.2;
const SLOT_NODES = [9, 21, 29, 37, 49];
/** Equipment is modelled at roughly life proportion; scale it up to fill frame. */
const EQUIP_SCALE = 1.35;

const CYCLE: EquipmentKey[][] = [
  ["stick", "racket", "helmet"],
  ["paddle", "stick", "puck"],
  ["ball", "puck", "hockeyball"],
  ["racket", "paddle", "stick"],
  ["helmet", "hockeyball", "ball"],
];

type SlotState = {
  node: number;
  spinY: number;
  spinVel: number;
  swing: number;
  swingVel: number;
  scale: number;
  /** Counts down to the next morph; negative while mid-swap. */
  morphIn: number;
  cycleIdx: number;
};

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function Scene({
  onGrab,
  onLabel,
}: {
  onGrab: (held: boolean) => void;
  onLabel: (label: string | null) => void;
}) {
  const { camera } = useThree();
  const rope = useMemo(() => {
    const r = createRope(ROPE_COUNT, ROPE_SPAN, ROPE_SEG);
    // Spread each piece's weight over its node and the two either side, so
    // the line bows smoothly under the load rather than kinking at a point.
    SLOT_NODES.forEach((n) => {
      for (let k = -3; k <= 3; k++) {
        const idx = n + k;
        if (idx <= 0 || idx >= r.count - 1) continue;
        r.weight[idx] += 5.5 * Math.exp(-(k * k) / 3.2);
      }
    });
    return r;
  }, []);
  const ropeRef = useRef<THREE.Mesh>(null);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const hangRefs = useRef<(THREE.Group | null)[]>([]);

  const [types, setTypes] = useState<EquipmentKey[]>(() => CYCLE.map((c) => c[0]));

  const slots = useRef<SlotState[]>(
    SLOT_NODES.map((node, i) => ({
      node,
      spinY: i * 0.9,
      spinVel: 0,
      swing: 0,
      swingVel: 0,
      scale: 1,
      morphIn: 5 + i * 2.6,
      cycleIdx: 0,
    })),
  );

  const drag = useRef<{ slot: number; node: number } | null>(null);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const hitPoint = useMemo(() => new THREE.Vector3(), []);
  const lastHit = useRef(new THREE.Vector3());

  // Release anywhere, not just over the canvas.
  useEffect(() => {
    const up = () => {
      if (drag.current) {
        rope.pinned[drag.current.node] = false;
        drag.current = null;
        onGrab(false);
        onLabel(null);
      }
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [rope, onGrab, onLabel]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);

    // ---- drag: pin the grabbed node to the cursor's world position ----
    if (drag.current) {
      raycaster.setFromCamera(state.pointer, camera);
      if (raycaster.ray.intersectPlane(plane, hitPoint)) {
        const s = slots.current[drag.current.slot];
        // Horizontal drag speed spins the object on its own axis, so you
        // can whip it round and inspect the far side.
        s.spinVel += (hitPoint.x - lastHit.current.x) * 5.5;
        lastHit.current.copy(hitPoint);
        rope.target[drag.current.node].copy(hitPoint);
      }
    }

    step(rope, dt);

    // ---- rope tube ----
    if (ropeRef.current) {
      const curve = new THREE.CatmullRomCurve3(rope.pos, false, "catmullrom", 0.4);
      const geo = new THREE.TubeGeometry(curve, 130, 0.068, 8, false);
      ropeRef.current.geometry.dispose();
      ropeRef.current.geometry = geo;
    }

    // ---- objects ----
    for (let i = 0; i < slots.current.length; i++) {
      const s = slots.current[i];
      const g = groupRefs.current[i];
      if (!g) continue;

      const node = rope.pos[s.node];
      const nodePrev = rope.prev[s.node];
      const velX = node.x - nodePrev.x;

      // Pendulum: the object lags behind lateral motion, then springs back.
      const targetSwing = THREE.MathUtils.clamp(-velX * 4.5, -1.15, 1.15);
      s.swingVel += (targetSwing - s.swing) * 26 * dt;
      s.swingVel *= 0.9;
      s.swing += s.swingVel * dt;

      // Axis spin: idle drift + whatever momentum the drag imparted.
      s.spinVel *= 0.965;
      s.spinY += (s.spinVel + 0.28) * dt;

      // ---- morph: shrink out, swap type, grow back ----
      s.morphIn -= dt;
      if (s.morphIn > 0.55) {
        s.scale = THREE.MathUtils.lerp(s.scale, 1, 1 - Math.pow(0.001, dt));
      } else if (s.morphIn > 0) {
        s.scale = THREE.MathUtils.lerp(s.scale, 0.001, 1 - Math.pow(0.00001, dt));
        s.spinVel += 26 * dt;
      } else {
        s.cycleIdx = (s.cycleIdx + 1) % CYCLE[i].length;
        const next = CYCLE[i][s.cycleIdx];
        setTypes((prev) => {
          if (prev[i] === next) return prev;
          const out = prev.slice();
          out[i] = next;
          return out;
        });
        s.scale = 0.001;
        s.morphIn = 7 + Math.random() * 5;
      }

      // Outer group pivots at the attachment point, so the piece swings from
      // the line like it is actually hanging off it.
      g.position.copy(node);
      g.rotation.set(0, 0, s.swing);

      const inner = hangRefs.current[i];
      if (inner) {
        inner.rotation.y = s.spinY;
        inner.scale.setScalar(Math.max(0.001, s.scale) * EQUIP_SCALE);
      }
    }
  });

  return (
    <>
      {/* rope */}
      <mesh ref={ropeRef} castShadow>
        <tubeGeometry />
        <meshStandardMaterial color="#0B1F3A" metalness={0.25} roughness={0.6} />
      </mesh>

      {/* equipment */}
      {types.map((key, i) => {
        const entry = EQUIPMENT.find((e) => e.key === key)!;
        const Comp = entry.Component;
        return (
          <group
            key={i}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              raycaster.setFromCamera(e.pointer, camera);
              if (raycaster.ray.intersectPlane(plane, hitPoint)) {
                lastHit.current.copy(hitPoint);
              }
              drag.current = { slot: i, node: SLOT_NODES[i] };
              rope.pinned[SLOT_NODES[i]] = true;
              rope.target[SLOT_NODES[i]].copy(rope.pos[SLOT_NODES[i]]);
              onGrab(true);
              onLabel(entry.label);
            }}
            onPointerOver={() => {
              if (!drag.current) onLabel(entry.label);
            }}
            onPointerOut={() => {
              if (!drag.current) onLabel(null);
            }}
          >
            <group
              ref={(el) => {
                hangRefs.current[i] = el;
              }}
              position={[0, entry.hang * EQUIP_SCALE, 0]}
            >
              {/* Invisible grab volume: small parts like the ball are hard to
                  hit precisely, especially on touch. */}
              <mesh visible={false}>
                <sphereGeometry args={[entry.radius, 8, 6]} />
                <meshBasicMaterial />
              </mesh>
              <Comp />
            </group>
          </group>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Canvas wrapper                                                     */
/* ------------------------------------------------------------------ */

export default function SportsPlayground() {
  const [held, setHeld] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <div
      className="relative w-full bg-marala-white"
      style={{ height: "min(100vh, 940px)", cursor: held ? "grabbing" : "auto" }}
    >
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, -0.3, 12], fov: 46 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#F7FAFC"]} />
        <fog attach="fog" args={["#F7FAFC", 20, 44]} />

        {/* Key / fill / rim. The key casts the contact shadows. */}
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[6, 9, 8]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <directionalLight position={[-8, 4, -6]} intensity={0.7} color="#9FD8E8" />
        <directionalLight position={[0, -6, 4]} intensity={0.35} color="#FFD9B0" />

        {/* Studio reflections built in-scene, so nothing is fetched at runtime. */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={5} position={[0, 6, 6]} scale={[14, 6, 1]} />
          <Lightformer form="rect" intensity={2.2} position={[-8, 2, 4]} scale={[8, 8, 1]} />
          <Lightformer
            form="rect"
            intensity={2.6}
            position={[8, -2, 3]}
            scale={[8, 8, 1]}
            color="#CFE9F5"
          />
          <Lightformer form="ring" intensity={3} position={[0, 0, -8]} scale={[12, 12, 1]} />
        </Environment>

        {!reduce && <Scene onGrab={setHeld} onLabel={setLabel} />}
      </Canvas>

      {/* ---------- minimal UI ---------- */}
      <div className="pointer-events-none absolute inset-0 p-6 lg:p-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-marala-teal">
              Interactive
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none tracking-tight text-marala-navy lg:text-4xl">
              The Equipment
              <br />
              Line
            </h3>
          </div>
          <div className="font-display text-[0.6rem] uppercase tracking-[0.24em] text-marala-gray">
            Grab &middot; drag &middot; release
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
          <div className="flex items-end justify-between gap-4">
            <div className="h-6">
              <span
                className="font-display text-sm uppercase tracking-[0.2em] text-marala-navy transition-opacity duration-300"
                style={{ opacity: label ? 1 : 0 }}
              >
                {label ?? ""}
              </span>
            </div>
            <p className="max-w-xs text-right text-xs font-light leading-relaxed text-marala-gray">
              Every piece on this line is made under one roof. Pull one and the rest follow.
            </p>
          </div>
        </div>
      </div>

      {reduce && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-marala-gray">Motion reduced.</p>
        </div>
      )}
    </div>
  );
}
