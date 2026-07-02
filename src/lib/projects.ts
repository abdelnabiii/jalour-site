export type Unit = {
  id: string;
  name: string;
  netArea: number;
  grossArea: number;
  ratePerM2: number;
  unitValue: number;
  sharePrice: number;
  totalShares: number;
};

export type InvestmentModel = {
  sharesPerUnit: number;
  ownershipPerShare: string;
  maxSharesPerUnit: number;
  maxSharesTotal: number;
  entryFrom: number;
  maxTermMonths: number;
  rentalIncomeStartYear: number;
  appreciationStartYear: number;
  interestFree: boolean;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: string;
  tagline?: string;
  summary: string;
  description: string[];
  heroImage: string;
  gallery: string[];
  floors?: { floor: string; label: string }[];
  units?: Unit[];
  investmentModel?: InvestmentModel;
  partnerName?: string;
  brochureUrl?: string;
  investorToolUrl?: string;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "nurv",
    name: "Nurv",
    category: "Commercial Projects",
    location: "El Shorouk, Cairo",
    status: "Launching 2026",
    tagline: "At the Core of Movement",
    partnerName: "Meadis Group",
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
      "/images/nurv/wellness-lounge.jpg",
      "/images/nurv/roof-track.jpg",
    ],
    floors: [
      { floor: "Ground Floor", label: "The Dining Experience" },
      { floor: "First Floor", label: "The Lifestyle Floor" },
      { floor: "Second Floor", label: "The Wellness Arena" },
      { floor: "Roof", label: "The On-Air Track" },
    ],
    investmentModel: {
      sharesPerUnit: 34,
      ownershipPerShare: "2.94%",
      maxSharesPerUnit: 4,
      maxSharesTotal: 10,
      entryFrom: 179294,
      maxTermMonths: 48,
      rentalIncomeStartYear: 3,
      appreciationStartYear: 1,
      interestFree: true,
    },
    units: [
      { id: "S01", name: "Shop 01", netArea: 24.84, grossArea: 37.26, ratePerM2: 180000, unitValue: 6706800,  sharePrice: 197259, totalShares: 34 },
      { id: "S02", name: "Shop 02", netArea: 56.57, grossArea: 84.86, ratePerM2: 160000, unitValue: 13576800, sharePrice: 399318, totalShares: 34 },
      { id: "S03", name: "Shop 03", netArea: 53.66, grossArea: 80.49, ratePerM2: 180000, unitValue: 14488200, sharePrice: 426124, totalShares: 34 },
      { id: "S04", name: "Shop 04", netArea: 24.68, grossArea: 37.02, ratePerM2: 180000, unitValue: 6663600,  sharePrice: 195988, totalShares: 34 },
      { id: "S05", name: "Shop 05", netArea: 21.03, grossArea: 31.55, ratePerM2: 210000, unitValue: 6624450,  sharePrice: 194837, totalShares: 34 },
      { id: "S06", name: "Shop 06", netArea: 21.27, grossArea: 31.91, ratePerM2: 250000, unitValue: 7976250,  sharePrice: 234596, totalShares: 34 },
      { id: "S07", name: "Shop 07", netArea: 25.37, grossArea: 38.05, ratePerM2: 210000, unitValue: 7991550,  sharePrice: 235046, totalShares: 34 },
      { id: "S08", name: "Shop 08", netArea: 25.40, grossArea: 38.10, ratePerM2: 160000, unitValue: 6096000,  sharePrice: 179294, totalShares: 34 },
      { id: "S09", name: "Shop 09", netArea: 60.94, grossArea: 91.41, ratePerM2: 210000, unitValue: 19196100, sharePrice: 564591, totalShares: 34 },
      { id: "S10", name: "Shop 10", netArea: 44.64, grossArea: 66.96, ratePerM2: 250000, unitValue: 16740000, sharePrice: 492353, totalShares: 34 },
      { id: "S11", name: "Shop 11", netArea: 34.02, grossArea: 51.03, ratePerM2: 210000, unitValue: 10716300, sharePrice: 315185, totalShares: 34 },
    ],
    brochureUrl: "/brochures/nurv-brochure.pdf",
    investorToolUrl: "/investor/tool",
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
