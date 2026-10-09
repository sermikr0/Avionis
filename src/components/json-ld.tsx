import { site } from "@/lib/site";

/** Structured data limited to verifiable facts: legal name, DBA, address, phone, USDOT/MC. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    legalName: site.entity,
    alternateName: site.brand,
    url: site.url,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    identifier: [
      { "@type": "PropertyValue", propertyID: "USDOT", value: site.usdot },
      { "@type": "PropertyValue", propertyID: "MC", value: site.mc },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
