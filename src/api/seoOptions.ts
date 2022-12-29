import { NextSeoProps } from 'next-seo';

const nextSeoOptions: NextSeoProps = {
  defaultTitle: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  description: `A collection of tile markers for RuneLite. Find and import tile markers for different Oldschool RuneScape activities.`,
  titleTemplate: `RuneMarkers - %s`,
  openGraph: {
    type: `website`,
    locale: `en_US`,
    url: `https://runemarkers.net`,
    title: `RuneMarkers - A Collection of RuneLite Tile Markers`,
    description: `A collection of tile markers for RuneLite. Find and import tile markers for different Oldschool RuneScape activities.`,
    siteName: `RuneMarkers`,
  },
  twitter: {
    handle: `@jamgyo`,
    site: `@runemarkers`,
    cardType: `summary_large_image`,
  },
};

export const defaultImages = [
  {
    url: `/logo1024-background.png`,
    width: 1024,
    height: 1024,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
  {
    url: `/logo512-background.png`,
    width: 512,
    height: 512,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
  {
    url: `/logo256-background.png`,
    width: 256,
    height: 256,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
  {
    url: `/logo128-background.png`,
    width: 128,
    height: 128,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
  {
    url: `/android-chrome-192x192.png`,
    width: 192,
    height: 192,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
  {
    url: `/android-chrome-512x512.png`,
    width: 512,
    height: 512,
    alt: `RuneMarkers - A Collection of RuneLite Tile Markers`,
  },
];

export default nextSeoOptions;
