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
[video](https://stackblitz.com/edit/react-4q7jmy)
you can test my package from this link
[testing](https://stackblitz.com/edit/react-4q7jmy)

## Fake json data for testing

[Link](https://stackblitz.com/edit/react-4q7jmy)

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

| Property   | type   | Default | options  | Description         |
| ---------- | ------ | ------- | -------- | ------------------- |
| timeFormat | number | 12      | 12 or 24 | 12 hours or 24hours |

# Hi, I'm Arslan Ahmed Shaad! 👋

## 🚀 About Me

I'm a full stack developer...

## Feedback

If you have any feedback, please reach out to us at ashi3610@gmail.com

## Authors

- [@Arslan Ahmed](https://github.com/arslanahmed777)
