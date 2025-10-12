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

const BASIC_COLLECTION = {
    numberCases: 41,

    categoryNames: [
        "Basic Inserts",
        "Pieces on Top / White facing Front / Edge oriented",
        "Pieces on Top / White facing Front / Edge unoriented",
        "Pieces on Top / White facing Side / Edge oriented",
        "Pieces on Top / white facing Side / Edge unoriented",
        "Pieces on Top / White facing Up / Edge oriented",
        "Pieces on Top / White facing Up / Edge unoriented",
        "Edge solved",
        "Edge flipped",
        "Corner on Bottom / Edge on Top / Edge oriented",
        "Corner on Bottom / Edge on Top / Edge unoriented",
    ],
    categoryCases: [
        [4, 3, 1, 2],
        [5, 7, 15],
        [9, 11, 13],
        [10, 12, 14],
        [6, 8, 16],
        [17, 19, 21, 23],
        [18, 20, 22, 24],
        [32, 33, 34, 38, 39],
        [31, 35, 36, 40, 41, 37],
        [27, 30, 25],
        [29, 28, 26],
    ],
    ignoreAUF: [37, 38, 39, 40, 41],
};

const BASIC_BACK_COLLECTION = {
    numberCases: 41,

    categoryNames: [
        "Basic Inserts",
        "Pieces on Top / White facing Back / Edge oriented",
        "Pieces on Top / White facing Back / Edge unoriented",
        "Pieces on Top / White facing Side / Edge oriented",
        "Pieces on Top / white facing Side / Edge unoriented",
        "Pieces on Top / White facing Up / Edge oriented",
        "Pieces on Top / White facing Up / Edge unoriented",
        "Edge solved",
        "Edge flipped",
        "Corner on Bottom / Edge on Top / Edge oriented",
        "Corner on Bottom / Edge on Top / Edge unoriented",
    ],
    categoryCases: [
        [4, 3, 1, 2],
        [6, 8, 16],
        [10, 12, 14],
        [9, 11, 13],
        [5, 7, 15],
        [18, 20, 22, 24],
        [17, 19, 21, 23],
        [32, 34, 33, 39, 38],
        [31, 36, 35, 41, 40, 37],
        [28, 29, 26],
        [30, 27, 25],
    ],
    ignoreAUF: [37, 38, 39, 40, 41],
};

const ADVANCED_COLLECTION = {
    numberCases: 60, // 42,

    categoryNames: [
        "Slot in Front  / White facing Up",
        "Slot in Front / White facing Front",
        "Slot in Front / White facing Side",
        "Slot in Front / Corner in Adjacent Slot",
        "Slot in Back / Edge in Adjacent Front Slot", // new
        "Slot in Back / Corner in Adjacent Front Slot",
        "Edge in Opposite Slot",
        "Corner in Opposite Slot",
        "Basic Cases / Free Slot",
    ],
    categoryCases: [
        [1, 2, 3, 4],
        [9, 10, 13, 14],
        [7, 8, 11, 12],
        [19, 20, 21, 22, 23, 24],
        [37, 38, 39, 40, 41, 42], // new
        [25, 26, 27, 28, 29, 30],
        [5, 6, 17, 18, 15, 16],
        [31, 32, 33, 34, 35, 36],
        [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    ],
    // Individual naming
    // corresponding to basic cases, e.g. 10B -> Basic Case 10, Back slot free
    caseNumberMapping: {
        43: "10B",
        44: "12B",
        45: "15B",
        46: "23B",
        47: "25B",
        48: "25F",
        49: "26B",
        50: "26F",
        51: "33B",
        52: "33F",
        53: "34B",
        54: "34F",
        55: "37B",
        56: "37F",
        57: "38B",
        58: "38F",
        59: "39B",
        60: "39F",
    },
    piecesToHide: [
        "br",
        "br",
        "fl",
        "fl",
        "fr",
        "fr",
        "br",
        "br",
        "fl",
        "fl",
        "fl",
        "fl",
        "br",
        "br",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "fr",
        "br",
        "br",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
        "br",
        "fl",
    ],
    // fr: front-right, fl: front-left, br: back-right, bl: back-left
    ignoreAUF: [55, 56, 57, 58, 59, 60],
};

const EXPERT_COLLECTION = {
    numberCases: 17,

    categoryNames: [
        "Corner is solved",
        "Pair in wrong slot",
        "Flipped edge & corner in adjacent slot",
        "Other easy cases",
    ],
    categoryCases: [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9],
        [10, 11, 12, 13, 14, 15],
        [16, 17],
    ],
    piecesToHide: ["br", "br", "fl", "fl", "fl", "fl", "fl", "br", "fr", "fl", "br", "fl", "br", "fl", "br", "fl", "br"],
    // fr: front-right, fl: front-left, br: back-right, bl: back-left
    ignoreAUF: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
};
