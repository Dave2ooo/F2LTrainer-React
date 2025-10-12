import { Button, Card, Text, VStack } from "@chakra-ui/react";
import React, { useMemo, useRef } from "react";
import TwistyPlayer, { type TwistyPlayerHandle } from "./TwistyPlayer";
import { mirrorAlg } from "@/logic/mirrorAlg";
import type { StickerColor, StickerHidden } from "@/types/stickering";
import getStickeringString from "@/logic/stickering";
import type { Group } from "@/types/group";
import { useGlobalState } from "@/state/GlobalStateContext";

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
  const twistyRef = useRef<TwistyPlayerHandle>(null);

  const [mirrored, setMirrored] = React.useState(false);
  const { state, setState } = useGlobalState();

  const currentSelection = useMemo(() => {
    return state.groups[groupId]?.cases[caseId]?.algorithmSelection;
  }, [caseId, groupId, state.groups]);

  const handleAlgorithmSelectionUpdate = React.useCallback(() => {
    setState((previousState) => {
      const groupState = previousState.groups[groupId];
      const caseState = groupState?.cases[caseId];

      if (!groupState || !caseState) {
        return previousState;
      }

      return {
        ...previousState,
        groups: {
          ...previousState.groups,
          [groupId]: {
            ...groupState,
            cases: {
              ...groupState.cases,
              [caseId]: {
                ...caseState,
                algorithmSelection: { left: 1, right: 1 },
              },
            },
          },
        },
      };
    });
  }, [caseId, groupId, setState]);

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
          // style={{ width: 250, height: 250 }}
        />
        <Card.Title>F2L Case</Card.Title>
        <Card.Header>{mirrored ? mirrorAlg(alg) : alg}</Card.Header>
        <Card.Body />
        <Card.Footer>
          <VStack>
            <Button>Edit</Button>
            <Button onClick={() => setMirrored(!mirrored)}>Mirror</Button>
            <Button onClick={handleAlgorithmSelectionUpdate}>
              Set Algorithm Selection to (1, 1)
            </Button>
            <Text fontSize="sm">
              Current selection: L {currentSelection?.left ?? "-"} / R {currentSelection?.right ?? "-"}
            </Text>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default CaseCard;
