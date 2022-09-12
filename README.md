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

please watch the demo to learn how you can take full advantage from this package
it is very powerful but light package that includes both tree and checkbox functionality
[video](https://stackblitz.com/edit/react-judiep)
Note:(video is not ready yet)
you can test my package from this link
[testing](https://stackblitz.com/edit/react-judiep)

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
  return (
    <TreeView
      filternodes={Nodes}
      expanded={expanded}
      handleExpand={handleExpand}
      changeState={handleCheck}
    />
  );
}
```

## Properties

| Property          | type     | Default                                        | options                             | Description                                                                                                                                           |
| ----------------- | -------- | ---------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| filternodes       | array    | []                                             |                                     | in this prop you will pass array of object                                                                                                            |
| expanded          | array    | []                                             |                                     | in this prop you will pass array of strings which you want to expand initialiy eg :["animals","cat"]                                                  |
| handleExpand      | function |                                                |                                     | in this prop you will pass a call back function which return the array of string which are expanded                                                   |
| column            | number   | 6                                              | 1 to 12                             | how many columns you want ro divide your tree. this is based on bootstrap grid                                                                        |
| expandIcon        | element  | "<img src={folderOpen} alt="expandicon" />"    | element or tag                      | change the expand icon.you can use react-icons and also html tags                                                                                     |
| compressIcon      | element  | "<img src={folderClose} alt="compressicon" />" | element or tag                      | change the compress icon.you can use react-icons and also html tags                                                                                   |
| deleteIcon        | element  | "<img src={deleteicon} alt="deleteicon" />"    | element or tag                      | change the delete icon.you can use react-icons and also html tags                                                                                     |
| addIcon           | element  | "<img src={addicon} alt="addicon" />"          | element or tag                      | change the add icon.you can use react-icons and also html tags                                                                                        |
| horizontalSpacing | string   | "14px"                                         | any value in px                     | add margin-left to the each column of tree                                                                                                            |
| verticalSpacing   | string   | "5px"                                          | any value in px                     | add margin-bottom to the each column of tree                                                                                                          |
| borderLeft        | string   | "none"                                         | "1px solid red"                     | add border-left(just for styling)                                                                                                                     |
| saveTree          | function |                                                |                                     | if you want to save changes pass callback function                                                                                                    |
| savebtnClass      | string   | "rtc-save-button"                              | "btn btn-success" or any othe class | you can style the save btn by adding your own custom class                                                                                            |
| allowCheck        | boolean  | true                                           | true or false                       | if you dont want the checkbox functionality then pass false                                                                                           |
| allowDelete       | boolean  | false                                          | true or false                       | if you want to delete the node then pass true                                                                                                         |
| allowAdd          | boolean  | false                                          | true or false                       | if you want to add the new node then pass true                                                                                                        |
| changeState       | function |                                                |                                     | when the checkbox is checked or unchecked or node is deleted this props should be passed so pass a callback function and it wil give you latest nodes |
| customStyling     | object   | {}                                             | any style key value                 | you can pass object of style e.g {fontSize:"18px"}                                                                                                    |

# Hi, I'm Arslan Ahmed Shaad! 👋

## 🚀 About Me

I'm a full stack developer...

## Feedback

If you have any feedback, please reach out to us at ashi3610@gmail.com

## Authors

- [@Arslan Ahmed](https://github.com/arslanahmed777)
