import { useRef } from "react";

import TwistyPlayer, { type TwistyPlayerHandle } from "./components/TwistyPlayer";
import { Card } from "@chakra-ui/react";

function App() {
  const twistyRef = useRef<TwistyPlayerHandle>(null);

  return (
    <>
      <div>
        <Card.Root>
          <Card.Header>
            <TwistyPlayer
              ref={twistyRef}
              alg={"R U R' U'"}
              controlPanel="auto"
              experimentalDragInput="auto"
              background="none"
              experimentalStickering="EDGES:------------,CORNERS:--------,CENTERS:-----`;"
              style={{ width: 250, height: 250 }}
            />
          </Card.Header>
          <Card.Body />
          <Card.Footer />
        </Card.Root>
      </div>
    </>
  );
}

export default App;
