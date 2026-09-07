// Vaarahi Interiors — Google Analytics 4
// Replace the value below with the GA4 Measurement ID from Google Analytics
// (example: G-ABC1234567). The same file is loaded on every page.
const VAARAHI_GA4_ID = "G-XXXXXXXXXX";

if (VAARAHI_GA4_ID && VAARAHI_GA4_ID !== "G-XXXXXXXXXX") {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(VAARAHI_GA4_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", VAARAHI_GA4_ID, {
    anonymize_ip: true
  });
}
