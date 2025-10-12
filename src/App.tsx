import { GROUP_DEFINITIONS } from "./types/group";
import { GROUP_ALGORITHMS, GROUP_SCRAMBLES } from "./data";
import SelectViewComponent from "./components/SelectViewComponent";

function App() {
  return (
    <>
      <div>
        <SelectViewComponent groupDefinitions={GROUP_DEFINITIONS} groupScrambles={GROUP_SCRAMBLES} groupAlgorithms={GROUP_ALGORITHMS} />
      </div>
    </>
  );
}

export default App;
