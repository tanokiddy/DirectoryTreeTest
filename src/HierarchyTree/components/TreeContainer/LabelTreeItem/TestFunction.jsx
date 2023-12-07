import { useState } from "react";

// Hàm để tạo một node với các thuộc tính cần thiết
function createNode(value, label, children = []) {
  return { value, label, children };
}

// Mảng để lưu trữ các node của cây thư mục
const nodes = [
  createNode("parent1", "Parent 1", [
    createNode("child1", "Child 1", [
      createNode("grandchild1", "Grandchild 1"),
      createNode("grandchild2", "Grandchild 2"),
    ]),
    createNode("child2", "Child 2"),
  ]),
  createNode("parent2", "Parent 2"),
  createNode("parent3", "Parent 3", [
    createNode("child3", "Child 3"),
    createNode("child4", "Child 4"),
  ]),
];

// Hàm để kiểm tra một node có phải là node lá hay không
function isLeaf(node) {
  return node.children.length === 0;
}

// Hàm để kiểm tra một node có phải là node cha hay không
function isParent(node) {
  return node.children.length > 0;
}

// Hàm để kiểm tra một node có được chọn hay không
function isChecked(node, checked) {
  return checked.includes(node.value);
}

// Hàm để kiểm tra một node có được mở rộng hay không
function isExpanded(node, expanded) {
  return expanded.includes(node.value);
}

// Hàm để kiểm tra một node có được bán chọn hay không
function isIndeterminate(node, checked) {
  if (isLeaf(node)) return false;
  const childValues = node.children.map((child) => child.value);
  return (
    childValues.some((value) => checked.includes(value)) &&
    !childValues.every((value) => checked.includes(value))
  );
}

// Hàm để xử lý sự kiện khi chọn một node
function handleCheck(node, checked, setChecked) {
  const newChecked = [...checked];
  if (isChecked(node, checked)) {
    // Nếu node đã được chọn, bỏ chọn node và tất cả node con
    newChecked.splice(newChecked.indexOf(node.value), 1);
    node.children.forEach((child) => {
      if (isChecked(child, newChecked)) {
        newChecked.splice(newChecked.indexOf(child.value), 1);
      }
    });
  } else {
    // Nếu node chưa được chọn, chọn node và tất cả node con
    newChecked.push(node.value);
    node.children.forEach((child) => {
      if (!isChecked(child, newChecked)) {
        newChecked.push(child.value);
      }
    });
  }
  setChecked(newChecked);
}

// Hàm để xử lý sự kiện khi mở rộng một node
function handleExpand(node, expanded, setExpanded) {
  const newExpanded = [...expanded];
  if (isExpanded(node, expanded)) {
    // Nếu node đã được mở rộng, thu gọn node
    newExpanded.splice(newExpanded.indexOf(node.value), 1);
  } else {
    // Nếu node chưa được mở rộng, mở rộng node
    newExpanded.push(node.value);
  }
  setExpanded(newExpanded);
}

// Hàm để hiển thị một node và các node con của nó
function renderNode(node, checked, expanded, setChecked, setExpanded) {
  return (
    <div key={node.value}>
      <input
        type="checkbox"
        checked={isChecked(node, checked)}
        onChange={() => handleCheck(node, checked, setChecked)}
        ref={(input) => {
          if (input) {
            input.indeterminate = isIndeterminate(node, checked);
          }
        }}
      />
      {isParent(node) && (
        <button onClick={() => handleExpand(node, expanded, setExpanded)}>
          {isExpanded(node, expanded) ? "-" : "+"}
        </button>
      )}
      <label>{node.label}</label>
      {isParent(node) && isExpanded(node, expanded) && (
        <div style={{ marginLeft: 20 }}>
          {node.children.map((child) =>
            renderNode(child, checked, expanded, setChecked, setExpanded)
          )}
        </div>
      )}
    </div>
  );
}

// Hàm để hiển thị một cây thư mục với checkbox
function TreeView() {
  // Mảng để lưu trữ các node được chọn
  const [checked, setChecked] = useState([]);
  // Mảng để lưu trữ các node được mở rộng
  const [expanded, setExpanded] = useState([]);

  return (
    <div>
      {nodes.map((node) =>
        renderNode(node, checked, expanded, setChecked, setExpanded)
      )}
    </div>
  );
}

export default TreeView;
