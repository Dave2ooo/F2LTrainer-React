import { OPPOSITE_COLOR, SIDE_COLOR, STICKERING, type StickerColor, type StickerHidden } from "@/types/stickering";

function getStickeringString(crossColor: StickerColor, frontColor: StickerColor, pieceToHide: StickerHidden, mirrored: boolean) {
    let edgesArr, cornersArr;

    // If selection is 1, show the whole cube (no hidden stickers)

    edgesArr = Array(12).fill("-");
    cornersArr = Array(8).fill("-");

    // Hide F2L slot *only if pieceToHide is set*
    if (pieceToHide !== undefined) {
        let side: "left" | "right"
        let facing: "front" | "back";
        // fr: front-right, fl: front-left, br: back-right, bl: back-left
        if (pieceToHide === "fr") {
            facing = "front";
            side = "right";
        } else if (pieceToHide === "fl") {
            facing = "front";
            side = "left";
        } else if (pieceToHide === "br") {
            facing = "back";
            side = "left";
        } else if (pieceToHide === "bl") {
            facing = "back";
            side = "right";
        } else throw new Error("Invalid pieceToHide: " + pieceToHide);

        // If mirrored, swap left and right
        if (mirrored) {
            side = side === "left" ? "right" : "left";
        }

        const backColor = OPPOSITE_COLOR[frontColor];

        let f2lFace: StickerColor = "red";
        let f2lSideColor: StickerColor | undefined = undefined;
        if (facing === "front") {
            f2lFace = frontColor;
            const entry = SIDE_COLOR[crossColor][frontColor];
            f2lSideColor = entry?.[side];

        } else if (facing === "back") {
            f2lFace = backColor;
            const entry = SIDE_COLOR[crossColor][backColor];
            f2lSideColor = entry?.[side];
        }

        if (f2lSideColor === undefined)
            throw new Error("Invalid pieceToHide: " + pieceToHide);

        edgesArr[STICKERING.edges[f2lFace][f2lSideColor]] = "I";
        cornersArr[STICKERING.corners[crossColor][f2lFace][f2lSideColor]] = "I";
    }

    // Hide top layer
    const topColor = OPPOSITE_COLOR[crossColor];
    const edgeIndices = Object.values(STICKERING.edges[topColor]);
    for (const i of edgeIndices) edgesArr[i] = "I";
    const colorObjs = Object.values(STICKERING.corners[topColor]);
    for (const obj of colorObjs) for (const idx of Object.values(obj)) cornersArr[idx] = "I";


    // --- Apply mask to the player ---
    const edges = edgesArr.join("");
    const corners = cornersArr.join("");
    return `EDGES:${edges},CORNERS:${corners},CENTERS:------`;
}