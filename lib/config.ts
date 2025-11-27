import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Comment puis-je vous aider ?",
    prompt: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    icon: "circle-question",
  },
  {
    label: "Expliquez vos fonctionnalités",
    prompt: "Quelles sont vos principales fonctionnalités ?",
    icon: "sparkle",
  },
  {
    label: "Besoin d'assistance",
    prompt: "J'ai besoin d'aide avec un problème spécifique",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "Posez votre question...";

export const GREETING =
  "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?";

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
