import { useState } from "react";
import { Check, ChevronLeft, Plus, Trash2 } from "lucide-react";
import type { BibleData } from "@/lib/bible/types";
import { parseRef } from "@/lib/bible/parse-ref";
import { PLAN_PRESETS, planFromPreset, planProgress, uniquePlanName } from "@/lib/plans";
import { useAppStore, type ReadingPlan } from "@/lib/store";
import { Overlay } from "./ui/overlay";
import { Button } from "./ui/button";
import { chapterSpeech } from "@/lib/speech";
import { cn } from "@/lib/cn";

export function PlansView({ data, onOpenReader }: { data: BibleData; onOpenReader: () => void }) {
  const plans = useAppStore((s) => s.plans);
  const addPlan = useAppStore((s) => s.addPlan);
  const removePlan = useAppStore((s) => s.removePlan);
  const resetPlan = useAppStore((s) => s.resetPlan);
  const togglePlanStep = useAppStore((s) => s.togglePlanStep);
  const jumpTo = useAppStore((s) => s.jumpTo);
  const [openId, setOpenId] = useState<string | null>(null);
  const [presets, setPresets] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const current = plans.find((p) => p.id === openId) ?? null;

  const openReading = (reference: string) => {
    const parsed = parseRef(reference, data);
    if (!parsed) return;
    chapterSpeech.stop();
    jumpTo(parsed.book, parsed.chapter, parsed.verse);
    onOpenReader();
  };

  if (current) {
    const progress = planProgress(current);
    return (
      <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 py-5 pb-12">
        <button
          type="button"
          onClick={() => setOpenId(null)}
          className="mb-4 inline-flex h-11 items-center gap-1 text-sm text-muted hover:text-fg"
        >
          <ChevronLeft className="size-4" /> All plans
        </button>
        <h1 className="font-display text-2xl font-medium tracking-tight text-balance">{current.name}</h1>
        {current.description ? <p className="mt-1 text-sm text-muted">{current.description}</p> : null}
        <p className="mt-3 text-sm tabular-nums text-accent">
          {progress.done} of {progress.total} complete · {progress.percent}%
        </p>
        <ul className="mt-6 space-y-2">
          {current.steps.map((step, i) => (
            <li key={`${step.reference}-${i}`} className="rounded-[var(--radius-md)] bg-surface p-3 shadow-[var(--shadow-border)]">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => togglePlanStep(current.id, i)}
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
                    step.complete ? "bg-accent text-accent-fg" : "bg-bg text-muted shadow-[var(--shadow-border)]",
                  )}
                  aria-label={step.complete ? "Mark incomplete" : "Mark complete"}
                >
                  {step.complete ? <Check className="size-4" /> : null}
                </button>
                <button type="button" onClick={() => openReading(step.reference)} className="min-w-0 flex-1 text-left">
                  <span className="block text-xs text-muted">Day {i + 1}</span>
                  <span className="block font-medium">{step.title}</span>
                  <span className="block text-sm text-accent">{step.reference}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-2">
          <Button className="flex-1" onClick={() => resetPlan(current.id)}>
            Reset progress
          </Button>
          <Button
            className="flex-1"
            onClick={() => setConfirmId(current.id)}
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
        <Overlay
          open={confirmId === current.id}
          title={`Delete “${current.name}”?`}
          onClose={() => setConfirmId(null)}
        >
          <p className="text-sm text-muted">This removes the plan and its progress. Notes and highlights are not affected.</p>
          <div className="mt-5 flex gap-2">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                removePlan(current.id);
                setConfirmId(null);
                setOpenId(null);
              }}
            >
              Delete plan
            </Button>
            <Button className="flex-1" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
          </div>
        </Overlay>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 py-5 pb-12">
      <h1 className="font-display text-2xl font-medium tracking-tight">Reading plans</h1>
      <p className="mt-1 text-sm text-muted">
        Add a preset as your own editable copy. Tap a reading to open that passage.
      </p>
      <div className="mt-5 flex gap-2">
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => {
            const names = plans.map((p) => p.name);
            addPlan({
              id: `plan-${Date.now()}`,
              name: uniquePlanName("My reading plan", names),
              description: "",
              steps: [{ title: "Genesis 1", reference: "Genesis 1", complete: false }],
            });
          }}
        >
          <Plus className="size-4" />
          Blank plan
        </Button>
        <Button className="flex-1" onClick={() => setPresets(true)}>
          Add a preset
        </Button>
      </div>

      {plans.length === 0 ? (
        <p className="mt-8 rounded-[var(--radius-lg)] bg-surface px-4 py-6 text-sm leading-relaxed text-muted shadow-[var(--shadow-border)]">
          You do not have any plans yet. Start with a blank plan or one of the ten presets.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onOpen={() => setOpenId(plan.id)} />
          ))}
        </ul>
      )}

      <Overlay open={presets} title="Choose a preset" onClose={() => setPresets(false)} wide>
        <ul className="space-y-2">
          {PLAN_PRESETS.map((preset) => (
            <li key={preset.name}>
              <button
                type="button"
                onClick={() => {
                  const names = plans.map((p) => p.name);
                  const plan = planFromPreset(preset);
                  plan.name = uniquePlanName(plan.name, names);
                  addPlan(plan);
                  setPresets(false);
                  setOpenId(plan.id);
                }}
                className="w-full rounded-[var(--radius-md)] bg-bg px-4 py-3 text-left hover:bg-highlight/40"
              >
                <span className="block font-medium">{preset.name}</span>
                <span className="block text-sm text-muted">
                  {preset.readings.length} readings · {preset.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Overlay>
    </div>
  );
}

function PlanCard({ plan, onOpen }: { plan: ReadingPlan; onOpen: () => void }) {
  const progress = planProgress(plan);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-[var(--radius-lg)] bg-surface px-4 py-4 text-left shadow-[var(--shadow-border)]"
    >
      <span className="block font-display text-lg font-medium tracking-tight">{plan.name}</span>
      {plan.description ? <span className="mt-1 block text-sm text-muted">{plan.description}</span> : null}
      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-bg">
        <span className="block h-full bg-accent" style={{ width: `${progress.percent}%` }} />
      </span>
      <span className="mt-2 block text-xs tabular-nums text-accent">
        {progress.done} of {progress.total} · {progress.percent}%
      </span>
    </button>
  );
}
