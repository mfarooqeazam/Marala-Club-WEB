import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------------
   CONTACT DETAILS — replace these placeholders with the real values.
   whatsappNumber: country code + number, digits only (no +, no spaces).
------------------------------------------------------------------ */
export const CONTACT = {
  whatsappNumber: '923001234567',
  whatsappMessage: "Hello Marala Club! I would like to enquire about your sporting goods.",
  email: 'info@maralaclub.com',
  phoneDisplay: '+92 300 123 4567',
  phoneHref: '+923001234567',
  instagram: 'https://instagram.com/maralaclub',
  instagramHandle: '@maralaclub',
  facebook: 'https://facebook.com/maralaclub',
  facebookHandle: 'Marala Club',
  location: 'Sialkot, Punjab, Pakistan',
};

export const whatsappHref =
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

/* Brand glyphs — lucide-react v1 no longer ships social brand icons. */
type IconProps = { className?: string };

export const WhatsAppIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

export const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0m0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0" />
  </svg>
);

export const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073" />
  </svg>
);

/* ------------------------------------------------------------------
   Floating WhatsApp button — fixed to the bottom-right corner so it
   travels with the page as the visitor scrolls through the site.
------------------------------------------------------------------ */
export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Marala Club on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-[60] flex items-center rounded-full bg-[#25D366] p-4 text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.75)] transition-[padding] duration-500 hover:pr-7 sm:bottom-8 sm:right-8"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon className="h-7 w-7 flex-shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-bold uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:ml-3 group-hover:max-w-[12rem] group-hover:opacity-100">
        Chat with us
      </span>
    </motion.a>
  );
}

/* ------------------------------------------------------------------
   Contact block for the end of the site (footer).
------------------------------------------------------------------ */
const socialLinks = [
  {
    name: 'Instagram',
    detail: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    Icon: InstagramIcon,
    hoverClass: 'group-hover:bg-[#E1306C]',
    external: true,
  },
  {
    name: 'Facebook',
    detail: CONTACT.facebookHandle,
    href: CONTACT.facebook,
    Icon: FacebookIcon,
    hoverClass: 'group-hover:bg-[#1877F2]',
    external: true,
  },
  {
    name: 'Email',
    detail: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    Icon: Mail,
    hoverClass: 'group-hover:bg-marala-orange',
    external: false,
  },
  {
    name: 'WhatsApp',
    detail: CONTACT.phoneDisplay,
    href: whatsappHref,
    Icon: WhatsAppIcon,
    hoverClass: 'group-hover:bg-[#25D366]',
    external: true,
  },
];

export function ContactInfo() {
  return (
    <div id="contact" className="grid gap-14 border-b border-marala-gray/20 pb-12 lg:grid-cols-2 lg:gap-20">
      <div>
        <span className="mb-6 inline-flex border-l-2 border-marala-orange pl-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-marala-orange">
          Contact
        </span>
        <h3 className="mb-8 font-display text-4xl font-bold uppercase leading-none tracking-tighter text-marala-navy md:text-5xl">
          Let&apos;s talk.
        </h3>
        <ul className="space-y-5">
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-4 text-marala-navy transition-colors hover:text-marala-orange"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-marala-navy/5 transition-colors group-hover:bg-marala-orange group-hover:text-white">
                <Mail className="h-5 w-5" />
              </span>
              <span className="font-light">{CONTACT.email}</span>
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="group flex items-center gap-4 text-marala-navy transition-colors hover:text-marala-teal"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-marala-navy/5 transition-colors group-hover:bg-marala-teal group-hover:text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span className="font-light">{CONTACT.phoneDisplay}</span>
            </a>
          </li>
          <li className="flex items-center gap-4 text-marala-gray">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-marala-navy/5">
              <MapPin className="h-5 w-5" />
            </span>
            <span className="font-light">{CONTACT.location}</span>
          </li>
        </ul>
      </div>

      <div>
        <span className="mb-6 inline-flex border-l-2 border-marala-teal pl-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-marala-teal">
          Follow us
        </span>
        <p className="mb-8 max-w-sm font-light leading-relaxed text-marala-gray">
          Reach the Marala Club export team on any channel below. We reply within one business day.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map(({ name, detail, href, Icon, hoverClass, external }) => (
            <motion.a
              key={name}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={`${name}: ${detail}`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 rounded-2xl border border-marala-navy/10 bg-white px-5 py-4 transition-shadow duration-300 hover:shadow-lg"
            >
              <span
                className={cn(
                  'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-marala-navy text-white transition-colors duration-300',
                  hoverClass
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xs font-bold uppercase tracking-[0.16em] text-marala-navy">
                  {name}
                </span>
                <span className="block truncate text-sm font-light text-marala-gray">{detail}</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
