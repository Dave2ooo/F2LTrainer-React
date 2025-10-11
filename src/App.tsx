import { useRef, useState } from "react";

import TwistyPlayer, { type TwistyPlayerHandle } from "./components/TwistyPlayer";
import { Button, Card } from "@chakra-ui/react";
import CaseCard from "./components/CaseCard";

function App() {

  return (
    <>
      <div>
        <CaseCard rotation="z2 y'" setupAlgRight="R U R' U'" />
      </div>
    </>
  );
}

export default App;
