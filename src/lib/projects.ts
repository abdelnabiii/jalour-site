export type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: string;
  summary: string;
  description: string[];
  heroImage: string;
  gallery: string[];
  floors?: { floor: string; label: string }[];
  brochureUrl?: string;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "nurv",
    name: "Nurv",
    category: "Commercial Projects",
    location: "El Shorouk, Cairo",
    status: "Opening 2026",
    summary:
      "A place that inspires, a place that belongs. An upscale lifestyle destination blending dining, retail, wellness, and culture.",
    description: [
      "A place that inspires, a place that belongs. Nurv is an upscale, trendy, and vibrant lifestyle destination developed by Jalour in partnership with Meadis Group — a new way to experience El Shorouk through a curated mix of high-end restaurants, retail, wellness, and culture.",
      "Nurv caters to a discerning clientele aged 21 and up — professionals, families, and lifestyle enthusiasts who value quality, style, and convenience, seeking more than just shopping.",
      "Nurv is strategically curating a diverse tenant mix to align with the brand image and market expectations: high-end restaurants, cafés, fashion stores, dessert shops, gourmet food suppliers, wellness centers, and telecom services, alongside upscale open-air retail and dining destinations.",
    ],
    heroImage: "/images/nurv/hero.jpg",
    gallery: [
      "/images/nurv/hero.jpg",
      "/images/nurv/day-night.jpg",
      "/images/nurv/roof-track.jpg",
    ],
    floors: [
      { floor: "Ground Floor", label: "The Dining Experience" },
      { floor: "First Floor", label: "The Lifestyle Floor" },
      { floor: "Second Floor", label: "The Wellness Arena" },
      { floor: "Roof", label: "The On-Air Track" },
    ],
    brochureUrl: "/brochures/nurv-brochure.pdf",
  },
  {
    slug: "project-two",
    name: "Project Two",
    category: "Residential Projects",
    location: "Egypt",
    status: "Coming Soon",
    summary: "Details for this project will be published as it launches.",
    description: [],
    heroImage: "",
    gallery: [],
    comingSoon: true,
  },
  {
    slug: "project-three",
    name: "Project Three",
    category: "Office Spaces",
    location: "Egypt",
    status: "Coming Soon",
    summary: "Details for this project will be published as it launches.",
    description: [],
    heroImage: "",
    gallery: [],
    comingSoon: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
