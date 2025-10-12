import { useMemo } from "react";

import CaseCard from "./components/CaseCard";
import type { Group } from "./types/group";
import { createInitialGlobalState } from "./types/group";

function App() {
  const globalState = useMemo(() => createInitialGlobalState(), []);
  const currentGroup = globalState.currentGroup;

  console.log("globalState", globalState);

  return (
    <>
      <div>
        <CaseCard rotation="z2 y'" setupAlgRight="R U R' U'" alg="U R U' R'" stickering={undefined} />
      </div>
    </>
  );
}

export default App;
