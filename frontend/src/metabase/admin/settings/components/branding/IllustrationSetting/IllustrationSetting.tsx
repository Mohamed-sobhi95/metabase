import { t } from "ttag";

import { useAdminSetting } from "metabase/api/utils";
import { Stack } from "metabase/ui";

import { AdminSettingInput } from "../../widgets/AdminSettingInput";
import { ImageSettingWidget } from "../ImageSettingWidget";

type IllustrationSettingProps = {
  optionKey:
    | "login-page-illustration"
    | "landing-page-illustration"
    | "no-data-illustration"
    | "no-object-illustration";
  customKey:
    | "login-page-illustration-custom"
    | "landing-page-illustration-custom"
    | "no-data-illustration-custom"
    | "no-object-illustration-custom";
  title: string;
};

export function IllustrationSetting({
  optionKey,
  customKey,
  title,
}: IllustrationSettingProps) {
  const { value } = useAdminSetting(optionKey);

  return (
    <Stack gap="sm">
      <AdminSettingInput
        name={optionKey}
        title={title}
        inputType="radio"
        options={[
          { label: t`Default`, value: "default" },
          { label: t`No illustration`, value: "none" },
          { label: t`Custom image`, value: "custom" },
        ]}
      />
      {value === "custom" ? (
        <ImageSettingWidget name={customKey} previewHeight={80} />
      ) : null}
    </Stack>
  );
}
