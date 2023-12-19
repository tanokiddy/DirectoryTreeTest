import * as React from "react";
import { Story, Meta } from "@storybook/react";
import { mockData } from "../AWING/HierarchyTree/utils";
import TreeContainer, {
  NodeStatus,
  TreeNode,
} from "../AWING/HierarchyTree/component";

import CheckboxAction from '../AWING/HierarchyTree/components/TemplateAction/CheckboxAction'

export default {
  title: "Library/AWING/HierarchyTree",
  component: TreeContainer,
} as Meta<typeof TreeContainer>;

export type IRawData = {
  description: null | string;
  directoryPath: string;
  isFile: boolean;
  isSystem: boolean;
  level: number;
  objectTypeCode: string;
  directoryId: string;
  parentDirectoryId: string;
  name: string;
};

const handleConvertData = (
  input: IRawData[],
  parentId: string | null = input[0].parentDirectoryId
): TreeNode[] => {
  const result: TreeNode[] = [];
  for (let i = 0; i < input.length; i++) {
    const item = input[i];
    if (item.parentDirectoryId === parentId) {
      const newItem: TreeNode = {
        name: item.name,
        nodeId: item.directoryId,
        status: NodeStatus.Unchecked,
        children: [],
      };
      const children = handleConvertData(input, item.directoryId);
      if (children.length > 0) {
        newItem.children = children;
      }
      result.push(newItem);
    }
  }
  return result;
};

const replaceChildren = (object1: TreeNode, object2: TreeNode) => {
  if (object1.nodeId === object2.nodeId) {
    const newObj1 = { ...object1 };
    newObj1.children = object2.children;
    return newObj1;
  }
  if (object1.children && object1.children.length > 0) {
    const newChildren = object1.children.map((child) =>
      replaceChildren(child, object2)
    );
    const newObj1 = { ...object1 };
    newObj1.children = newChildren;
    return newObj1;
  }
  return object1;
};

const HierarchyTree: Story<typeof TreeContainer> = () => {
  const [data, setData] = React.useState<TreeNode>();
  const [idCalled, setIdCalled] = React.useState<string[]>([]);
  const [treeNode, setTreeNode] = React.useState<TreeNode>();
  const [checklist, setChecklist] = React.useState<string[]>([])
  console.log('checklist: ', checklist);

  const onGetTreeNode = (treeNode: TreeNode) => {
    setTreeNode(treeNode);
  };

  const onGetMoreData = async (nodeId: string) => {
    if (!data) return;
    const newIdCalled = [...idCalled];
    if (newIdCalled.includes(nodeId)) return;
    const newNode = await onGetConvertedData(nodeId);
    const newTreeData = replaceChildren(data, newNode);
    newIdCalled.push(nodeId);
    setIdCalled(newIdCalled);
    setData(newTreeData);
  };

  const onGetConvertedData = async (id = "100") => {
    const res = await fetch(mockData[id]);
    const rawData = await res.json();
    const convertedData = handleConvertData(rawData.data);
    return convertedData[0];
  };

  const onCheckList = (value?: boolean, node?: TreeNode) => {
    if(!node) return
    const newChecklist = [...checklist]
    if(!value) {
      if(newChecklist?.includes(node.nodeId)) {
        const idx = newChecklist.findIndex(item => item === node.nodeId)
        if(idx > -1) {
          newChecklist.splice(idx, 1)
          setChecklist(newChecklist)
        }
      } 
      return
    }
    newChecklist.push(node.nodeId)
    setChecklist(newChecklist)
    
  }
  const ActionComponents = (node: TreeNode) => {
    return (
      <>
        <CheckboxAction node={node} onCheckbox={onCheckList}/>
      </>
    )

  } 

  React.useEffect(() => {
    const fetchAPI = async () => {
      const dataAPI = await onGetConvertedData();
      setData(dataAPI);
    };
    fetchAPI();
  }, []);

  if (!data) return <></>;

  return (
    <div>
      <TreeContainer
        data={data}
        onGetTreeNode={onGetTreeNode}
        onGetMoreData={onGetMoreData}
        actionComponents={ActionComponents}
      />
    </div>
  );
};

export const Demo = HierarchyTree.bind({});

Demo.args = {};
