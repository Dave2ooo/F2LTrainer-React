import CategoryComponent from "./CategoryComponent";
import { GROUP_ALGORITHMS, GROUP_SCRAMBLES, type AlgorithmCollection } from "../data";
import { GROUP_DEFINITIONS, type Group, type GroupDefinition } from "@/types/group";
import { For } from "@chakra-ui/react";

interface Props {
  groupDefinition: GroupDefinition;
  groupScrambles: AlgorithmCollection;
  groupAlgorithms: AlgorithmCollection;
}

const GroupComponent = ({ groupDefinition, groupScrambles, groupAlgorithms }: Props) => {
  console.log("groupDefinition", groupDefinition);
  console.log("groupScrambles", groupScrambles);
  console.log("groupAlgorithms", groupAlgorithms);

  return (
    <>
      <For each={groupDefinition.categoryNames}>
        {(_, index) => (
          <CategoryComponent
            key={index}
            categoryName={groupDefinition.categoryNames[index]}
            caseIds={groupDefinition.categoryCases[index]}
            groupScrambles={groupScrambles}
            groupAlgorithms={groupAlgorithms}
          />
        )}
      </For>
    </>
  );
};

export default GroupComponent;
