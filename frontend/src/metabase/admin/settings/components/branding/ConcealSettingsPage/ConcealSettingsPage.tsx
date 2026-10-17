import { t } from "ttag";

import {
  SettingsPageWrapper,
  SettingsSection,
} from "metabase/admin/components/SettingsSection";
import { useAdminSetting } from "metabase/api/utils";

import { AdminSettingInput } from "../../widgets/AdminSettingInput";

export function ConcealSettingsPage() {
  const { value: helpLink } = useAdminSetting("help-link");

  const pageTitle = t`Conceal Metabase`;

  return (
    <SettingsPageWrapper title={pageTitle}>
      <SettingsSection>
        <AdminSettingInput
          name="show-metabase-links"
          title={t`Product links and badges`}
          description={t`Show links to Metabase docs, upgrade prompts and the "Powered by" badge in embeds and exports.`}
          inputType="boolean"
        />
        <AdminSettingInput
          name="help-link"
          title={t`Help link in the settings menu`}
          inputType="radio"
          options={[
            { label: t`Link to Metabase help`, value: "metabase" },
            { label: t`Hide it`, value: "hidden" },
            { label: t`Go to a custom destination`, value: "custom" },
          ]}
        />
        <AdminSettingInput
          name="help-link-custom-destination"
          title={t`Custom help link`}
          placeholder="https://example.com/help"
          inputType="text"
          hidden={helpLink !== "custom"}
        />
        <AdminSettingInput
          name="show-metabot"
          title={t`Metabot greeting on the home page`}
          inputType="boolean"
        />
      </SettingsSection>
    </SettingsPageWrapper>
  );
}
