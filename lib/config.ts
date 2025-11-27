import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Comment comparer des documents ?",
    prompt: "Comment puis-je comparer deux documents avec vous ?",
    icon: "circle-question",
  },
  {
    label: "Expliquez vos fonctionnalités",
    prompt: "Quelles sont vos fonctionnalités de comparaison de documents ?",
    icon: "sparkle",
  },
  {
    label: "Types de documents supportés",
    prompt: "Quels types de documents puis-je comparer ?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT =
  "Posez votre question sur la comparaison de documents...";

export const GREETING =
  "Bonjour ! Je suis votre IA de comparaison de documents. Uploadez vos documents et je vous aiderai à les comparer et analyser les différences.";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
