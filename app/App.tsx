"use client";

import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCallback, useState } from "react";

export default function App() {
  const { scheme, setScheme } = useColorScheme();
  const [showChat, setShowChat] = useState(false);

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                IA de comparaison de document
              </h1>
            </div>
            <button
              onClick={() => setShowChat(!showChat)}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
            >
              {showChat ? "Masquer l'assistant" : "Parler à l'assistant"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showChat && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              IA de comparaison de document
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Comparez et analysez vos documents intelligemment
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Comparez, analysez et comprenez les différences entre vos
              documents grâce à notre IA spécialisée. Obtenez des insights
              précis en quelques secondes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => setShowChat(true)}
                className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl"
              >
                Commencer la conversation
              </button>
              <button className="text-base font-semibold leading-6 text-slate-900 dark:text-white">
                En savoir plus <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            <div className="rounded-2xl bg-white/60 p-8 shadow-lg backdrop-blur-sm dark:bg-slate-800/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Comparaison Rapide
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Comparez vos documents en quelques secondes et obtenez des
                résultats détaillés instantanément.
              </p>
            </div>

            <div className="rounded-2xl bg-white/60 p-8 shadow-lg backdrop-blur-sm dark:bg-slate-800/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Analyse Intelligente
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Notre IA comprend le contexte et identifie les différences
                subtiles entre vos documents.
              </p>
            </div>

            <div className="rounded-2xl bg-white/60 p-8 shadow-lg backdrop-blur-sm dark:bg-slate-800/60">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <svg
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Disponible 24/7
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Votre assistant est toujours disponible, jour et nuit, pour vous
                aider.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Chat Section */}
      {showChat && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Comparez vos documents
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Uploadez vos documents et obtenez une analyse détaillée des
                différences
              </p>
            </div>
            <ChatKitPanel
              theme={scheme}
              onWidgetAction={handleWidgetAction}
              onResponseEnd={handleResponseEnd}
              onThemeRequest={setScheme}
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <p>
              © 2024 IA de comparaison de document. Propulsé par OpenAI ChatKit.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
