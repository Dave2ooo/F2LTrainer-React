export type Group = "basic" | "basicBack" | "advanced" | "expert";
export type TrainState = "unlearned" | "learning" | "finished";

type CaseId = number; // 1-based, matches existing assets

interface CaseState {
    status: 0 | 1 | 2; // learning, unlearned, finished / could also be "unlearned" | "learning" | "finished"
    algorithmSelection: { left: number; right: number };
    customAlgorithm: { left: string; right: string };
    identicalAlgorithm: boolean;
    solveCount: number;
}

interface GroupState {
    cases: Record<CaseId, CaseState>;
    collapsedCategories: Record<number, boolean>;
}

interface GlobalState {
    groups: Record<Group, GroupState>;
    currentGroup: Group; // Group that is selected in selection view
    trainStateSelection: Record<TrainState, boolean>;
    trainGroupSelection: Record<Group, boolean>;
    trainSideSelection: Record<"left" | "right", boolean>;
    colorSelection: Record<"cross" | "front", string>;
}