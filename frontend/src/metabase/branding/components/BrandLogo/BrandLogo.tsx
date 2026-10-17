import { DefaultLogoIcon } from "metabase/common/components/LogoIcon/LogoIcon";
import { useSetting } from "metabase/common/hooks";

import { DEFAULT_LOGO_URL } from "../../constants";

type BrandLogoProps = {
  width?: number;
  height?: number;
  dark?: boolean;
  fill?: string;
};

export function BrandLogo({ height = 32, width, ...props }: BrandLogoProps) {
  const logoUrl = useSetting("application-logo-url");

  if (!logoUrl || logoUrl === DEFAULT_LOGO_URL) {
    return <DefaultLogoIcon height={height} width={width} {...props} />;
  }

  return (
    <img
      src={logoUrl}
      alt=""
      data-testid="main-logo"
      style={{
        height,
        width: width ?? "auto",
        maxWidth: 160,
        objectFit: "contain",
      }}
    />
  );
}
