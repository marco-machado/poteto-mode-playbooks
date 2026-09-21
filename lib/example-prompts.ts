import { catalog } from "@/lib/catalog";

/** Realistic chat prompts that should route to this playbook. Adapted from pstack README / SKILL.md where those examples exist. */
export const examplePromptsBySlug: Record<string, readonly string[]> = {
  investigation: [
    "/poteto-mode how does run cancellation work? do we have an n+1 when we look up every run to cancel? stay read-only.",
    "/poteto-mode why was the billing cache keyed by org instead of team? I need a cited answer, not a rewrite.",
    "/poteto-mode are we sure this flag is off because of a product call, or did the rollout just stall?",
    "/poteto-mode should we keep the legacy store adapter or delete it? tradeoffs table, no PR.",
  ],
  "bug-fix": [
    "/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle. repro first, then fix and verify.",
    "/poteto-mode clicking Save twice submits two drafts. reproduce on the editor yourself, then fix the smallest change the evidence justifies.",
    "/poteto-mode notifications mark-as-read races: the badge comes back after refresh. repro first, don't guess.",
    "/poteto-mode this flake only happens after 30s idle in the agent transcript view. instrument it yourself, then fix and verify.",
  ],
  "perf-issue": [
    "/poteto-mode a big list takes a second or two to load even though we virtualize. run a cpu trace and tell me why.",
    "/poteto-mode first paint on /projects jumped from 180ms to 1.1s after yesterday's nav change. capture a baseline, then improve it.",
    "/poteto-mode the TUI redraws the whole list on every keystroke. trace it, don't rewrite the renderer on a hunch.",
    "/poteto-mode heap grows ~40MB during a 5-minute idle session in the composer. one-off perf against a baseline, not a hillclimb.",
  ],
  hillclimb: [
    "/poteto-mode hillclimb time-to-first-token on this fixture until we're at least 50% under baseline and you've logged 10 iterations.",
    "/poteto-mode keep looping on cold-start memory for the language server. one hypothesis per attempt, revert misses, stop at 120MB p95.",
    "/poteto-mode the p99 of open-large-file is 900ms. freeze a harness and climb until it's under 400ms.",
    "/poteto-mode don't one-shot this. run a measured hillclimb on search latency against the 10k-file corpus.",
  ],
  "runtime-forensics": [
    "/poteto-mode the app's idle CPU sits at 18% after a chat finishes. diagnose from live instrumentation. don't ship a fix yet.",
    "/poteto-mode memory climbs ~2MB/min while the window is backgrounded. I want the smoking gun, not a patch.",
    "/poteto-mode the canvas glitches every few seconds only in production. attach to the live process and name the mechanism.",
    "/poteto-mode something is spinning after websocket disconnect. instrument, reduce, prove, map to source.",
  ],
  "trace-forensics": [
    "/poteto-mode here's a cpuprofile from last night's hang. diagnose from the capture. don't re-run the app.",
    "/poteto-mode this heap snapshot was taken after the leak. walk the retainer chain and attribute it to source.",
    "/poteto-mode spindump attached. tell me the hot frames and which of our files they belong to.",
    "/poteto-mode chrome trace from the janky scroll. make it queryable and cite the cause. diagnosis only.",
  ],
  feature: [
    "/poteto-mode build a small feature behind a feature flag. verify it really works.",
    "/poteto-mode add a per-workspace mute-until on notifications. name the data shape first, then build and verify on the real UI.",
    "/poteto-mode we need export-to-markdown for a thread, including tool calls. plan, implement, open a PR.",
    "/poteto-mode change the billing usage chart to a stacked daily series. new behavior, not a restyle.",
  ],
  refactoring: [
    "/poteto-mode extract the retry policy out of fetchJson without changing behavior. pin tests first.",
    "/poteto-mode rename AgentRun to SessionRun across the package. behavior-preserving, prove equivalence.",
    "/poteto-mode this file is a maze of one-caller wrappers. collapse reader load, don't add a new layer.",
    "/poteto-mode move the prompt builder into its own module and delete the dead flags. no feature work.",
  ],
  prototype: [
    "/poteto-mode build two prototypes of the markdown renderer so we can compare. spawn an agent for each.",
    "/poteto-mode mock up two layouts for the diff hunk header so we can pick one. throwaway, then recommend.",
    "/poteto-mode sketch the three ways to cancel in-flight tools and let me watch them. don't ask me which, show me.",
    "/poteto-mode try this empty-state as a throwaway. I need a design decision, not a PR.",
  ],
  "visual-parity": [
    "/poteto-mode the row spacing is too tall when this flag is on. the second image is correct. repro and fix until it matches.",
    "/poteto-mode migrate this settings row from the old CSS to the token system. lock a screenshot first. nonzero diff is a fail.",
    "/poteto-mode the new composer matches the old one except the send button. pixel-exact, don't touch the baseline.",
    "/poteto-mode these two implementations of the file tree must overlay with a zero pixel delta.",
  ],
  "authoring-a-skill": [
    "/poteto-mode write a SKILL.md for our repo's verify script. keep only prose that changes a decision.",
    "/poteto-mode edit the hillclimb skill: the stop predicate is getting ignored. validate frontmatter and links, then PR.",
    "/poteto-mode this skill is slop. delete half of it and keep the routing rules.",
    "/create-skill for triaging flaky CI, then run the authoring playbook so it actually ships.",
  ],
  eval: [
    "/poteto-mode eval whether the shorter system prompt still follows the babysit playbook. blind the candidates.",
    "/poteto-mode before we promote this skill edit, run organic prompts in sanitized dirs and judge by label.",
    "/poteto-mode compare the old vs new unslop instructions on 8 real tasks. I want transcripts, not vibes.",
    "/poteto-mode does this routing change make agents skip repro? design a blinded eval, then synthesize.",
  ],
  babysit: [
    "/poteto-mode check on pr 123. anything outstanding?",
    "/poteto-mode babysit this. get #1842 merge-ready, don't merge it.",
    "/poteto-mode address the bugbot comments on the stack. dismiss noise with a reason.",
    "/poteto-mode anything outstanding on the open PR? conflicts, review threads, and CI only.",
  ],
  shipping: [
    "/poteto-mode i'm going to bed. land the stack even if ci flakes. i want everything merged by morning.",
    "/poteto-mode the stack is green. independently verify each PR, then land the contiguous run from the root.",
    "/poteto-mode ship #12 through #15 if they still verify after rebase. stop at the first gap.",
    "/poteto-mode don't trust the green checks. re-verify, then squash-land from the base.",
  ],
  "autonomous-run": [
    "/poteto-mode /loop until every package under packages/ has a passing check.sh. don't stop for questions.",
    "/poteto-mode run until the migration script has zero remaining call sites. checkpoint every loop.",
    "/poteto-mode going to bed. keep driving this one task until the predicate is true. don't start a program.",
    "/poteto-mode don't stop. finish the remaining failing tests in this package tonight.",
  ],
  orchestrate: [
    "/poteto-mode own this migration until it lands. multi-day, many stacked PRs, you coordinate, you never write the code.",
    "/poteto-mode run this whole project: extract the editor into a package, stacked PRs, fleets of subagents. I'll check twice a day.",
    "/poteto-mode this outlives one session. stand up orchestrate, author briefs, keep the frontier green.",
    "/poteto-mode coordinate the design-system sweep across 40 surfaces. you're the program, not the coder.",
  ],
  "autopilot-full": [
    "/poteto-mode autopilot this queue. independent PRs, one owner each, merge only on a clean swarm verdict.",
    "/poteto-mode full autopilot on the 12 unblocked tickets. I will click the operator items.",
    "/poteto-mode run these unrelated fixes to merged. nothing merges without your root verification.",
    "/poteto-mode one-owner-per-PR on this list until they're on main.",
  ],
  "autopilot-stack": [
    "/poteto-mode autopilot-stack these changes. stack them, don't ship. I'll review and land.",
    "/poteto-mode build the stack, I'll land it. linear base-branch, clean verdicts only.",
    "/poteto-mode queue these refactors as one reviewed stack. nobody merges.",
    "/poteto-mode stack the billing PRs in order on main. autonomous build and verify, operator lands.",
  ],
  "session-pickup": [
    "/poteto-mode pick up the cloud-agent run I linked. resume from the last checkpoint, don't redo the investigation.",
    "/poteto-mode the last agent died mid-PR. read the transcript and continue from the resume point.",
    "/poteto-mode take over the pushed branch from last night. reconstruct state, then route remaining work.",
    "/poteto-mode resume last night's run. inherited claims still need proof on the real artifact.",
  ],
  "pause-safely": [
    "/poteto-mode pause safely. I'm restarting Cursor. leave a checkpoint a cold-start agent can resume from.",
    "/poteto-mode going offline for a few hours. no new irreversible actions. write the resume note off-context.",
    "/poteto-mode context is about to compact. suspend cleanly so session pickup can take over.",
    "/poteto-mode stop at a safe boundary, wip commit, and park the trail. this is a pause, not the final report.",
  ],
  "multi-phase-plan": [
    "/poteto-mode open source these skills as a plugin. nothing internal leaks, work in a temp dir, show me the dependency graph first.",
    "/poteto-mode plan the store migration as stacked PRs. the plan is the deliverable. do not implement.",
    "/poteto-mode this spans three phases. write a box-by-box checklist an owner can run. stop after check-plan.",
    "/poteto-mode sketch the PR stack for deleting the legacy RPC. no code until I say go.",
  ],
  "worktree-cleanup": [
    "/poteto-mode what's using my disk? prune safe-to-prune worktrees only.",
    "/poteto-mode clean up worktrees from merged PRs. pause on anything with uncommitted work.",
    "/poteto-mode free up space. delete old iOS simulators that aren't pinned to a chat.",
    "/poteto-mode prune abandoned worktrees. treat the buckets as advice, verify against pinned chats.",
  ],
  "opening-a-pr": [
    "/poteto-mode open the PR from this worktree. small ordered commits, Conventional Commits title, ready not draft.",
    "/poteto-mode rebase these onto main as a briefing-style PR. don't start babysit just because it exists.",
    "/poteto-mode deslop, split the commits, and open it ready.",
    "/poteto-mode package this diff as a PR. title like fix(pstack): retarget opening-a-pr babysit trigger.",
  ],
};

export function examplePromptsFor(slug: string): readonly string[] {
  return examplePromptsBySlug[slug] ?? [];
}

export function assertExamplePrompts(): void {
  const missing = catalog.filter((item) => {
    const prompts = examplePromptsBySlug[item.slug];
    return !prompts || prompts.length < 3 || prompts.length > 5;
  });
  if (missing.length > 0) {
    throw new Error(
      `example prompts missing or out of range for: ${missing.map((item) => item.slug).join(", ")}`,
    );
  }
}
