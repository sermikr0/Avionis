/**
 * Single source of truth for verified company information.
 * Everything shown on the site, in metadata and in structured data reads from here.
 */
export const site = {
  /** Registered legal entity. */
  entity: "Asia Prime Inc.",
  /** Trade name used for the brand. */
  brand: "Avionis",
  /** Full legal line for footers, compliance and metadata. */
  legalName: "Asia Prime Inc. DBA Avionis",
  shortName: "Avionis",
  tagline: "Freight that keeps its schedule.",
  description:
    "Avionis (Asia Prime Inc.) is a motor carrier based in Morrisville, Pennsylvania on the I-95 corridor. Request a rate or contact our team. USDOT 4204776 · MC 1622752.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  phone: {
    display: "+1 (917) 246-1511",
    e164: "+19172461511",
  },
  address: {
    street: "300 W Trenton Ave",
    city: "Morrisville",
    region: "PA",
    regionLong: "Pennsylvania",
    postalCode: "19067",
    country: "US",
    line: "300 W Trenton Ave, Morrisville, PA 19067",
    full: "300 W Trenton Ave, Morrisville, PA 19067, USA",
  },
  usdot: "4204776",
  mc: "1622752",
  fmcsa: {
    // Official FMCSA SAFER company snapshot for this USDOT number.
    snapshot:
      "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=4204776",
    search: "https://safer.fmcsa.dot.gov/CompanySnapshot.aspx",
    licensing:
      "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist",
  },
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=300+W+Trenton+Ave%2C+Morrisville%2C+PA+19067",
    place:
      "https://www.google.com/maps/search/?api=1&query=300+W+Trenton+Ave%2C+Morrisville%2C+PA+19067",
  },
} as const;

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/quote", label: "Get a Rate" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/compliance", label: "Compliance" },
    { href: "/privacy", label: "Privacy" },
  ],
  getStarted: [
    { href: "/quote", label: "Get a Rate" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const telHref = `tel:${site.phone.e164}`;
