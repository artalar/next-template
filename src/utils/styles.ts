export const themeVars = {
  main: '--main',
  accent: '--accent',
  font: '--font',
  back: '--back',
} as const
export const theme = {
  [themeVars.main]: '#008080',
  [themeVars.accent]: '#9ACD32',
  [themeVars.font]: '#006400',
  [themeVars.back]: '#F5FFFA',
} as const
