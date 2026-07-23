# react-tree-checkbox

A lighweight but complete react checkbox tree

## Installation

Install react-tree-checkbox with npm

```bash
  npm i react-tree-checkbox
```

## Features

This project have following features :

- no dependencies
- very minimal size
- Responsive (you can give columns to show how you should divide your tree)
- Toggle between tree and checkbox tree (if you dont want check box functionality then simply pass allowCheck={false} now you have only tree)
- You can also change the icons (you can use react-icons or anyother package)
- you can add spacing both horizontal and vertical
- you can do custom styling the size of your whole tree with only one prop (customStyling)
- you can delete the node by passing allowDelete to true
- you can add the new node by passing allowAdd to true
- you can edit the node by passing allowEdit to true
- you can get the path of the node e.g "/app/http/providers/index.js"
- you can click on single node aswell and get its information
- By default our tree uses 4 keys in object (value,text,id,status,nodes) but you can pass your own key and value aswell. your keys and value will not interfere our tree
- tree is capable of supporting a large number of nodes at once.

## Demo

Interactive examples are available on GitHub Pages:

[https://arslanahmed777.github.io/react-tree-checkbox/](https://arslanahmed777.github.io/react-tree-checkbox/)

Local demo commands:

```bash
npm run docs:dev
npm run docs:build
npm run docs:deploy
```

## Fake json data for testing

[Link](https://stackblitz.com/edit/react-judiep?file=src%2Fnodes.js)

You can also use the sample hierarchy in [`nodes.js`](./nodes.js).

## Usage/Examples

```javascript
import React, { useRef, useState } from "react";
import TreeView from "react-tree-checkbox";

const nodes = [
  {
    value: "animals",
    text: "Animals",
    id: 1,
    status: false,
    nodes: [
      {
        value: "mammals",
        text: "Mammals",
        status: false,
        id: 2,
        nodes: [
          {
            value: "cat",
            text: "Cat",
            status: false,
            nodes: [],
            id: 3,
          },
          {
            value: "dog",
            text: "Dog",
            status: false,
            nodes: [],
            id: 4,
          },
        ],
      },
    ],
  },
  {
    value: "plants",
    text: <h1>Plants</h1>,
    status: true,
    nodes: [],
    id: 5,
  },
];

export default function App() {
  const treeRef = useRef(null);
  const [Nodes, setNodes] = useState(nodes);
  const [expanded, setExpanded] = useState([]);

  const handleExpand = (newArray) => {
    console.log("handleExpand", newArray);
    setExpanded([...newArray]);
  };

  const handleCheck = (treeNodes) => {
    console.log("handleCheck", treeNodes);
    setNodes([...treeNodes]);
  };

  const handleAddNode = (nodeId) => {
    console.log("handleAddNode", nodeId);
    // open your add modal / form here, then call:
    // treeRef.current.addNewNode(nodeId, { text: "New Node", value: "new-node" })
  };

  const handleEditNode = (node) => {
    console.log("handleEditNode", node);
    // open your edit modal / form here, then call:
    // treeRef.current.editNode(node.id, { text: "Updated Node", value: "updated-node" })
  };

  const handleDeleteNode = (node) => {
    console.log("handleDeleteNode", node);
    // optional custom delete flow; if omitted, package deletes locally
  };

  return (
    <TreeView
      ref={treeRef}
      filternodes={Nodes}
      expanded={expanded}
      handleExpand={handleExpand}
      changeState={handleCheck}
      allowAdd={true}
      allowEdit={true}
      allowDelete={true}
      handleAddNode={handleAddNode}
      handleEditNode={handleEditNode}
      handleDeleteNode={handleDeleteNode}
    />
  );
}
```

## Interop

Default import (ESM / Vite / Webpack):

```javascript
import TreeView from "react-tree-checkbox";
```

Require import (CommonJS / Node):

```javascript
const TreeView = require("react-tree-checkbox");
```

## Properties

| Property           | type      | Default                                            | options       | Description                                                                                                                                                                                 |
| ------------------ | --------- | -------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filternodes        | array     | []                                                 |               | in this prop you will pass array of object                                                                                                                                                  |
| expanded           | array     | []                                                 |               | in this prop you will pass array of id's which you want to expand initialiy                                                                                                                 |
| handleExpand       | function  |                                                    |               | in this prop you will pass a call back function which return the array of id's which are expanded                                                                                           |
| changeState        | function  |                                                    |               | in this prop you will pass a call back function which return latest nodes                                                                                                                   |
| column             | number    | 12                                                 | 1 to 12       | divide your tree in columns. this prop will only apply on first level of nodes. this is just like bootstrap grid system                                                                     |
| onNodeClick        | function  |                                                    |               | if you want to click on single node and want to get data of single node then use this prop. it need callback function. it will give you an object which contains two keys "path" and "node" |
| onNodeClickOptions | object    | { allowExpand: false, key: "text", delimiter: "/"} |               | options to set on onNodeClick function                                                                                                                                                      |
| customStyling      | object    | {}                                                 |               | pass css styling to give style to your tree                                                                                                                                                 |
| horizontalSpacing  | string    | "23px"                                             |               | add spacing between each node horizontally                                                                                                                                                  |
| verticalSpacing    | string    | "0px"                                              |               | add spacing between each node vertically                                                                                                                                                    |
| borderLeft         | string    | "none"                                             |               | adds border to each node                                                                                                                                                                    |
| allowCheck         | boolean   | true                                               | true or false | if you dont want the checkbox functionality then pass false                                                                                                                                 |
| allowDelete        | boolean   | false                                              | true or false | show delete icon. if `handleDeleteNode` is provided it will be called with the node object; otherwise package deletes locally and returns latest nodes via `changeState`                     |
| allowAdd           | boolean   | false                                              | true or false | show add icon / top-level add action. use with `handleAddNode` and then call `ref.current.addNewNode(...)`                                                                                  |
| allowEdit          | boolean   | false                                              | true or false | show edit icon. use with `handleEditNode` and then call `ref.current.editNode(...)`                                                                                                         |
| handleAddNode      | function  |                                                    |               | callback when add is clicked. receives `nodeId` (`0` for root add)                                                                                                                          |
| handleEditNode     | function  |                                                    |               | callback when edit is clicked. receives the full node object                                                                                                                                |
| handleDeleteNode   | function  |                                                    |               | optional callback when delete is clicked. receives the full node object. if omitted, package deletes the node locally                                                                       |
| addText            | string    | "Add New Node"                                     |               | if you want to change the text.                                                                                                                                                             |
| ref                | reference |                                                    |               | pass reference. exposes `addNewNode(nodeId, obj)` and `editNode(nodeId, obj)`                                                                                                               |
| icons              | object    |                                                    |               | if you want to change the icons                                                                                                                                                             |

## icons Properties

| Property         |
| ---------------- |
| compressIcon     |
| expandIcon       |
| nodeCompressIcon |
| nodeExpandIcon   |
| nonNodeIcon      |
| deleteIcon       |
| addIcon          |
| editIcon         |

## nodes Properties

| Property | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| text     | any string / React node                                            |
| value    | any string (label shown prefers `value`, falls back to `text`)     |
| status   | boolean true or false                                              |
| id       | must b unique id                                                   |
| nodes    | pass empty array if you dont want children                         |

## Ref methods

| Method     | Signature       | Description                                                             |
| ---------- | --------------- | ----------------------------------------------------------------------- |
| addNewNode | `(nodeId, obj)` | add a new node under `nodeId` (`0` adds at root). `obj.text` is required |
| editNode   | `(nodeId, obj)` | update an existing node by id. `obj.text` is required; `value` is optional |

# Hi, I'm Arslan Ahmed Shaad! 👋

## 🚀 About Me

I'm a full stack developer...

## Feedback

If you have any feedback, please reach out to us at ashi3610@gmail.com

## Authors

- [@Arslan Ahmed Shaad](https://github.com/arslanahmed777)
- [@Danish](https://github.com/Rajadanish53)
