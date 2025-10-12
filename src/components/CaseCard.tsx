import { Button, Card, Text, VStack } from "@chakra-ui/react";
import React from "react";
import TwistyPlayer, { type TwistyPlayerHandle } from "./TwistyPlayer";
import { mirrorAlg } from "@/logic/mirrorAlg";
import type { StickerColor, StickerHidden } from "@/types/stickering";
import getStickeringString from "@/logic/stickering";
import type { Group } from "@/types/group";
import { useCaseState, useUpdateCaseState } from "@/state/GlobalStateContext";

interface Props {
  groupId: Group;
  caseId: number;
  rotation?: string;
  setupAlgRight: string;
  alg: string;
  stickering?: StickerHidden;
  crossColor?: StickerColor;
  frontColor?: StickerColor;
}

const CaseCard = ({
  groupId,
  caseId,
  rotation = "z2 y'",
  setupAlgRight,
  alg,
  stickering,
  crossColor = "white",
  frontColor = "red",
}: Props) => {
  const twistyRef = React.useRef<TwistyPlayerHandle>(null);

  const [mirrored, setMirrored] = React.useState(false);
  const caseState = useCaseState(groupId, caseId);
  const updateCaseState = useUpdateCaseState();

  const handleAlgorithmSelectionUpdate = React.useCallback(() => {
    updateCaseState(groupId, caseId, (previousCase) => ({
      ...previousCase,
      algorithmSelection: { left: 1, right: 1 },
    }));
  }, [caseId, groupId, updateCaseState]);

  return (
    <>
      <Card.Root flexDirection={"row"} overflow={"hidden"}>
        <TwistyPlayer
          ref={twistyRef}
          experimentalSetupAlg={[rotation, mirrored ? mirrorAlg(setupAlgRight) : setupAlgRight].join(" ")}
          cameraLongitude={mirrored ? -25 : 25}
          controlPanel="none"
          experimentalDragInput="none"
          background="none"
          experimentalStickering={getStickeringString(crossColor, frontColor, stickering, mirrored)}
        />
        <Card.Title>F2L Case</Card.Title>
        <Card.Header>{mirrored ? mirrorAlg(alg) : alg}</Card.Header>
        <Card.Body />
        <Card.Footer>
          <VStack>
            <Button>Edit</Button>
            <Button onClick={() => setMirrored(!mirrored)}>Mirror</Button>
            <Button onClick={handleAlgorithmSelectionUpdate}>Set Algorithm Selection to (1, 1)</Button>
            <Text fontSize="sm">
              Current selection: L {caseState?.algorithmSelection.left ?? "-"} / R {caseState?.algorithmSelection.right ?? "-"}
            </Text>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default CaseCard;
