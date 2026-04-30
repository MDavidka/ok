export const generatedManifest = {
  "projectName": "a phone selling",
  "siteType": "business",
  "brandStyle": "clean modern mobile-first",
  "pages": [
    {
      "path": "/",
      "title": "Home",
      "purpose": "Introduce the brand and primary value proposition.",
      "sections": [
        "Hero",
        "Highlights",
        "Proof",
        "CTA"
      ],
      "features": [
        "primary CTA",
        "secondary CTA",
        "feature cards"
      ],
      "primaryAction": "Get Started",
      "layoutHint": "landing",
      "componentsNeeded": [
        "Button",
        "Card",
        "Badge",
        "Separator"
      ],
      "filePath": "app/page.tsx",
      "componentName": "HomePage",
      "description": "Introduce the brand and primary value proposition.",
      "metadata": {
        "title": "Home | a phone selling",
        "description": "Introduce the brand and primary value proposition."
      }
    },
    {
      "path": "/features",
      "title": "Features",
      "purpose": "Show product capabilities and benefits.",
      "sections": [
        "Feature Grid",
        "Use Cases",
        "Comparison",
        "CTA"
      ],
      "features": [
        "feature cards",
        "comparison table",
        "cta"
      ],
      "primaryAction": "Try Features",
      "layoutHint": "catalog",
      "componentsNeeded": [
        "Card",
        "Badge",
        "Button",
        "Tabs",
        "Table"
      ],
      "filePath": "app/features/page.tsx",
      "componentName": "FeaturesPage",
      "description": "Show product capabilities and benefits.",
      "metadata": {
        "title": "Features | a phone selling",
        "description": "Show product capabilities and benefits."
      }
    },
    {
      "path": "/contact",
      "title": "Contact",
      "purpose": "Capture inquiries and support requests.",
      "sections": [
        "Intro",
        "Contact Form",
        "Channels",
        "FAQ"
      ],
      "features": [
        "submit contact",
        "faq accordion"
      ],
      "primaryAction": "Send Message",
      "layoutHint": "contact",
      "componentsNeeded": [
        "Card",
        "Input",
        "Textarea",
        "Button",
        "Accordion",
        "Label"
      ],
      "filePath": "app/contact/page.tsx",
      "componentName": "ContactPage",
      "description": "Capture inquiries and support requests.",
      "metadata": {
        "title": "Contact | a phone selling",
        "description": "Capture inquiries and support requests."
      }
    }
  ],
  "theme": {
    "tone": "clean modern mobile-first",
    "radius": "rounded-xl"
  },
  "chrome": {
    "navStyle": "business",
    "footerStyle": "simple"
  },
  "motion": {
    "profile": "soft-reveal"
  }
} as const
