import { Button, Card, VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import TwistyPlayer, { type TwistyPlayerHandle } from "./TwistyPlayer";
import { mirrorAlg } from "@/logic/mirrorAlg";
import type { StickerColor, StickerHidden } from "@/types/stickering";
import getStickeringString from "@/logic/stickering";

interface Props {
  rotation?: string;
  setupAlgRight: string;
  alg: string;
  stickering?: StickerHidden;
  crossColor?: StickerColor;
  frontColor?: StickerColor;
}

const CaseCard = ({
  rotation = "z2 y'",
  setupAlgRight,
  alg,
  stickering,
  crossColor = "white",
  frontColor = "red",
}: Props) => {
  const twistyRef = useRef<TwistyPlayerHandle>(null);

  const [mirrored, setMirrored] = React.useState(false);

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
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default CaseCard;
