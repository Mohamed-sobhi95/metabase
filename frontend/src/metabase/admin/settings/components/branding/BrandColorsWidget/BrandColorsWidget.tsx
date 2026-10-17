import { useEffect, useMemo, useState } from "react";
import { t } from "ttag";
import _ from "underscore";

import { useAdminSetting } from "metabase/api/utils";
import { ColorPicker } from "metabase/common/components/ColorPicker";
import {
  Box,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "metabase/ui";
import { getColors, mutateColors } from "metabase/ui/colors";
import type { ColorSettings } from "metabase-types/api";

import { SettingHeader } from "../../SettingHeader";
import {
  type BrandColorKey,
  type BrandColorPreset,
  CHART_COLOR_KEYS,
  COLOR_PRESETS,
  UI_COLOR_KEYS,
} from "../constants";

const getColorLabel = (key: BrandColorKey): string => {
  switch (key) {
    case "brand":
      return t`Primary color`;
    case "filter":
      return t`Filter color`;
    case "summarize":
      return t`Summarize color`;
    default:
      return t`Chart color ${Number(key.replace("accent", "")) + 1}`;
  }
};

const getPresetLabel = (preset: BrandColorPreset): string => {
  switch (preset.id) {
    case "ocean":
      return t`Ocean`;
    case "emerald":
      return t`Emerald`;
    case "sunset":
      return t`Sunset`;
    case "royal":
      return t`Royal`;
    default:
      return preset.id;
  }
};

const ALL_KEYS: readonly BrandColorKey[] = [
  ...UI_COLOR_KEYS,
  ...CHART_COLOR_KEYS,
];

const getDefaultColors = (): Record<BrandColorKey, string> => {
  const defaults = getColors();
  return Object.fromEntries(
    ALL_KEYS.map((key) => [key, defaults[key]]),
  ) as Record<BrandColorKey, string>;
};

const withoutDefaults = (
  draft: ColorSettings,
  defaults: ColorSettings,
): ColorSettings =>
  Object.fromEntries(
    Object.entries(draft).filter(
      ([key, value]) =>
        Boolean(value) && value.toLowerCase() !== defaults[key]?.toLowerCase(),
    ),
  );

export function BrandColorsWidget() {
  const { value, updateSetting, isLoading } =
    useAdminSetting("application-colors");
  const defaults = useMemo(getDefaultColors, []);
  const savedColors = useMemo(() => value ?? {}, [value]);
  const [draft, setDraft] = useState<ColorSettings>(savedColors);

  useEffect(() => setDraft(savedColors), [savedColors]);

  const isDirty = !_.isEqual(
    withoutDefaults(draft, defaults),
    withoutDefaults(savedColors, defaults),
  );

  const handleColorChange = (key: BrandColorKey, color?: string) => {
    setDraft((current) =>
      color ? { ...current, [key]: color } : _.omit(current, key),
    );
  };

  const handleSave = async () => {
    const colors = withoutDefaults(draft, defaults);
    const response = await updateSetting({
      key: "application-colors",
      value: colors,
    });
    if (!response.error) {
      mutateColors(colors);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Stack gap="lg" data-testid="application-colors-setting">
      <Box>
        <SettingHeader
          id="color-presets"
          title={t`Color presets`}
          description={t`Start from a ready-made palette, then fine-tune any color below.`}
        />
        <SimpleGrid cols={{ base: 2, md: 4 }} spacing="sm">
          {COLOR_PRESETS.map((preset) => (
            <ColorPresetCard
              key={preset.id}
              label={getPresetLabel(preset)}
              preset={preset}
              onSelect={() => setDraft(preset.colors)}
            />
          ))}
        </SimpleGrid>
      </Box>

      <ColorGroup
        title={t`User interface colors`}
        description={t`Used for buttons, links, filters and highlights across the app.`}
        keys={UI_COLOR_KEYS}
        draft={draft}
        defaults={defaults}
        onChange={handleColorChange}
      />

      <ColorGroup
        title={t`Chart colors`}
        description={t`Used in this order for the series of every chart and dashboard.`}
        keys={CHART_COLOR_KEYS}
        draft={draft}
        defaults={defaults}
        onChange={handleColorChange}
      />

      <Group gap="sm">
        <Button variant="filled" disabled={!isDirty} onClick={handleSave}>
          {t`Save colors`}
        </Button>
        <Button
          variant="subtle"
          disabled={!isDirty}
          onClick={() => setDraft(savedColors)}
        >
          {t`Discard changes`}
        </Button>
        <Button variant="subtle" onClick={() => setDraft({})}>
          {t`Reset to defaults`}
        </Button>
      </Group>
    </Stack>
  );
}

type ColorGroupProps = {
  title: string;
  description: string;
  keys: readonly BrandColorKey[];
  draft: ColorSettings;
  defaults: Record<BrandColorKey, string>;
  onChange: (key: BrandColorKey, color?: string) => void;
};

function ColorGroup({
  title,
  description,
  keys,
  draft,
  defaults,
  onChange,
}: ColorGroupProps) {
  return (
    <Box>
      <SettingHeader id={title} title={title} description={description} />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {keys.map((key) => (
          <Flex key={key} align="center" gap="sm">
            <ColorPicker
              value={draft[key] ?? defaults[key]}
              placeholder={defaults[key]}
              onChange={(color) => onChange(key, color)}
            />
            <Text c="text-secondary">{getColorLabel(key)}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}

type ColorPresetCardProps = {
  label: string;
  preset: BrandColorPreset;
  onSelect: () => void;
};

function ColorPresetCard({ label, preset, onSelect }: ColorPresetCardProps) {
  return (
    <UnstyledButton
      onClick={onSelect}
      p="sm"
      bd="1px solid var(--mb-color-border-neutral)"
      style={{ borderRadius: 8 }}
    >
      <Flex gap={2} mb="xs">
        {CHART_COLOR_KEYS.map((key) => (
          <Box
            key={key}
            h={20}
            style={{
              flex: 1,
              borderRadius: 3,
              background: preset.colors[key],
            }}
          />
        ))}
      </Flex>
      <Text fw="bold" size="sm">
        {label}
      </Text>
    </UnstyledButton>
  );
}
