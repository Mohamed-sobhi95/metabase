import { t } from "ttag";

import noResultsSource from "assets/img/no_results.svg";
import type { IllustrationValue } from "metabase/plugins";
import type { State } from "metabase/redux/store";
import { getSetting } from "metabase/selectors/settings";
import type {
  EnterpriseSettingKey,
  IllustrationSettingValue,
  LoadingMessage,
} from "metabase-types/api";

// eslint-disable-next-line metabase/no-literal-metabase-strings -- default product name is the one we replace
export const DEFAULT_APPLICATION_NAME = "Metabase";
const DEFAULT_PAGE_ILLUSTRATION = "app/img/bridge.svg";

export function getApplicationName(state: State): string {
  return getSetting(state, "application-name") || DEFAULT_APPLICATION_NAME;
}

export function getShowMetabaseLinks(state: State): boolean {
  return getSetting(state, "show-metabase-links") ?? true;
}

export function getIsWhiteLabeling(state: State): boolean {
  return (
    getApplicationName(state) !== DEFAULT_APPLICATION_NAME ||
    !getShowMetabaseLinks(state)
  );
}

const getMessageForSetting = (
  loadingMessage: LoadingMessage,
  isSlow: boolean,
): string => {
  switch (loadingMessage) {
    case "running-query":
      return isSlow ? t`Waiting for results...` : t`Running query...`;
    case "loading-results":
      return isSlow ? t`Waiting for results...` : t`Loading results...`;
    case "doing-science":
      return isSlow ? t`Waiting for results...` : t`Doing science...`;
  }
};

export function getLoadingMessageFactory(state: State) {
  const loadingMessage = getSetting(state, "loading-message");
  return (isSlow: boolean | undefined = false) =>
    getMessageForSetting(loadingMessage ?? "doing-science", isSlow);
}

const resolveIllustration = (
  option: IllustrationSettingValue | undefined,
  customSource: string | undefined,
  defaultSource: string,
): IllustrationValue => {
  if (option === "none") {
    return null;
  }
  if (option === "custom" && customSource) {
    return { src: customSource, isDefault: false };
  }
  return { src: defaultSource, isDefault: true };
};

const getIllustration = (
  state: State,
  optionKey: EnterpriseSettingKey &
    (
      | "login-page-illustration"
      | "landing-page-illustration"
      | "no-data-illustration"
      | "no-object-illustration"
    ),
  customKey: EnterpriseSettingKey &
    (
      | "login-page-illustration-custom"
      | "landing-page-illustration-custom"
      | "no-data-illustration-custom"
      | "no-object-illustration-custom"
    ),
  defaultSource: string,
) =>
  resolveIllustration(
    getSetting(state, optionKey),
    getSetting(state, customKey),
    defaultSource,
  );

export const getLoginPageIllustration = (state: State) =>
  getIllustration(
    state,
    "login-page-illustration",
    "login-page-illustration-custom",
    DEFAULT_PAGE_ILLUSTRATION,
  );

export const getLandingPageIllustration = (state: State) =>
  getIllustration(
    state,
    "landing-page-illustration",
    "landing-page-illustration-custom",
    DEFAULT_PAGE_ILLUSTRATION,
  );

export const getNoDataIllustration = (state: State) =>
  getIllustration(
    state,
    "no-data-illustration",
    "no-data-illustration-custom",
    noResultsSource,
  )?.src ?? null;

export const getNoObjectIllustration = (state: State) =>
  getIllustration(
    state,
    "no-object-illustration",
    "no-object-illustration-custom",
    noResultsSource,
  )?.src ?? null;
