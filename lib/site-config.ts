export const siteConfig = {
  "name": "A cockie clikker",
  "tagline": "Beautiful, fast, on-brand.",
  "theme": "saas",
  "colorScheme": "neutral",
  "pages": [
    {
      "path": "/",
      "title": "Home"
    }
  ]
} as const

export type SiteConfig = typeof siteConfig
