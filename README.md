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
- you can increase the size of your whole tree with only one prop (fontSize)

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
import React, { useState } from 'react'
import TreeView from 'react-tree-checkbox'
const nodes = [
  {
    value: 'animals',
    text: 'Animals',
    status: false,
    nodes: [
      {
        value: 'mammals',
        text: 'Mammals',
        status: false,
        nodes: [
          {
            value: 'cat',
            text: 'Cat',
            status: false,
            nodes: null,
          },
          {
            value: 'dog',
            text: 'Dog',
            status: false,
            nodes: null,
          },
        ],
      },
    ],
  },
  {
    value: 'plants',
    text: <h1>Plants</h1>,
    status: true,
    nodes: null,
  },
]
export default function App() {
  const [Nodes, setNodes] = useState(nodes)
  const [expanded, setExpanded] = useState([])
  const handleExpand = (newArray) => {
    console.log('handleExpand', newArray)
    setExpanded([...newArray])
  }
  const handleCheck = (treeNodes) => {
    console.log('handleCheck', treeNodes)
    setNodes([...treeNodes])
  }
  const handeleSave = (chklist) => {
    console.log('handeleSave', chklist)
  }
  return (
    <TreeView
      filternodes={Nodes}
      expanded={expanded}
      handleExpand={handleExpand}
      changeState={handleCheck}
    />
  )
}
```

## Properties

| Property          | type     | Default                                        | options                             | Description                                                                                                                        |
| ----------------- | -------- | ---------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| filternodes       | array    | []                                             |                                     | in this prop you will pass array of object                                                                                         |
| expanded          | array    | []                                             |                                     | in this prop you will pass array of strings which you want to expand initialiy eg :["animals","cat"]                               |
| handleExpand      | function |                                                |                                     | in this prop you will pass a call back function which return the array of string which are expanded                                |
| column            | number   | 6                                              | 1 to 12                             | how many columns you want ro divide your tree. this is based on bootstrap grid                                                     |
| expandIcon        | element  | "<img src={folderOpen} alt="expandicon" />"    | element or tag                      | change the expand icon.you can use react-icons and also html tags                                                                  |
| compressIcon      | element  | "<img src={folderClose} alt="compressicon" />" | element or tag                      | change the compress icon.you can use react-icons and also html tags                                                                |
| fontSize          | string   | '18px'                                         | any value in px                     | to increase the size of your tree. this will also increase icon,checkbox and the string                                            |
| backgroundColor   | string   | 'white'                                        | #e6c300,red,yellow                  | change the backgroundcolor of tree                                                                                                 |
| color             | string   | 'black'                                        | #e6c300,red,yellow                  | in this prop you will pass array of object                                                                                         |
| horizontalSpacing | string   | "14px"                                         | any value in px                     | add margin-left to the each column of tree                                                                                         |
| verticalSpacing   | string   | "5px"                                          | any value in px                     | add margin-bottom to the each column of tree                                                                                       |
| borderLeft        | string   | "none"                                         | "1px solid red"                     | add border-left(just for styling)                                                                                                  |
| saveTree          | function |                                                |                                     | if you want to save changes pass callback function                                                                                 |
| savebtnClass      | string   | "rtc-save-button"                              | "btn btn-success" or any othe class | you can style the save btn by adding your own custom class                                                                         |
| allowCheck        | boolean  | true                                           | true or false                       | if you dont want the checkbox functionality then pass false                                                                        |
| changeState       | function |                                                |                                     | when the checkbox is checked or unchecked this props should be passed so pass a callback function and it wil give you latest nodes |

# Hi, I'm Arslan Ahmed Shaad! 👋

## 🚀 About Me

I'm a full stack developer...

## Feedback

If you have any feedback, please reach out to us at ashi3610@gmail.com

## Authors

- [@Arslan Ahmed](https://github.com/arslanahmed777)
