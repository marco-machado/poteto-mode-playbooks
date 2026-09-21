export type PlaybookGroup = "diagnose" | "build" | "ship" | "run" | "session";

export type CatalogItem = {
  slug: string;
  title: string;
  whenToUse: string;
  own: string | null;
  idea: string;
  metaphor: string;
  group: PlaybookGroup;
  groupLabel: string;
  accent: string;
  sourceUrl: string;
  order: number;
};

const GROUP_LABEL: Record<PlaybookGroup, string> = {
  diagnose: "Diagnose",
  build: "Build",
  ship: "Ship",
  run: "Run",
  session: "Session",
};

function item(
  slug: string,
  title: string,
  group: PlaybookGroup,
  whenToUse: string,
  own: string | null,
  idea: string,
  accent: string,
  metaphor: string,
  order: number,
): CatalogItem {
  return {
    slug,
    title,
    whenToUse,
    own,
    idea,
    metaphor,
    group,
    groupLabel: GROUP_LABEL[group],
    accent,
    sourceUrl: `https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/playbooks/${slug}.md`,
    order,
  };
}

export const catalog: CatalogItem[] = [
  item("investigation", "Investigation", "diagnose", "A read-only question: how does X work, why was Y built this way, are we sure.", "You own the answer. Plan, route, write.", "Stay read-only. Route through how (and why for motivation), write a cited explanation or a tradeoffs table, then unslop the reply. No PR unless the investigation is about to become a code change.", "#7dd3fc", "A scan lights the cited node. The structure is not rewritten.", 1),
  item("bug-fix", "Bug fix", "diagnose", "A reported defect to reproduce, root-cause, and fix with runtime evidence.", "You own this task. Plan, review, verify.", "Reproduce on the real surface, binary-search until one mechanism survives, plan then fix the smallest change the evidence justifies, verify the original repro, and commit failing-test-first before the fix.", "#fb7185", "A probe finds the red root. The failing case turns green.", 2),
  item("perf-issue", "Perf issue", "diagnose", "A measured slowness to trace and improve against a baseline.", "You own the measurement story. Plan, review, verify the numbers.", "Capture a baseline trace, generate hypotheses from the eight strategy families only when the trace shows their signal, change from the numbers, then cite before and after in the PR. Sustained metric work is Hillclimb, not this.", "#fbbf24", "Particles jam in a bottleneck, then the path opens.", 3),
  item("hillclimb", "Hillclimb", "diagnose", "Sustained scientific improvement of one metric against a target, looping hypotheses with before/after measurement.", "You own the metric and the experiment's integrity. Supervise and review. Delegate the attempts.", "Freeze a sensitive harness, log every attempt, keep or revert one hypothesis at a time, and stop only when the predicate is met. Inspection is not a win.", "#34d399", "One step, one measurement. The climber keeps only a real gain.", 4),
  item("runtime-forensics", "Runtime forensics", "diagnose", "Diagnose a live symptom (leak, idle-CPU spin, glitch) from instrumentation. The deliverable is a diagnosis, not a fix.", "You own the diagnosis. Instrument the live process, don't theorize from source.", "Instrument the live process, reduce the artifact to a smoking gun, prove the mechanism cheaply, then map it to source. Hand the cause to Bug fix or Perf. Do not ship a fix here.", "#c084fc", "Live probes orbit a spinning process and pin the smoking gun.", 5),
  item("trace-forensics", "Trace forensics", "diagnose", "Diagnose a captured profiling artifact (cpuprofile, trace, spindump, heap snapshot) handed to you after the fact.", "You own the diagnosis from the artifact. Load it, shape it, narrow to the cause, attribute to source.", "The capture already exists. Load it, make it queryable, walk to the hot path or retainer chain, attribute to source, and return a cited diagnosis.", "#a78bfa", "A frozen capture is sliced until the hot frame stands alone.", 6),
  item("feature", "Feature", "build", "New or changed behavior, built from a named data shape.", "You own the design. Plan, review, verify.", "Name the data shape, explore design with architect, write the four-item throughput checkpoint, delegate implementation, verify on the matching surface, then open a PR.", "#60a5fa", "Named blocks assemble into a new shape.", 7),
  item("refactoring", "Refactoring", "build", "A behavior-preserving change to structure or shape (rename, extract, inline, dedupe, move).", "You own the contract. The structure changes. The behavior does not.", "Pin current behavior first, name the missing shape, subtract dead weight, move in green slices, and prove equivalence on the real artifact. If reader load did not drop, revert.", "#2dd4bf", "A messy lattice rearranges. The silhouette stays the same.", 8),
  item("prototype", "Prototype", "build", "A throwaway sketch to make a design or behavioral decision cheaply, or to settle an empirical fork by observing it.", "You own the design decision, not the code. The prototype is a throwaway instrument. The real build follows Feature.", "Scope the decision, sketch throwaway variants in isolation, observe them, and recommend. The prototype is an instrument. The real build is Feature.", "#f472b6", "Throwaway wireframes swap until one decision holds.", 9),
  item("visual-parity", "Visual parity", "build", "Pixel-exact UI equivalence: matching two implementations or migrating a styling system.", "You own pixel-exact equivalence. The baseline is the spec. You do not touch it.", "Lock a screenshot baseline before any migration. Diff pixels, not eyes. One component at a time. A nonzero diff is a fail. Never edit the baseline to make it pass.", "#e879f9", "Two planes overlay until the pixel delta is zero.", 10),
  item("authoring-a-skill", "Authoring or modifying a skill", "build", "Writing or editing a SKILL.md.", "You own the skill's voice.", "Use Cursor's create-skill skill, validate frontmatter and links, test structural cases, then open a PR. Prefer deletion. Keep only prose that changes a decision.", "#facc15", "Pages stack into a skill. Extra prose falls away.", 11),
  item("eval", "Eval", "build", "Testing how a skill, structure, or prompt change affects agent behavior before promoting it.", "You own the experiment design. Plan, blind, run, synthesize.", "Blind the candidates. Frame a rubric they never see, run organic prompts in sanitized dirs, judge by label not model name, then synthesize from transcripts and outputs yourself.", "#38bdf8", "Blinded lanes race. A judge scores labels, not names.", 12),
  item("babysit", "Babysit", "ship", "Driving a PR or a stack to merge-ready: conflicts, review threads, CI.", "You own the merge frontier. Declare a mode, clear one PR at a time, stop where the human's call begins.", "Declare a mode, work only the lowest unmerged PR, never merge, and stop at merge-ready. Landing is Shipping. Trust the forge verdict, not a green check list.", "#4ade80", "Frontier gauges clear red to green. Nothing merges.", 13),
  item("shipping", "Shipping", "ship", "Independently verifying a green stack, then landing the contiguous verified run bottom-up.", "You own what lands. Verify each PR independently, land only the verified run from the root, then keep your hands off the queue.", "Verify each PR independently with an agent that did not write it. Land only the contiguous verified run from the root, one squash at a time, re-checking patch-id after every rebase.", "#f59e0b", "Verified boxes land from the root. The chain stops at the first gap.", 14),
  item("autonomous-run", "Autonomous run", "run", "A long task to drive to completion without stopping.", "You own the exit condition. Define done, then drive to it without stopping.", "Write a checkable done predicate, pick a wake mechanism, iterate the smallest justified change, checkpoint every loop, and stop only when the predicate is true.", "#818cf8", "A loop drives a predicate. Plateaus do not stop it.", 15),
  item("orchestrate", "Orchestrate", "run", "A standing project handed to one coordinator chat: multi-day, many stacked PRs, fleets of subagents.", "You own the program, never the code. Author briefs, drain the queue, keep the frontier green, decide.", "You are the coordinator, never the coder. Author briefs, drain a queue, keep the frontier green. Completions are queue events. A vague brief fails quietly across the tree.", "#22d3ee", "A coordinator fans briefs to many agents and drains completions.", 16),
  item("autopilot-full", "Autopilot-full", "run", "A queue of independent PRs run to merged with full autonomy. One owner per PR, root swarm-verifies before merge.", "You own the verdicts, never the PRs. One owner runs each PR from build to merge, and nothing merges without your clean swarm verdict.", "One owner carries each independent PR through merge. The root swarm-verifies every merge-ready head. Nothing merges without that clean verdict. Operator items wait for a click.", "#a3e635", "Independent tracks run in parallel. A clean verdict opens merge.", 17),
  item("autopilot-stack", "Autopilot-stack", "run", "A queue of changes built and verified with full autonomy, delivered as one linear reviewed base-branch stack the operator lands.", "You own the stack, never the landing. Build and verify the queue with full autonomy, then hand the operator one linear base-branch stack to review and land.", "Same owner loop as Autopilot-full, but nobody merges. Clean verdicts append to one linear stack the operator reviews and lands.", "#fb923c", "Verified discs stack in order. The operator lands the chain.", 18),
  item("session-pickup", "Session pickup", "session", "Resuming or taking over a prior agent's in-flight work from a transcript, cloud-agent URL, or pushed branch.", "You own the resume point. Read the prior trail, don't redo it.", "Find the prior trail, reconstruct state, name the resume point, and route remaining work. Do not redo completed work. Inherited claims still need proof on the real artifact.", "#67e8f9", "A fading ghost hands the baton. Completed work is not redone.", 19),
  item("pause-safely", "Pause safely", "session", "Suspending in-flight work cleanly so it can be resumed. The complement to Session pickup.", "You own a clean stop. Leave a checkpoint a cold-start agent can resume from.", "Stop at a safe boundary, take no new irreversible action, commit a wip checkpoint, and write a resume note off-context. This is a pause, not a final report.", "#94a3b8", "Motion freezes at a safe frame. A checkpoint cube remains.", 20),
  item("multi-phase-plan", "Multi-phase or multi-PR plan", "session", "Work that spans phases or stacked PRs. The plan is the deliverable. Do not implement.", "You own the plan, not the code. The plan is a checklist an owner runs box by box and the operator audits from the evidence.", "Write a box-by-box checklist an owner can run and an operator can audit. Prototype open questions first, fill the skeleton, run check-plan.mjs, then stop. Execution waits for an explicit go.", "#c4b5fd", "Phases light in sequence. The plan is the artifact, not the code.", 21),
  item("worktree-cleanup", "Worktree and simulator cleanup", "session", "Reclaiming local disk by pruning merged or abandoned git worktrees and stale iOS simulators.", "You own the disk and the safety gate.", "Audit with the lever, treat buckets as advice, verify against pinned chats, pause on uncommitted work, then prune. This playbook deletes user state, so the gates are the review.", "#86efac", "Extra trees dissolve. Anything in use stays.", 22),
  item("opening-a-pr", "Opening a PR", "ship", "Invoked at the end of every other playbook. Open a ready PR from small ordered commits.", null, "Work from a worktree, rebase into small ordered commits, deslop, write a briefing-style Conventional Commits PR, open it ready, and do not start a babysit just because the PR exists.", "#fde68a", "Small commits fold into a ready PR that lifts off.", 23),
];

export const groups: { id: PlaybookGroup | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "diagnose", label: "Diagnose" },
  { id: "build", label: "Build" },
  { id: "ship", label: "Ship" },
  { id: "run", label: "Run" },
  { id: "session", label: "Session" },
];

export const SOURCE_REPO = "https://github.com/cursor/plugins/tree/main/pstack";
export const SOURCE_PLAYBOOKS =
  "https://github.com/cursor/plugins/tree/main/pstack/skills/poteto-mode/playbooks";
export const SKILL_SOURCE =
  "https://github.com/cursor/plugins/blob/main/pstack/skills/poteto-mode/SKILL.md";
export const PLAYBOOK_RAW =
  "https://raw.githubusercontent.com/cursor/plugins/main/pstack/skills/poteto-mode/playbooks";
