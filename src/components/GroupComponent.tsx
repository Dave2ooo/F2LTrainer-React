import CategoryComponent from "./CategoryComponent";
import type { AlgorithmCollection } from "../data";
import type { GroupDefinition } from "@/types/group";
import { For, Heading } from "@chakra-ui/react";

interface Props {
  groupDefinition: GroupDefinition;
  groupScrambles: AlgorithmCollection;
  groupAlgorithms: AlgorithmCollection;
}

const GroupComponent = ({ groupDefinition, groupScrambles, groupAlgorithms }: Props) => {
  return (
    <>
      <Heading size="4xl">{groupDefinition.name}</Heading>
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
