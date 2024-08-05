import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEOHelmet() {
  return (
    <Helmet>
      {/* Title */}
      <title>Equilum</title>

      {/* Meta tags */}
      <meta
        name="description"
        content="Leeroy is a digital agency specializing in web and mobile app development, UI/UX design, and digital marketing solutions."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://play.leeroy.ca/" />
      <meta property="og:title" content="Leeroy | Digital Agency" />
      <meta
        property="og:description"
        content="Innovative digital solutions for web and mobile. Expert UI/UX design and development services."
      />

      {/* Additional Meta Tags */}
      <meta
        name="keywords"
        content="digital agency, web development, mobile app development, UI/UX design, digital marketing"
      />
      <meta name="author" content="Leeroy" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.png" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://play.leeroy.ca/" />
    </Helmet>
  );
}

export default SEOHelmet;
