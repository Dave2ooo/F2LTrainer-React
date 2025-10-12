import { useMemo } from "react";

import CaseCard from "./components/CaseCard";
import type { Group } from "./types/group";
import { createInitialGlobalState, GROUP_DEFINITIONS } from "./types/group";
import CategoryComponent from "./components/CategoryComponent";
import { GROUP_ALGORITHMS, GROUP_SCRAMBLES } from "./data";
import GroupComponent from "./components/GroupComponent";
import SelectViewComponent from "./components/SelectViewComponent";

function App() {
  const globalState = useMemo(() => createInitialGlobalState(), []);
  const currentGroup = globalState.currentGroup;

  // console.log("globalState", globalState);

  return (
    <>
      <div>
        <SelectViewComponent groupDefinitions={GROUP_DEFINITIONS} groupScrambles={GROUP_SCRAMBLES} groupAlgorithms={GROUP_ALGORITHMS} />
      </div>
    </>
  );
}

export default App;
