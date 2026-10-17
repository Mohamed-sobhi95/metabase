import { useState } from "react";
import { t } from "ttag";

import { useAdminSetting } from "metabase/api/utils";
import { Box, Button, FileInput, Flex, Image, Text } from "metabase/ui";
import type { EnterpriseSettingKey } from "metabase-types/api";

import { SettingHeader } from "../../SettingHeader";

const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

type ImageSettingKey = EnterpriseSettingKey &
  (
    | "application-logo-url"
    | "application-favicon-url"
    | "login-page-illustration-custom"
    | "landing-page-illustration-custom"
    | "no-data-illustration-custom"
    | "no-object-illustration-custom"
  );

type ImageSettingWidgetProps = {
  name: ImageSettingKey;
  title?: string;
  description?: string;
  accept?: string;
  previewHeight?: number;
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Unexpected file reader result"));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export function ImageSettingWidget({
  name,
  title,
  description,
  accept = "image/png,image/jpeg,image/svg+xml,image/webp,image/gif",
  previewHeight = 48,
}: ImageSettingWidgetProps) {
  const { value, settingDetails, updateSetting, isLoading } =
    useAdminSetting(name);
  const [error, setError] = useState<string | null>(null);

  const hasCustomImage = Boolean(value) && value !== settingDetails?.default;

  const handleFileChange = async (file: File | null) => {
    setError(null);
    if (!file) {
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(t`The image must be smaller than 2 MB.`);
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      await updateSetting({ key: name, value: dataUrl });
    } catch {
      setError(t`This file could not be read.`);
    }
  };

  const handleRemove = () => {
    setError(null);
    updateSetting({ key: name, value: settingDetails?.default ?? "" });
  };

  if (isLoading) {
    return null;
  }

  return (
    <Box data-testid={`${name}-setting`}>
      <SettingHeader id={name} title={title} description={description} />
      <Flex align="center" gap="md">
        {hasCustomImage && value ? (
          <Box
            p="sm"
            bd="1px solid var(--mb-color-border-neutral)"
            style={{ borderRadius: 8 }}
          >
            <Image src={value} h={previewHeight} w="auto" fit="contain" />
          </Box>
        ) : null}
        <FileInput
          accept={accept}
          placeholder={hasCustomImage ? t`Replace image` : t`Choose a file`}
          onChange={handleFileChange}
          value={null}
          clearable={false}
          w={220}
        />
        {hasCustomImage ? (
          <Button
            variant="subtle"
            color="feedback-negative"
            onClick={handleRemove}
          >
            {t`Remove`}
          </Button>
        ) : null}
      </Flex>
      {error ? (
        <Text c="feedback-negative" mt="xs" size="sm">
          {error}
        </Text>
      ) : null}
    </Box>
  );
}
