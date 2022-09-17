# react-tree-checkbox

A lighweight but complete react checkbox tree

## Installation

Install react-tree-checkbox with npm

```bash
  npm i react-tree-checkbox
```

## Features

This project have following features :

- Responsive (you can give columns to show how you should divide your tree)
- Toggle between tree and checkbox tree (if you dont want check box functionality then simply pass allowCheck={false} now you have only tree)
- You can also change the icons (you can use react-icons or if you are using cdn then you can simply pass expanIcon={<i className="fa fa-eye"></i>})
- In tree you can also link (you can pass any html tag in nodes)
- You can save the nodes by applying function
- you can add spacing both horizontal and vertical
- you can do custom styling the size of your whole tree with only one prop (customStyling)
- you can delete the node by passing allowDelete to true
- you can add the new node by passing allowAdd to true

## Demo

please watch the demo to learn how you can take full advantage from this package it is very powerful but light package that includes both tree and checkbox functionality [video](https://stackblitz.com/edit/react-judiep) Note:(video is not ready yet) you can test my package from this link [testing](https://stackblitz.com/edit/react-judiep)

## Fake json data for testing

[Link](https://stackblitz.com/edit/react-judiep?file=src%2Fnodes.js)

## Usage/Examples

```javascript
import React, { useState } from "react";
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
  const handeleSave = (chklist) => {
    console.log("handeleSave", chklist);
  };
  return <TreeView filternodes={Nodes} expanded={expanded} handleExpand={handleExpand} changeState={handleCheck} />;
}
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
| allowDelete        | boolean   | true                                               | true or false | if you want to delete node. after deleteing the node you will get the latest noded in changeState function                                                                                  |
| allowAdd           | boolean   | true                                               | true or false | if you want to add new node.                                                                                                                                                                |
| addText            | string    | "Add New Node"                                     |               | if you want to change the text.                                                                                                                                                             |
| ref                | reference |                                                    |               | pass reference                                                                                                                                                                              |
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

## nodes Properties

| Property | Description                                |
| -------- | ------------------------------------------ |
| text     | any string                                 |
| value    | any string                                 |
| status   | boolean true or false                      |
| id       | must b unique id                           |
| nodes    | pass empty array if you dont want children |

# Hi, I'm Arslan Ahmed Shaad! 👋

## 🚀 About Me

I'm a full stack developer...

## Feedback

If you have any feedback, please reach out to us at ashi3610@gmail.com

## Authors

- [@Arslan Ahmed](https://github.com/arslanahmed777)
