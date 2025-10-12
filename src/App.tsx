import { GROUP_DEFINITIONS } from "./types/group";
import { GROUP_ALGORITHMS, GROUP_SCRAMBLES } from "./data";
import SelectViewComponent from "./components/SelectViewComponent";
function App() {
  return (
    <>
      <div>
        <SelectViewComponent
          groupDefinitions={GROUP_DEFINITIONS}
          groupScrambles={GROUP_SCRAMBLES}
          groupAlgorithms={GROUP_ALGORITHMS}
        />
        {/* <Float offset="20">
          <Circle size="20" bg="red" color="white">
            3
          </Circle>
        </Float> */}
      </div>
    </>
  );
}

export default App;
