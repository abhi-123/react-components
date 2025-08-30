import { useState } from "react";

export default function FileExplorer() {
  const fileData = [
    { id: 1, name: "README.md" },
    {
      id: 2,
      name: "Documents",
      children: [
        { id: 3, name: "Word.doc" },
        { id: 4, name: "Powerpoint.ppt" }
      ]
    },
    {
      id: 5,
      name: "Downloads",
      children: [
        { id: 6, name: "unnamed.txt" },
        {
          id: 7,
          name: "Misc",
          children: [
            { id: 8, name: "foo.txt" },
            { id: 9, name: "bar.txt" }
          ]
        }
      ]
    }
  ];
  

  return (
    <div>
      {fileData.map((item) => (
        <RenderNode key={item.id} node={item} level={0} />
      ))}
    </div>
  );
}

function RenderNode({ node, level }) {
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
    // Icons
  const icon = hasChildren
    ? showChildren
      ? "📂" // open folder
      : "📁" // closed folder
    : "📄";   // file

  // Rule:
  // - Level 0 => h3
  // - Has children => h3
  // - Otherwise => h5
  const Tag = (level === 0 || hasChildren) ? "h3" : "h5";

  return (
    <div style={{ marginLeft: "20px" }}>
      {hasChildren ? (
        <Tag onClick={() => setShowChildren((prev) => !prev)}>
          {icon} {node.name} {showChildren ? "[-]" : "[+]"}
        </Tag>
      ) : (
        <Tag>{icon} {node.name}</Tag>
      )}

      {showChildren &&
        hasChildren &&
        <div style={{ borderLeft: "1px solid #ccc", marginLeft: "15px", paddingLeft: "10px" }}>
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
}
    </div>
  );
}
