import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.pritamrabha.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export default function SEO({
  title = 'Pritam Rabha — AI & Robotics Developer',
  description = 'Pritam Rabha is an AI & Robotics developer and MCA student from India. Building intelligent systems with Python, TensorFlow, Computer Vision, and Arduino. National prize winner.',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  keywords = 'Pritam Rabha, Pritam Rabha developer, Pritam Rabha portfolio, AI developer India, robotics developer, machine learning engineer',
}) {
  const fullTitle = title.includes('Pritam Rabha') ? title : `${title} | Pritam Rabha`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Pritam Rabha Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@pritamrabha" />
    </Helmet>
  )
}