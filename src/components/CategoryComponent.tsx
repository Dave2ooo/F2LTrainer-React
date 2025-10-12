import CaseCard from "./CaseCard";
import type { AlgorithmCollection } from "@/data";
import { Collapsible, For, Heading } from "@chakra-ui/react";

interface Props {
  categoryName: string;
  caseIds: readonly number[];
  groupScrambles: AlgorithmCollection;
  groupAlgorithms: AlgorithmCollection;
}

const CategoryComponent = ({ categoryName, caseIds, groupScrambles, groupAlgorithms }: Props) => {
  //   console.log("categoryIndex", categoryIndex);
  //   console.log("categoryName", categoryName);
  //   console.log("caseIds", caseIds);
  //   console.log("groupScrambles", groupScrambles);
  //   console.log("groupAlgorithms", groupAlgorithms);

  return (
    <>
      <Collapsible.Root unmountOnExit defaultOpen>
        <Collapsible.Trigger>
          <Heading size="3xl">{categoryName}</Heading>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <For each={caseIds}>
            {(item) => (
              <CaseCard
                key={item}
                setupAlgRight={groupScrambles[item][0]}
                alg={groupAlgorithms[item][0]}
                stickering={undefined}
              />
            )}
          </For>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
};

export default CategoryComponent;
