import { BrandingSettingsPage, ConcealSettingsPage } from "../branding";

export function AppearanceSettingsPage({
  tab,
}: {
  tab?: "branding" | "conceal-metabase";
}) {
  return tab === "conceal-metabase" ? (
    <ConcealSettingsPage />
  ) : (
    <BrandingSettingsPage />
  );
}
