import type { Metadata } from "next"

export const siteConfig = {
  "name": "Lumina Mobile",
  "tagline": "The smartest way to buy your next smartphone.",
  "description": "Premium unlocked smartphones, certified refurbished devices, and instant trade-in values. Experience transparent pricing and zero carrier bloatware.",
  "audience": "Tech-savvy consumers, budget-conscious upgraders, and gadget enthusiasts seeking unlocked devices.",
  "navLinks": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Shop Phones",
      "href": "/shop"
    },
    {
      "label": "Trade-In",
      "href": "/trade-in"
    },
    {
      "label": "About Us",
      "href": "/about"
    }
  ],
  "primaryCta": {
    "label": "Shop Latest Phones",
    "href": "/shop"
  },
  "secondaryCta": {
    "label": "Value Your Trade-In",
    "href": "/trade-in"
  },
  "footerCta": {
    "label": "Get 10% Off",
    "href": "#"
  },
  "socialLinks": [
    {
      "label": "Instagram",
      "href": "#"
    },
    {
      "label": "Twitter",
      "href": "#"
    },
    {
      "label": "TikTok",
      "href": "#"
    }
  ],
  "contact": {
    "email": "support@luminamobile.com",
    "phone": "1-800-555-0199",
    "address": "404 Innovation Drive, Tech District, CA 94103"
  },
  "themePreset": "ecommerce"
} as const

export type SiteConfig = typeof siteConfig

export function pageMetadata(input: { title: string; description: string }): Metadata {
  return {
    title: `${input.title} — ${siteConfig.name}`,
    description: input.description,
  }
}
