import { useMemo } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Shared palette, keyed to the Marala theme                         */
/* ------------------------------------------------------------------ */

export const PALETTE = {
  carbon: "#12161C",
  carbonLit: "#232B35",
  navy: "#0B1F3A",
  teal: "#00A6A6",
  orange: "#F97316",
  lime: "#A3E635",
  bone: "#F7FAFC",
  rubber: "#15181D",
  wood: "#C8A268",
};

/** Lacquered composite: dark, glossy, picks up the environment map. */
function Composite({ color = PALETTE.carbon, ...rest }: { color?: string } & Record<string, unknown>) {
  return <meshStandardMaterial color={color} metalness={0.55} roughness={0.28} {...rest} />;
}

/** Matte grip rubber. */
function Rubber({ color = PALETTE.rubber }: { color?: string }) {
  return <meshStandardMaterial color={color} metalness={0.1} roughness={0.85} />;
}

/* ------------------------------------------------------------------ */
/*  Field hockey stick                                                 */
/* ------------------------------------------------------------------ */

export function HockeyStick() {
  const { shaft, grip, band } = useMemo(() => {
    // Shaft runs down the +Y axis then hooks forward into the head.
    const spine = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(0, 1.0, 0),
      new THREE.Vector3(0, 0.0, 0),
      new THREE.Vector3(0, -0.9, 0),
      new THREE.Vector3(-0.04, -1.5, 0),
      new THREE.Vector3(-0.24, -1.94, 0),
      new THREE.Vector3(-0.62, -2.16, 0),
      new THREE.Vector3(-0.95, -2.16, 0),
    ]);
    const gripCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.0, 0),
      new THREE.Vector3(0, 1.5, 0),
      new THREE.Vector3(0, 0.95, 0),
    ]);
    const bandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, -2.11, 0),
      new THREE.Vector3(-0.72, -2.16, 0),
      new THREE.Vector3(-0.95, -2.16, 0),
    ]);
    return {
      shaft: new THREE.TubeGeometry(spine, 120, 0.088, 14, false),
      grip: new THREE.TubeGeometry(gripCurve, 40, 0.102, 14, false),
      band: new THREE.TubeGeometry(bandCurve, 24, 0.094, 14, false),
    };
  }, []);

  return (
    // Flattened on Z so the round tube reads as a stick's oval cross-section.
    <group scale={[1, 1, 0.62]}>
      <mesh geometry={shaft} castShadow receiveShadow>
        <Composite />
      </mesh>
      <mesh geometry={grip} castShadow>
        <Rubber />
      </mesh>
      <mesh geometry={band} castShadow>
        <meshStandardMaterial color={PALETTE.lime} metalness={0.3} roughness={0.4} />
      </mesh>
      {/* toe cap */}
      <mesh position={[-0.95, -2.16, 0]} castShadow>
        <sphereGeometry args={[0.092, 20, 16]} />
        <meshStandardMaterial color={PALETTE.orange} metalness={0.35} roughness={0.35} />
      </mesh>
      {/* shaft decal ring */}
      <mesh position={[0, 0.86, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.092, 0.092, 0.055, 20]} />
        <meshStandardMaterial color={PALETTE.lime} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.74, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.091, 0.091, 0.025, 20]} />
        <meshStandardMaterial color={PALETTE.teal} metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Pickleball paddle                                                  */
/* ------------------------------------------------------------------ */

export function PickleballPaddle() {
  const face = useMemo(() => {
    const w = 0.6;
    const h = 0.92;
    const r = 0.26;
    const s = new THREE.Shape();
    s.moveTo(-w + r, -h);
    s.lineTo(w - r, -h);
    s.quadraticCurveTo(w, -h, w, -h + r);
    s.lineTo(w, h - r);
    s.quadraticCurveTo(w, h, w - r, h);
    s.lineTo(-w + r, h);
    s.quadraticCurveTo(-w, h, -w, h - r);
    s.lineTo(-w, -h + r);
    s.quadraticCurveTo(-w, -h, -w + r, -h);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSize: 0.028,
      bevelThickness: 0.026,
      bevelSegments: 5,
      curveSegments: 28,
    });
    g.center();
    return g;
  }, []);

  return (
    <group>
      <mesh geometry={face} position={[0, 0.72, 0]} castShadow receiveShadow>
        {/* Raw carbon face: matte, slightly rough, low metalness. */}
        <meshStandardMaterial color="#2A323D" metalness={0.35} roughness={0.62} />
      </mesh>
      {/* edge guard */}
      <mesh geometry={face} position={[0, 0.72, 0]} scale={[1.03, 1.02, 0.85]}>
        <meshStandardMaterial color={PALETTE.navy} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* throat */}
      <mesh position={[0, -0.16, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 0.42, 20]} />
        <Composite color={PALETTE.navy} />
      </mesh>
      {/* handle */}
      <mesh position={[0, -0.76, 0]} castShadow>
        <cylinderGeometry args={[0.093, 0.1, 0.86, 20]} />
        <Rubber />
      </mesh>
      {/* butt cap */}
      <mesh position={[0, -1.21, 0]} castShadow>
        <cylinderGeometry args={[0.115, 0.1, 0.09, 20]} />
        <meshStandardMaterial color={PALETTE.orange} metalness={0.3} roughness={0.45} />
      </mesh>
      {/* face accent stripe */}
      <mesh position={[0, 0.72, 0.05]}>
        <boxGeometry args={[0.78, 0.028, 0.012]} />
        <meshStandardMaterial
          color={PALETTE.teal}
          emissive={PALETTE.teal}
          emissiveIntensity={0.35}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Pickleball                                                         */
/* ------------------------------------------------------------------ */

export function PickleBall() {
  // Holes sit slightly inside the shell so they read as moulded, not painted.
  const holes = useMemo(() => {
    const out: THREE.Vector3[] = [];
    const n = 26;
    // Fibonacci sphere keeps the spacing even across the whole surface.
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      out.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
    }
    return out;
  }, []);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.42, 48, 40]} />
        <meshStandardMaterial color={PALETTE.orange} metalness={0.12} roughness={0.42} />
      </mesh>
      {holes.map((h, i) => (
        <mesh key={i} position={h.clone().multiplyScalar(0.405)}>
          <sphereGeometry args={[0.062, 14, 12]} />
          <meshStandardMaterial color="#4A1D05" metalness={0.05} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Hockey ball                                                        */
/* ------------------------------------------------------------------ */

export function HockeyBall() {
  const dimples = useMemo(() => {
    const out: THREE.Vector3[] = [];
    const n = 54;
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      out.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
    }
    return out;
  }, []);

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.38, 48, 40]} />
        <meshStandardMaterial color={PALETTE.bone} metalness={0.05} roughness={0.34} />
      </mesh>
      {dimples.map((d, i) => (
        <mesh key={i} position={d.clone().multiplyScalar(0.375)}>
          <sphereGeometry args={[0.04, 10, 8]} />
          <meshStandardMaterial color="#B7C2CF" metalness={0.05} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Puck                                                               */
/* ------------------------------------------------------------------ */

export function Puck() {
  // Knurled rim: a ring of thin boxes reads as the moulded edge grooves.
  const ridges = useMemo(() => Array.from({ length: 42 }, (_, i) => (i / 42) * Math.PI * 2), []);

  return (
    <group rotation={[Math.PI / 2.6, 0, 0.3]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.22, 56]} />
        <meshStandardMaterial color="#0E1116" metalness={0.2} roughness={0.66} />
      </mesh>
      {ridges.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.515, 0, Math.sin(a) * 0.515]} rotation={[0, -a, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.03]} />
          <meshStandardMaterial color="#1B2028" metalness={0.2} roughness={0.8} />
        </mesh>
      ))}
      {/* stamped face logo */}
      <mesh position={[0, 0.112, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.19, 0.25, 40]} />
        <meshStandardMaterial color={PALETTE.lime} metalness={0.2} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Racket                                                             */
/* ------------------------------------------------------------------ */

export function Racket() {
  const strings = useMemo(() => {
    const pts: number[] = [];
    const rx = 0.5;
    const ry = 0.66;
    for (let i = -4; i <= 4; i++) {
      const t = (i / 5) * rx;
      const y = ry * Math.sqrt(Math.max(0, 1 - (t / rx) ** 2));
      pts.push(t, -y, 0, t, y, 0);
    }
    for (let i = -5; i <= 5; i++) {
      const t = (i / 6) * ry;
      const x = rx * Math.sqrt(Math.max(0, 1 - (t / ry) ** 2));
      pts.push(-x, t, 0, x, t, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  return (
    <group>
      {/* head: a torus squashed into an ellipse */}
      <mesh position={[0, 0.72, 0]} scale={[0.86, 1.14, 1]} castShadow>
        <torusGeometry args={[0.58, 0.045, 16, 72]} />
        <Composite color={PALETTE.navy} />
      </mesh>
      <lineSegments geometry={strings} position={[0, 0.72, 0]}>
        <lineBasicMaterial color="#DCE4EC" transparent opacity={0.75} />
      </lineSegments>
      {/* throat arms */}
      <mesh position={[-0.24, 0.06, 0]} rotation={[0, 0, 0.34]} castShadow>
        <cylinderGeometry args={[0.036, 0.042, 0.6, 14]} />
        <Composite color={PALETTE.navy} />
      </mesh>
      <mesh position={[0.24, 0.06, 0]} rotation={[0, 0, -0.34]} castShadow>
        <cylinderGeometry args={[0.036, 0.042, 0.6, 14]} />
        <Composite color={PALETTE.navy} />
      </mesh>
      {/* handle */}
      <mesh position={[0, -0.52, 0]} castShadow>
        <cylinderGeometry args={[0.082, 0.09, 0.76, 18]} />
        <Rubber />
      </mesh>
      <mesh position={[0, -0.92, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.088, 0.08, 18]} />
        <meshStandardMaterial color={PALETTE.teal} metalness={0.3} roughness={0.45} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Helmet                                                             */
/* ------------------------------------------------------------------ */

export function Helmet() {
  return (
    <group rotation={[0.1, -0.5, 0]}>
      {/* shell */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.56, 40, 32, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <meshStandardMaterial
          color={PALETTE.navy}
          metalness={0.6}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* rolled rim */}
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.525, 0.04, 14, 56]} />
        <meshStandardMaterial color={PALETTE.carbonLit} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* visor */}
      <mesh position={[0, 0.06, 0.06]} rotation={[0.24, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 20, Math.PI * 0.16, Math.PI * 0.68, Math.PI * 0.28, Math.PI * 0.3]} />
        <meshPhysicalMaterial
          color="#8FD7D7"
          metalness={0.1}
          roughness={0.08}
          transmission={0.72}
          thickness={0.3}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* crown vent */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.03, 0.44]} />
        <meshStandardMaterial color={PALETTE.lime} metalness={0.3} roughness={0.45} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

/**
 * `hang` is how far below the rope node the object's local origin sits, so
 * that the top of each piece meets the line instead of the rope skewering
 * it through the middle. `radius` sizes the invisible grab volume.
 */
export const EQUIPMENT = [
  { key: "stick", label: "Field Hockey Stick", Component: HockeyStick, radius: 2.3, hang: -2.0 },
  { key: "paddle", label: "Pickleball Paddle", Component: PickleballPaddle, radius: 1.6, hang: -1.64 },
  { key: "ball", label: "Pickleball", Component: PickleBall, radius: 0.55, hang: -0.44 },
  { key: "racket", label: "Racket", Component: Racket, radius: 1.6, hang: -1.5 },
  { key: "puck", label: "Puck", Component: Puck, radius: 0.7, hang: -0.58 },
  { key: "hockeyball", label: "Match Ball", Component: HockeyBall, radius: 0.5, hang: -0.4 },
  { key: "helmet", label: "Helmet", Component: Helmet, radius: 0.8, hang: -0.62 },
] as const;

export type EquipmentKey = (typeof EQUIPMENT)[number]["key"];
