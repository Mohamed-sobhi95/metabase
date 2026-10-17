import {
  PLUGIN_LOGO_ICON_COMPONENTS,
  PLUGIN_SELECTORS,
} from "metabase/plugins";

import { BrandLogo } from "./components/BrandLogo";
import {
  getApplicationName,
  getIsWhiteLabeling,
  getLandingPageIllustration,
  getLoadingMessageFactory,
  getLoginPageIllustration,
  getNoDataIllustration,
  getNoObjectIllustration,
  getShowMetabaseLinks,
} from "./selectors";

export function initializeBranding() {
  PLUGIN_LOGO_ICON_COMPONENTS.push(BrandLogo);

  PLUGIN_SELECTORS.canWhitelabel = () => true;
  PLUGIN_SELECTORS.getApplicationName = getApplicationName;
  PLUGIN_SELECTORS.getIsWhiteLabeling = getIsWhiteLabeling;
  PLUGIN_SELECTORS.getShowMetabaseLinks = getShowMetabaseLinks;
  PLUGIN_SELECTORS.getLoadingMessageFactory = getLoadingMessageFactory;
  PLUGIN_SELECTORS.getLoginPageIllustration = getLoginPageIllustration;
  PLUGIN_SELECTORS.getLandingPageIllustration = getLandingPageIllustration;
  PLUGIN_SELECTORS.getNoDataIllustration = getNoDataIllustration;
  PLUGIN_SELECTORS.getNoObjectIllustration = getNoObjectIllustration;
}
