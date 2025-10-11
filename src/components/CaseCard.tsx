import { Button, Card } from "@chakra-ui/react";
import React, { useRef } from "react";
import TwistyPlayer, { type TwistyPlayerHandle } from "./TwistyPlayer";
import { mirrorAlg } from "@/logic/mirrorAlg";
import type { StickerColor, StickerHidden } from "@/types/stickering";
import getStickeringString from "@/logic/stickering";

interface Props {
  rotation: string;
  setupAlgRight: string;
  stickering?: StickerHidden;
  crossColor?: StickerColor;
  frontColor?: StickerColor;
}

const CaseCard = ({ rotation, setupAlgRight, stickering, crossColor = "white", frontColor = "red" }: Props) => {
  const twistyRef = useRef<TwistyPlayerHandle>(null);

  const [mirrored, setMirrored] = React.useState(false);

  return (
    <>
      <Card.Root flexDirection={"row"} overflow={"hidden"}>
        <TwistyPlayer
          ref={twistyRef}
          //   experimentalSetupAlg={`${mirrored ? setupAlgRight : mirrorAlg(setupAlgRight)}`}
          experimentalSetupAlg={[rotation, mirrored ? setupAlgRight : mirrorAlg(setupAlgRight)].join(" ")}
          cameraLongitude={mirrored ? 25 : -25}
          controlPanel="none"
          experimentalDragInput="none"
          background="none"
          experimentalStickering={getStickeringString(crossColor, frontColor, stickering, mirrored)}
          // style={{ width: 250, height: 250 }}
        />
        <Card.Header></Card.Header>
        <Card.Body />
        <Card.Footer>
          <Button onClick={() => setMirrored(!mirrored)}>Toggle mirror</Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default CaseCard;
