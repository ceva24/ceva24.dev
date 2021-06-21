import Typography, { TypographyOptions } from "typography";
import usWebDesignStandards from "typography-theme-us-web-design-standards";

const typography = new Typography(usWebDesignStandards as TypographyOptions);

export const { scale, rhythm, options } = typography;
export default typography;
