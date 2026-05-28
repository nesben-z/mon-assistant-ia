"use client";

import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

type DiffStatus = "critique" | "a-verifier" | "ok";

type Difference = {
  id: number;
  title: string;
  section: string;
  summary: string;
  status: DiffStatus;
};

const differences: Difference[] = [
  {
    id: 1,
    title: "Clause modifiée",
    section: "Article 4.2 - Responsabilité",
    summary: "Le plafond d'indemnisation passe de 120 kEUR a 75 kEUR.",
    status: "critique",
  },
  {
    id: 2,
    title: "Delai raccourci",
    section: "Article 7.1 - Notification",
    summary: "Le preavis descend de 30 jours a 10 jours ouvrables.",
    status: "a-verifier",
  },
  {
    id: 3,
    title: "Definition ajoutee",
    section: "Annexe B - Donnees sensibles",
    summary: "Ajout d'une categorie de donnees operationnelles.",
    status: "ok",
  },
];

const documentRows = [
  { label: "Contrat-cadre-v3.pdf", meta: "42 pages · source", active: true },
  { label: "Contrat-cadre-v4.pdf", meta: "43 pages · revision", active: true },
  { label: "Historique des versions", meta: "12 comparaisons", active: false },
];

const sourceClauses = [
  "Le prestataire limite sa responsabilite totale au montant des sommes versees sur les douze derniers mois.",
  "Toute notification contractuelle doit etre adressee avec un preavis minimal de trente jours calendaires.",
  "Les donnees sensibles excluent les journaux techniques et les informations operationnelles internes.",
];

const revisedClauses = [
  "Le prestataire limite sa responsabilite totale a 75 000 EUR pour l'ensemble des reclamations.",
  "Toute notification contractuelle doit etre adressee avec un preavis minimal de dix jours ouvrables.",
  "Les donnees sensibles incluent les journaux techniques, les informations operationnelles et les exports d'audit.",
];

const statusStyles: Record<DiffStatus, string> = {
  critique: "border-red-200 bg-red-50 text-red-700",
  "a-verifier": "border-amber-200 bg-amber-50 text-amber-800",
  ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const statusLabels: Record<DiffStatus, string> = {
  critique: "Risque eleve",
  "a-verifier": "A verifier",
  ok: "Stable",
};

export default function App() {
  const { scheme, setScheme } = useColorScheme("light");
  const [selectedDiffId, setSelectedDiffId] = useState(1);
  const [viewMode, setViewMode] = useState<"diff" | "source" | "revision">(
    "diff"
  );

  const selectedDiff = useMemo(
    () => differences.find((item) => item.id === selectedDiffId) ?? differences[0],
    [selectedDiffId]
  );

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
    <main className="min-h-screen bg-[#f7f8f5] text-[#14211f]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-emerald-200/28 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-cyan-200/24 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <AppHeader scheme={scheme} onThemeChange={setScheme} />

        <section className="mx-auto grid w-full max-w-[1800px] flex-1 grid-cols-1 gap-4 px-3 pb-3 pt-4 sm:px-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] lg:px-5">
          <aside className="flex min-h-[520px] flex-col rounded-lg border border-[#d9dfd7] bg-white/92 shadow-[0_22px_70px_rgba(21,35,33,0.08)]">
            <div className="border-b border-[#e4e8e1] p-4">
              <p className="text-xs font-semibold uppercase text-[#60706b]">
                Dossier actif
              </p>
              <h2 className="mt-2 text-lg font-semibold text-[#14211f]">
                Fusion fournisseurs 2026
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#65736e]">
                Analyse contractuelle en cours avec suivi des zones de risque.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#123d37] px-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(18,61,55,0.22)] transition hover:bg-[#0f302c]">
                <UploadIcon />
                Importer
              </button>
              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#bfcac5] bg-white px-4 text-sm font-semibold text-[#19312d] transition hover:bg-[#f2f6f3]">
                <SparkIcon />
                Lancer l&apos;analyse
              </button>
            </div>

            <div className="px-4 pb-2">
              <SegmentedControl value={viewMode} onChange={setViewMode} />
            </div>

            <div className="flex-1 space-y-2 overflow-auto px-3 py-2">
              {documentRows.map((row) => (
                <div
                  key={row.label}
                  className={`rounded-md border px-3 py-3 ${
                    row.active
                      ? "border-[#cdd8d3] bg-[#f8faf7]"
                      : "border-transparent bg-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <DocumentIcon active={row.active} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#182724]">
                        {row.label}
                      </p>
                      <p className="mt-1 text-xs text-[#70807a]">{row.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#e4e8e1] p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Metric label="Diff." value="18" />
                <Metric label="Risque" value="3" tone="red" />
                <Metric label="Temps" value="42s" />
              </div>
            </div>
          </aside>

          <section className="min-h-[680px] rounded-lg border border-[#d9dfd7] bg-white shadow-[0_22px_70px_rgba(21,35,33,0.08)]">
            <div className="flex flex-col gap-3 border-b border-[#e2e7e3] px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-[#60706b]">
                  Comparer
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#12211e]">
                  Document source vs document revise
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="green">Synthese prete</Pill>
                <Pill tone="red">Risque eleve</Pill>
                <button className="h-9 rounded-md border border-[#cbd5d0] px-3 text-sm font-semibold text-[#243b36] transition hover:bg-[#f3f7f4]">
                  Exporter
                </button>
              </div>
            </div>

            <div className="grid min-h-[618px] grid-cols-1 xl:grid-cols-[minmax(0,1fr)_292px]">
              <div className="p-4">
                <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-2">
                  <DocumentPane
                    title="Document source"
                    subtitle="Contrat-cadre-v3.pdf"
                    clauses={sourceClauses}
                    selectedDiffId={selectedDiffId}
                    side="source"
                  />
                  <DocumentPane
                    title="Document revise"
                    subtitle="Contrat-cadre-v4.pdf"
                    clauses={revisedClauses}
                    selectedDiffId={selectedDiffId}
                    side="revision"
                  />
                </div>
              </div>

              <aside className="border-t border-[#e2e7e3] bg-[#fbfcfa] p-4 xl:border-l xl:border-t-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#60706b]">
                      Differences
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-[#172522]">
                      Points detectes
                    </h3>
                  </div>
                  <span className="rounded-md border border-[#d7ded9] bg-white px-2 py-1 text-xs font-semibold text-[#53635e]">
                    18
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {differences.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedDiffId(item.id)}
                      className={`w-full rounded-md border p-3 text-left transition ${
                        selectedDiffId === item.id
                          ? "border-[#93b8ab] bg-white shadow-[0_12px_32px_rgba(28,51,47,0.10)]"
                          : "border-[#e2e7e3] bg-white/70 hover:border-[#c8d3ce]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#172522]">
                          {item.title}
                        </span>
                        <span
                          className={`shrink-0 rounded px-1.5 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                        >
                          {statusLabels[item.status]}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#60706b]">
                        {item.section}
                      </p>
                      <p className="mt-2 text-sm leading-5 text-[#4f5e59]">
                        {item.summary}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-md border border-[#dbe4df] bg-[#eff6f2] p-3">
                  <p className="text-xs font-semibold uppercase text-[#55766c]">
                    Synthese
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#1e3832]">
                    {selectedDiff.summary} Priorite suggeree: revue juridique
                    avant signature.
                  </p>
                </div>
              </aside>
            </div>
          </section>

          <aside className="flex min-h-[680px] flex-col overflow-hidden rounded-lg border border-[#d9dfd7] bg-white shadow-[0_22px_70px_rgba(21,35,33,0.08)]">
            <div className="flex items-center justify-between border-b border-[#e2e7e3] px-4 py-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[#60706b]">
                  Assistant
                </p>
                <h2 className="mt-1 text-lg font-semibold text-[#14211f]">
                  Analyse ChatKit
                </h2>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e9f6f1] text-[#123d37]">
                <AssistantIcon />
              </div>
            </div>
            <div className="min-h-0 flex-1 p-3">
              <ChatKitPanel
                theme={scheme}
                onWidgetAction={handleWidgetAction}
                onResponseEnd={handleResponseEnd}
                onThemeRequest={setScheme}
              />
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function AppHeader({
  scheme,
  onThemeChange,
}: {
  scheme: "light" | "dark";
  onThemeChange: (scheme: "light" | "dark") => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d9dfd7] bg-[#fbfcfa]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between gap-4 px-4 lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#123d37] text-white shadow-[0_12px_28px_rgba(18,61,55,0.25)]">
            <CompareIcon />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-[#14211f] sm:text-lg">
              IA de comparaison de document
            </h1>
            <p className="hidden text-xs font-medium text-[#6c7b75] sm:block">
              Revue, ecarts et synthese assistes par IA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden h-9 items-center gap-2 rounded-md border border-[#cbd5d0] bg-white px-3 text-sm font-semibold text-[#243b36] transition hover:bg-[#f3f7f4] md:flex">
            <ClockIcon />
            Historique
          </button>
          <button
            type="button"
            onClick={() => onThemeChange(scheme === "light" ? "dark" : "light")}
            className="h-9 rounded-md border border-[#cbd5d0] bg-white px-3 text-sm font-semibold text-[#243b36] transition hover:bg-[#f3f7f4]"
          >
            {scheme === "light" ? "Sombre" : "Clair"}
          </button>
        </div>
      </div>
    </header>
  );
}

function SegmentedControl({
  value,
  onChange,
}: {
  value: "diff" | "source" | "revision";
  onChange: (value: "diff" | "source" | "revision") => void;
}) {
  const items = [
    { value: "diff", label: "Diff" },
    { value: "source", label: "Source" },
    { value: "revision", label: "Revise" },
  ] as const;

  return (
    <div className="grid grid-cols-3 rounded-md border border-[#ccd7d2] bg-[#f2f5f1] p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`h-8 rounded text-xs font-semibold transition ${
            value === item.value
              ? "bg-white text-[#17302b] shadow-sm"
              : "text-[#66766f] hover:text-[#17302b]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function DocumentPane({
  title,
  subtitle,
  clauses,
  selectedDiffId,
  side,
}: {
  title: string;
  subtitle: string;
  clauses: string[];
  selectedDiffId: number;
  side: "source" | "revision";
}) {
  return (
    <article className="flex min-h-[560px] flex-col rounded-lg border border-[#dfe5e1] bg-[#fcfdfb]">
      <div className="flex items-center justify-between border-b border-[#e5e9e6] px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-[#162421]">{title}</h3>
          <p className="mt-1 text-xs text-[#71807b]">{subtitle}</p>
        </div>
        <span className="rounded border border-[#d7ded9] bg-white px-2 py-1 text-xs font-semibold text-[#52635d]">
          PDF
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-hidden p-4">
        {clauses.map((clause, index) => {
          const current = index + 1;
          const isSelected = current === selectedDiffId;
          const highlight =
            side === "revision"
              ? "bg-amber-100/80 text-[#3d2f11]"
              : "bg-red-50 text-[#532424]";

          return (
            <div
              key={clause}
              className={`rounded-md border p-4 transition ${
                isSelected
                  ? "border-[#95b9ad] bg-white shadow-[0_14px_36px_rgba(26,48,44,0.10)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-[#798780]">
                  Article {index + 4}.{index + 1}
                </span>
                {isSelected ? (
                  <span className="rounded bg-[#e7f5ef] px-2 py-1 text-xs font-semibold text-[#1a5a4d]">
                    actif
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-7 text-[#34433f]">
                {isSelected ? (
                  <mark className={`rounded px-1 py-0.5 ${highlight}`}>
                    {clause}
                  </mark>
                ) : (
                  clause
                )}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function Pill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "green" | "red";
}) {
  return (
    <span
      className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold ${
        tone === "green"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "red";
}) {
  return (
    <div className="rounded-md border border-[#e0e6e2] bg-white p-2">
      <p
        className={`text-base font-semibold ${
          tone === "red" ? "text-red-700" : "text-[#17302b]"
        }`}
      >
        {value}
      </p>
      <p className="text-[11px] font-medium text-[#71807b]">{label}</p>
    </div>
  );
}

function CompareIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 5h10M7 12h10M7 19h10M4 5h.01M4 12h.01M4 19h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 16V4m0 0 4 4m-4-4-4 4M5 16v3h14v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 3 1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon({ active }: { active: boolean }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
        active ? "bg-[#e5f4ee] text-[#155346]" : "bg-[#eef1ed] text-[#75837d]"
      }`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3h7l4 4v14H7V3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14 3v5h4M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function AssistantIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 8.5A4.5 4.5 0 0 1 9.5 4h5A4.5 4.5 0 0 1 19 8.5v3A4.5 4.5 0 0 1 14.5 16H12l-4 3v-3.2A4.5 4.5 0 0 1 5 11.5v-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
