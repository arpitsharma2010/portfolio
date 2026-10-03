// Captured verbatim from Contact.tsx before the Nether portal redesign (Component 9).
// Content is frozen: if a test against this fixture fails, fix the component, never this file.
export const SECTION_EYEBROW = "Nether Portal";
export const SECTION_TITLE = "Open a connection";
export const SECTION_DESCRIPTION =
  "Open to Software Engineer, Backend, Full-Stack, Cloud and AI engineering roles. Email is the fastest way to reach me and I reply to everything.";
export const PROMPT = "Choose a channel";
export const EXTERNAL_TARGET = "_blank";
export const EXTERNAL_REL = "noopener noreferrer";

/** In original order. External channels open in a new tab; email does not. */
export const CHANNELS = [
  { label: "Email", value: "arpeet.sharma.1998@gmail.com", href: "mailto:arpeet.sharma.1998@gmail.com", external: false },
  { label: "LinkedIn", value: "in/arpitsharma2010", href: "https://www.linkedin.com/in/arpitsharma2010/", external: true },
  { label: "GitHub", value: "arpitsharma2010", href: "https://github.com/arpitsharma2010", external: true },
  { label: "LeetCode", value: "arpitsharma2010", href: "https://leetcode.com/u/arpitsharma2010/", external: true },
] as const;

export const ACTIONS = [
  { label: "Send message", href: "mailto:arpeet.sharma.1998@gmail.com", external: false },
  { label: "Resume", href: "https://drive.google.com/file/d/19V3w4XkgKDMzZh3uAwgYrmuWBTB6IRsa/view?usp=sharing", external: true },
] as const;

export const LOCATION_LINE = "New York · open to relocation";
