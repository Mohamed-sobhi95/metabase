export const UI_COLOR_KEYS = ["brand", "filter", "summarize"] as const;
export const CHART_COLOR_KEYS = [
  "accent0",
  "accent1",
  "accent2",
  "accent3",
  "accent4",
  "accent5",
  "accent6",
  "accent7",
] as const;

export type BrandColorKey =
  | (typeof UI_COLOR_KEYS)[number]
  | (typeof CHART_COLOR_KEYS)[number];

export type BrandColorPreset = {
  id: string;
  colors: Record<BrandColorKey, string>;
};

export const COLOR_PRESETS: readonly BrandColorPreset[] = [
  {
    id: "ocean",
    colors: {
      brand: "#2563EB",
      filter: "#7C3AED",
      summarize: "#059669",
      accent0: "#2563EB",
      accent1: "#0EA5E9",
      accent2: "#14B8A6",
      accent3: "#F59E0B",
      accent4: "#EF4444",
      accent5: "#8B5CF6",
      accent6: "#EC4899",
      accent7: "#64748B",
    },
  },
  {
    id: "emerald",
    colors: {
      brand: "#047857",
      filter: "#0F766E",
      summarize: "#B45309",
      accent0: "#047857",
      accent1: "#34D399",
      accent2: "#0EA5E9",
      accent3: "#FBBF24",
      accent4: "#F97316",
      accent5: "#6366F1",
      accent6: "#DB2777",
      accent7: "#6B7280",
    },
  },
  {
    id: "sunset",
    colors: {
      brand: "#E11D48",
      filter: "#9333EA",
      summarize: "#EA580C",
      accent0: "#E11D48",
      accent1: "#F97316",
      accent2: "#FACC15",
      accent3: "#10B981",
      accent4: "#3B82F6",
      accent5: "#A855F7",
      accent6: "#14B8A6",
      accent7: "#78716C",
    },
  },
  {
    id: "royal",
    colors: {
      brand: "#4338CA",
      filter: "#B8860B",
      summarize: "#0F766E",
      accent0: "#4338CA",
      accent1: "#C9A227",
      accent2: "#0891B2",
      accent3: "#DC2626",
      accent4: "#16A34A",
      accent5: "#9333EA",
      accent6: "#EA580C",
      accent7: "#475569",
    },
  },
];
