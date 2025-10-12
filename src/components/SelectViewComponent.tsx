import GroupComponent from "./GroupComponent";
import { type Group, type GroupDefinition } from "@/types/group";
import { For } from "@chakra-ui/react";
import { type AlgorithmCollection } from "@/data";

interface Props {
  groupDefinitions: Record<Group, GroupDefinition>;
  groupScrambles: Record<Group, AlgorithmCollection>;
  groupAlgorithms: Record<Group, AlgorithmCollection>;
}

const SelectViewComponent = ({ groupDefinitions, groupScrambles, groupAlgorithms }: Props) => {
//   console.log("groupDefinitions", groupDefinitions);
//   console.log("groupScrambles", groupScrambles);
//   console.log("groupAlgorithms", groupAlgorithms);

  return (
    <>
      <For each={Object.values(groupDefinitions)}>
        {(item) => (
          <GroupComponent
            key={item.id}
            groupDefinition={item}
            groupScrambles={groupScrambles[item.id]}
            groupAlgorithms={groupAlgorithms[item.id]}
          />
        )}
      </For>
    </>
  );
};

export default SelectViewComponent;
