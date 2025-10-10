import { useRef } from "react";

import TwistyPlayer, { type TwistyPlayerHandle } from "./components/TwistyPlayer";

function App() {
  const twistyRef = useRef<TwistyPlayerHandle>(null);

  return (
    <>
      <div>
        <TwistyPlayer
          ref={twistyRef}
          alg={"R U R' U'"}
          puzzle="3x3x3"
          controlPanel="bottom-row"
          visualization="3D"
          background="none"
          style={{ width: 360, height: 360 }}
        />
      </div>
    </>
  );
}

export default App;
