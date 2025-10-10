import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button, HStack } from "@chakra-ui/react";

import TwistyPlayer, { type TwistyPlayerHandle } from "./components/TwistyPlayer";

function App() {
  const [count, setCount] = useState(0);

  const twistyRef = useRef<TwistyPlayerHandle>(null);

  return (
    <>
      <div>
        <TwistyPlayer
          ref={twistyRef}
          alg={"R U R' U'"}
          puzzle="3x3x3"
          controlPanel="full"
          visualization="3D"
          background="none"
          style={{ width: 360, height: 360 }}
        />
      </div>
    </>
  );
}

export default App;
