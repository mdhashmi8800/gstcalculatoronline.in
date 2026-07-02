export interface SEOMetadata {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

export const SITE_URL = 'https://gstcalculatoronline.in';
export const SITE_NAME = 'GST Calculator Online India';

export const DEFAULT_SEO: Required<Omit<SEOMetadata, 'noindex'>> & { noindex: boolean } = {
  title: 'GST Calculator Online India - Fast & Accurate GST Tools',
  description: 'Calculate GST (CGST, SGST, IGST), late fees, interest, and composition scheme taxes online. Free, fast, and highly accurate tools tailored for Indian businesses and taxpayers.',
  canonical: SITE_URL,
  ogTitle: 'GST Calculator Online India - Fast & Accurate GST Tools',
  ogDescription: 'Calculate GST (CGST, SGST, IGST), late fees, interest, and composition scheme taxes online. Free, fast, and highly accurate tools tailored for Indian businesses and taxpayers.',
  ogImage: `${SITE_URL}/og-image.png`,
  ogType: 'website',
  noindex: false,
};

export function getSEOMetadata(metadata: SEOMetadata = {}): SEOMetadata {
  const title = metadata.title 
    ? `${metadata.title} | ${SITE_NAME}` 
    : DEFAULT_SEO.title;

  return {
    title,
    description: metadata.description || DEFAULT_SEO.description,
    canonical: metadata.canonical || DEFAULT_SEO.canonical,
    ogTitle: metadata.ogTitle || metadata.title || DEFAULT_SEO.ogTitle,
    ogDescription: metadata.ogDescription || metadata.description || DEFAULT_SEO.ogDescription,
    ogImage: metadata.ogImage || DEFAULT_SEO.ogImage,
    ogType: metadata.ogType || DEFAULT_SEO.ogType,
    noindex: metadata.noindex || DEFAULT_SEO.noindex,
  };
}
