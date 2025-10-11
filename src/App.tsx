import CaseCard from "./components/CaseCard";
import type { Group } from "./types/group";

function App() {
  const editAlg = (group: Group, indexCase: number) => {
    console.log("Edit Alg: group", group, "indexCase", indexCase);
  };

  return (
    <>
      <div>
        <CaseCard
          rotation="z2 y'"
          setupAlgRight="R U R' U'"
          alg="U R U' R'"
          stickering={undefined}
          onEditAlg={() => editAlg("basic", 0)}
        />
      </div>
    </>
  );
}

export default App;
