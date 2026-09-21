"use client";

import type { ReactNode } from "react";

import { AutopilotFullScene, AutopilotStackScene, PauseSafelyScene, SessionPickupScene } from "./autopilot";
import { HomeConstellation, MultiPhasePlanScene, OpeningPrScene, WorktreeCleanupScene } from "./closeout";
import { AuthoringSkillScene, EvalScene, PrototypeScene, VisualParityScene } from "./craft";
import { BugFixScene, HillclimbScene, InvestigationScene, PerfIssueScene } from "./diagnose";
import { FeatureScene, RefactoringScene, RuntimeForensicsScene, TraceForensicsScene } from "./forensics";
import { AutonomousRunScene, BabysitScene, OrchestrateScene, ShippingScene } from "./ops";
import type { SceneProps } from "./shared";

export { Floor, Lights } from "./shared";
export { HomeConstellation } from "./closeout";
export type { SceneProps } from "./shared";

export const sceneBySlug: Record<string, (props: SceneProps) => ReactNode> = {
  investigation: (props) => <InvestigationScene {...props} />,
  "bug-fix": (props) => <BugFixScene {...props} />,
  "perf-issue": (props) => <PerfIssueScene {...props} />,
  hillclimb: (props) => <HillclimbScene {...props} />,
  "runtime-forensics": (props) => <RuntimeForensicsScene {...props} />,
  "trace-forensics": (props) => <TraceForensicsScene {...props} />,
  feature: (props) => <FeatureScene {...props} />,
  refactoring: (props) => <RefactoringScene {...props} />,
  prototype: (props) => <PrototypeScene {...props} />,
  "visual-parity": (props) => <VisualParityScene {...props} />,
  "authoring-a-skill": (props) => <AuthoringSkillScene {...props} />,
  eval: (props) => <EvalScene {...props} />,
  babysit: (props) => <BabysitScene {...props} />,
  shipping: (props) => <ShippingScene {...props} />,
  "autonomous-run": (props) => <AutonomousRunScene {...props} />,
  orchestrate: (props) => <OrchestrateScene {...props} />,
  "autopilot-full": (props) => <AutopilotFullScene {...props} />,
  "autopilot-stack": (props) => <AutopilotStackScene {...props} />,
  "session-pickup": (props) => <SessionPickupScene {...props} />,
  "pause-safely": (props) => <PauseSafelyScene {...props} />,
  "multi-phase-plan": (props) => <MultiPhasePlanScene {...props} />,
  "worktree-cleanup": (props) => <WorktreeCleanupScene {...props} />,
  "opening-a-pr": (props) => <OpeningPrScene {...props} />,
};
