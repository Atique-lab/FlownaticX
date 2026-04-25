import { Helmet } from "react-helmet-async";

/**
 * SEO component to handle dynamic head tags.
 * @param {Object} props
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The meta description of the page.
 * @param {string} [props.canonical] - The canonical URL of the page.
 * @param {string} [props.type="website"] - Open Graph type.
 */
export default function SEO({ title, description, canonical, type = "website" }) {
  const fullTitle = `${title} | FlownaticX — Digital Growth Agency`;
  const defaultUrl = "https://flownaticx.com";

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || defaultUrl} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
