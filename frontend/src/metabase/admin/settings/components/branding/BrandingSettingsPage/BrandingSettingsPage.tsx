import { t } from "ttag";

import {
  SettingsPageWrapper,
  SettingsSection,
} from "metabase/admin/components/SettingsSection";
import { useSetting } from "metabase/common/hooks";

import { AdminSettingInput } from "../../widgets/AdminSettingInput";
import { BrandColorsWidget } from "../BrandColorsWidget";
import { IllustrationSetting } from "../IllustrationSetting";
import { ImageSettingWidget } from "../ImageSettingWidget";

export function BrandingSettingsPage() {
  const availableFonts = useSetting("available-fonts") ?? [];

  return (
    <SettingsPageWrapper title={t`Branding`}>
      <SettingsSection title={t`Identity`}>
        <AdminSettingInput
          name="application-name"
          title={t`Application name`}
          description={t`Shown in the browser tab, emails and everywhere the product name appears.`}
          inputType="text"
        />
        <ImageSettingWidget
          name="application-logo-url"
          title={t`Logo`}
          description={t`Shown in the top bar. A transparent PNG or SVG at least 64px tall works best.`}
        />
        <ImageSettingWidget
          name="application-favicon-url"
          title={t`Favicon`}
          description={t`The small icon shown in the browser tab. Use a square PNG or ICO.`}
          accept="image/png,image/x-icon,image/vnd.microsoft.icon,image/svg+xml"
          previewHeight={32}
        />
      </SettingsSection>

      <SettingsSection title={t`Colors`}>
        <BrandColorsWidget />
      </SettingsSection>

      <SettingsSection title={t`Typography and messages`}>
        <AdminSettingInput
          name="application-font"
          title={t`Font`}
          inputType="select"
          searchable
          options={availableFonts.map((font) => ({ label: font, value: font }))}
        />
        <AdminSettingInput
          name="loading-message"
          title={t`Message while a query runs`}
          inputType="select"
          options={[
            { label: t`Doing science...`, value: "doing-science" },
            { label: t`Running query...`, value: "running-query" },
            { label: t`Loading results...`, value: "loading-results" },
          ]}
        />
      </SettingsSection>

      <SettingsSection title={t`Illustrations`}>
        <IllustrationSetting
          optionKey="login-page-illustration"
          customKey="login-page-illustration-custom"
          title={t`Login page`}
        />
        <IllustrationSetting
          optionKey="landing-page-illustration"
          customKey="landing-page-illustration-custom"
          title={t`Home page`}
        />
        <IllustrationSetting
          optionKey="no-data-illustration"
          customKey="no-data-illustration-custom"
          title={t`When a question returns no results`}
        />
        <IllustrationSetting
          optionKey="no-object-illustration"
          customKey="no-object-illustration-custom"
          title={t`When a search returns no results`}
        />
      </SettingsSection>
    </SettingsPageWrapper>
  );
}
