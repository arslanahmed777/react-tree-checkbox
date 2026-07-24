import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import TreeView from "../src/components/TreeView.jsx";

afterEach(() => {
  cleanup();
});

const baseNodes = [
  {
    id: 1,
    text: "Animals",
    value: "animals",
    status: false,
    nodes: [
      {
        id: 2,
        text: "Cat",
        value: "cat",
        status: false,
        nodes: [],
      },
      {
        id: 3,
        text: "Dog",
        value: "dog",
        status: false,
        disabled: true,
        nodes: [],
      },
    ],
  },
];

function ControlledTree({
  initialNodes = baseNodes,
  initialExpanded = [1],
  ...rest
}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [expanded, setExpanded] = useState(initialExpanded);
  return (
    <TreeView
      nodes={nodes}
      onNodesChange={setNodes}
      expanded={expanded}
      onExpandedChange={setExpanded}
      {...rest}
    />
  );
}

describe("TreeView", () => {
  it("renders labels preferring text", () => {
    render(<ControlledTree />);
    expect(screen.getByText("Animals")).toBeInTheDocument();
    expect(screen.getByText("Cat")).toBeInTheDocument();
  });

  it("supports legacy filternodes / changeState / handleExpand aliases", async () => {
    const user = userEvent.setup();
    function Legacy() {
      const [nodes, setNodes] = useState(baseNodes);
      const [expanded, setExpanded] = useState([1]);
      return (
        <TreeView
          filternodes={nodes}
          changeState={setNodes}
          expanded={expanded}
          handleExpand={setExpanded}
        />
      );
    }
    const { container } = render(<Legacy />);
    const view = within(container);
    const checkbox = view.getByRole("checkbox", { name: "Cat" });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("cascades checkbox selection to children", async () => {
    const user = userEvent.setup();
    const { container } = render(<ControlledTree />);
    const view = within(container);
    const animals = view.getByRole("checkbox", { name: "Animals" });
    await user.click(animals);
    expect(view.getByRole("checkbox", { name: "Cat" })).toBeChecked();
  });

  it("toggles expansion", async () => {
    const user = userEvent.setup();
    const { container } = render(<ControlledTree initialExpanded={[]} />);
    const view = within(container);
    expect(view.queryByText("Cat")).not.toBeInTheDocument();
    await user.click(view.getByRole("button", { name: "Expand" }));
    expect(view.getByText("Cat")).toBeInTheDocument();
  });

  it("ignores checks on disabled nodes", async () => {
    const user = userEvent.setup();
    const { container } = render(<ControlledTree />);
    const view = within(container);
    const dog = view.getByRole("checkbox", { name: "Dog" });
    expect(dog).toBeDisabled();
    await user.click(dog);
    expect(dog).not.toBeChecked();
  });

  it("adds a node via ref", async () => {
    const treeRef = createRef();
    function WithRef() {
      const [nodes, setNodes] = useState(baseNodes);
      const [expanded, setExpanded] = useState([1]);
      return (
        <TreeView
          ref={treeRef}
          nodes={nodes}
          onNodesChange={setNodes}
          expanded={expanded}
          onExpandedChange={setExpanded}
        />
      );
    }
    const { container } = render(<WithRef />);
    const result = treeRef.current.addNewNode(1, { text: "Bird" });
    expect(result.ok).toBe(true);
    expect(await within(container).findByText("Bird")).toBeInTheDocument();
  });

  it("expands with ArrowRight keyboard navigation", async () => {
    const user = userEvent.setup();
    const { container } = render(<ControlledTree initialExpanded={[]} />);
    const tree = within(container).getByRole("tree");
    const row = tree.querySelector(".rtc-tree__row");
    row.focus();
    await user.keyboard("{ArrowRight}");
    expect(within(container).getByText("Cat")).toBeInTheDocument();
  });

  it("works uncontrolled with defaultNodes", () => {
    const { container } = render(
      <TreeView defaultNodes={baseNodes} defaultExpanded={[1]} />
    );
    expect(within(container).getByText("Animals")).toBeInTheDocument();
    expect(within(container).getByText("Cat")).toBeInTheDocument();
  });

  it("exposes treeitem roles", () => {
    const { container } = render(<ControlledTree />);
    const items = within(container).getAllByRole("treeitem");
    expect(items.length).toBeGreaterThan(0);
    expect(within(items[0]).getByText("Animals")).toBeInTheDocument();
  });
});
