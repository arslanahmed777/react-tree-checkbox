import React, { useRef, useState } from 'react'
import TreeView from "react-tree-checkbox";
import nodesData from "../../../nodes";
import ExampleSection from "./ExampleSection";

const AllFeaturesExample = () => {
  const [nodes, setNodes] = useState(nodesData);
  const [expanded, setExpanded] = useState([]);
  const [selectedNode, setselectedNode] = useState(null);
  const [showBox, setshowBox] = useState(false);
  const [mode, setmode] = useState("add");//add, edit, parent
  const [formobj, setformobj] = useState({
    text: "",
    value: "",
  });
  const [path, setpath] = useState("");

  const treeRef = useRef(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setformobj((prevobj) => ({
      ...prevobj,
      [name]: value,
      value: value.replace(/\s/g, "").toLowerCase(),
    }));
  };

  const handleExpand = (newArray) => {
    setExpanded([...newArray]);
  };
  const handleCheck = (treeNodes) => {
    setNodes([...treeNodes]);
  };

  const handleAddNode = (node) => {
    setmode("add");
    setselectedNode(node);
    setshowBox(true);
  };

  const handleAddNewNode = () => {
    setmode("parent");
    setselectedNode(0)
    setshowBox(true);
  }
  const handleEditNode = (node) => {
    setmode("edit");
    setselectedNode(node);
    setshowBox(true);
    setformobj({
      text: node.text || "",
      value: node.value || "",
    });
  };
  const handleNodeClick = (nodeobj) => {
    setpath(nodeobj.path);
  }
  const handleSaveNode = () => {
    if (mode === "parent") {
      treeRef.current.addNewNode(0, formobj)
    } else if (mode === "add") {
      treeRef.current.addNewNode(selectedNode.id, formobj)
    } else if (mode === "edit") {
      treeRef.current.editNode(selectedNode.id, formobj)
    }
    setshowBox(false);
    setformobj({ text: "", value: "" });
  };




  const handleDeleteNode = (node) => {
    setselectedNode(node);
  }
  return (
    <ExampleSection
      id="all-features"
      title="All Features Example"
      description="All features example"

    >
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8'>
          <TreeView
            ref={treeRef}
            filternodes={nodes}
            expanded={expanded}
            allowCheck={true}
            handleExpand={handleExpand}
            changeState={handleCheck}
            allowAdd={true}
            handleAddNode={handleAddNode}
            allowEdit={true}
            handleEditNode={handleEditNode}
            allowDelete={true}
            handleDeleteNode={handleDeleteNode}
            horizontalSpacing={20}
            verticalSpacing={10}
            customStyling={{
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "1.6",
              color: "#151A20",
              letterSpacing: "0.2px",
            }}
            column={6}
            onNodeClickOptions={{
              allowExpand: true,
              key: "text",
              delimiter: "/",
            }}
            onNodeClick={handleNodeClick}
          />
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white outline-none transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAddNewNode}
          >
            Add New Node
          </button>
          {path}
        </div>
        <div className='col-span-4'>
          {
            showBox ? (
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                {selectedNode.text}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="text" className="text-sm font-semibold tracking-wide text-slate-700">  Text  </label>
                  <input type="text" id="text" placeholder="Node label" name="text" value={formobj.text} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="value" className="text-sm font-semibold tracking-wide text-slate-700">
                    Value
                  </label>
                  <input type="text" id="value" disabled placeholder="Node value" value={formobj.value} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white outline-none transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleSaveNode}
                  >
                    Add Node
                  </button>
                </div>
              </div>
            ) : null
          }

        </div>
      </div>

    </ExampleSection>
  )
}

export default AllFeaturesExample