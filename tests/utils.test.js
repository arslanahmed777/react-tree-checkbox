import { describe, expect, it } from "vitest";
import {
  updateNodeStatus,
  getCheckState,
} from "../src/utils/updateNodeStatus.js";
import { getNodePath } from "../src/utils/getNodePath.js";
import {
  addNode,
  removeNode,
  updateNode,
  buildNewNode,
  flattenVisibleNodes,
} from "../src/utils/mutateTree.js";
import { isUniqueId } from "../src/utils/isUniqueId.js";

const sampleTree = () => [
  {
    id: 1,
    text: "Animals",
    value: "animals",
    status: false,
    nodes: [
      {
        id: 2,
        text: "Mammals",
        value: "mammals",
        status: false,
        nodes: [
          { id: 3, text: "Cat", value: "cat", status: false, nodes: [] },
          { id: 4, text: "Dog", value: "dog", status: false, nodes: [] },
        ],
      },
    ],
  },
  {
    id: 5,
    text: "Plants",
    value: "plants",
    status: true,
    nodes: [],
  },
];

describe("updateNodeStatus", () => {
  it("checks a leaf and cascades up to parents", () => {
    const next = updateNodeStatus(sampleTree(), 3, true);
    const mammals = next[0].nodes[0];
    expect(mammals.nodes[0].status).toBe(true);
    expect(mammals.nodes[1].status).toBe(false);
    expect(getCheckState(mammals)).toBe("indeterminate");
    expect(getCheckState(next[0])).toBe("indeterminate");
  });

  it("checks a parent and all descendants", () => {
    const next = updateNodeStatus(sampleTree(), 2, true);
    const mammals = next[0].nodes[0];
    expect(mammals.status).toBe(true);
    expect(mammals.nodes.every((n) => n.status)).toBe(true);
    expect(getCheckState(next[0])).toBe("checked");
  });

  it("unchecks descendants when parent unchecked", () => {
    const checked = updateNodeStatus(sampleTree(), 1, true);
    const next = updateNodeStatus(checked, 1, false);
    expect(getCheckState(next[0])).toBe("unchecked");
    expect(next[0].nodes[0].nodes.every((n) => !n.status)).toBe(true);
  });

  it("does not mutate the original tree", () => {
    const original = sampleTree();
    const snapshot = JSON.stringify(original);
    updateNodeStatus(original, 3, true);
    expect(JSON.stringify(original)).toBe(snapshot);
  });
});

describe("getNodePath", () => {
  it("builds a path with custom key and delimiter", () => {
    const result = getNodePath(sampleTree(), 3, "value", ".");
    expect(result.path).toBe(".animals.mammals.cat");
    expect(result.node.text).toBe("Cat");
  });

  it("returns null for missing id", () => {
    expect(getNodePath(sampleTree(), 999)).toBeNull();
  });
});

describe("mutateTree", () => {
  it("adds a root node when parentId is 0", () => {
    const built = buildNewNode({ text: "Fungi" }, sampleTree());
    expect(built.ok).toBe(true);
    const next = addNode(sampleTree(), 0, built.node);
    expect(next).toHaveLength(3);
    expect(next[2].text).toBe("Fungi");
  });

  it("adds a child under a parent", () => {
    const built = buildNewNode({ text: "Bird" }, sampleTree());
    const next = addNode(sampleTree(), 2, built.node);
    expect(next[0].nodes[0].nodes).toHaveLength(3);
  });

  it("rejects duplicate ids", () => {
    const result = buildNewNode({ text: "X", id: 1 }, sampleTree());
    expect(result.ok).toBe(false);
  });

  it("removes a node by id", () => {
    const next = removeNode(sampleTree(), 2);
    expect(next[0].nodes).toHaveLength(0);
  });

  it("updates text and value", () => {
    const next = updateNode(sampleTree(), 5, { text: "Flora" });
    expect(next[1].text).toBe("Flora");
    expect(next[1].value).toBe("flora");
  });

  it("flattens visible nodes based on expansion", () => {
    const visible = flattenVisibleNodes(sampleTree(), [1, 2]);
    expect(visible.map((n) => n.id)).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("isUniqueId", () => {
  it("detects existing ids", () => {
    expect(isUniqueId(3, sampleTree())).toBe(false);
    expect(isUniqueId(99, sampleTree())).toBe(true);
  });
});
