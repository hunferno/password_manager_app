/**
 * Palette moderne inspirée des apps 1Password, Bitwarden, Linear.
 * Toutes les couleurs sont opaques pour éviter les problèmes de rendu en build APK.
 */
export const COLORS = {
  // Surfaces & arrière-plans
  light: "#F8FAFC",
  dark: "#0F172A",

  // Texte & états
  grey: "#64748B",
  gold: "#0EA5E9",
  blue: "#0F172A",

  // Statuts (opaques)
  success: "#22C55E",
  warning: "#F59E0B",
  failure: "#EF4444",

  // Variantes (opacité préservée pour overlays uniquement)
  lightSuccess: "rgba(34, 197, 94, 0.25)",
  lightFailure: "rgba(239, 68, 68, 0.25)",

  // Placeholders, texte secondaire, surfaces claires (100% opaques)
  lightBlue: "#64748B",
  softBlue: "#E2E8F0",

  // Surface sombre (Paramètres, drawer, etc.)
  surfaceDark: "#1E293B",
};
