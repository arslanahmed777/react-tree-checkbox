
import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';
import deleteicon from "./deleteIcon.svg"
import chevronRight from "./chevronRight.svg"
import chevronDown from "./chevronDown.svg"
import addicon from "./addicon.svg"
import "./Tree.css";

// ******************************** CUSTOM HELPER FUNCTIONS *********************
let findNode = (nodes, value, status) => {
    let foundObj = null;
    nodes.forEach((__) => {
        if (__.id === value) {
            foundObj = __;
        } else {
            let searchRecursive = (node) => {
                if (node.nodes) {
                    node.nodes.forEach((_) => {
                        if (_.id === value) {
                            foundObj = __;
                        } else {
                            searchRecursive(_);
                        }
                    });
                }
            };
            searchRecursive(__);
        }
    });
    let findValue = (nextNodes, value, status) => {
        let foundNodes = [];

        let recursiveFind = (nextNodes, value) => {
            if (nextNodes.id === value) {
                foundNodes.push(nextNodes);
            } else {
                if (nextNodes.nodes) {
                    nextNodes.nodes.forEach((_) => {
                        if (_.id === value) {
                            foundNodes.push(_);
                        } else {
                            if (_.nodes) {
                                recursiveFind(_, value);
                            }
                        }
                    });
                }
            }
        };
        let setStatus = (nextNodes, { id }, status) => {
            let recursiveTrue = (nextNodes, id) => {
                let parentNode = nextNodes;
                let setRecursiveChild = (node, b) => {
                    node.status = b;
                    if (node.nodes) {
                        node.nodes.forEach((_) => {
                            setRecursiveChild(_, b);
                        });
                    }
                };
                let setRecursiveTrue = (node) => {
                    if (node.id === id) {
                        let setRecursiveParent = (node, id) => {
                            if (node.nodes) {
                                if (node.nodes.some((v) => v.id === id)) {
                                    node.status = true;
                                    setRecursiveParent(parentNode, node.id);
                                } else {
                                    if (node.nodes) {
                                        node.nodes.forEach((_) => {
                                            setRecursiveParent(_, id);
                                        });
                                    }
                                }
                            }
                        };
                        setRecursiveChild(node, true);
                        setRecursiveParent(parentNode, id);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveTrue(_);
                            });
                        }
                    }
                };
                let setRecursiveFalse = (node) => {
                    if (node.id === id) {
                        node.status = false;
                        setRecursiveChild(node, false);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveFalse(_);
                            });
                        }
                    }
                };

                if (parentNode.id === id) {
                    parentNode.status = status;
                    setRecursiveTrue(parentNode);
                }
                if (status === true) {
                    setRecursiveTrue(parentNode);
                } else {
                    setRecursiveFalse(parentNode);
                }
                return parentNode;
            };

            recursiveTrue(nextNodes, id, status);
        };

        recursiveFind(nextNodes, value);
        setStatus(nextNodes, foundNodes[0], status);
        if (status && nextNodes.id === value) {
            nextNodes.status = status;
        } else if (nextNodes.id === value && !status) {
            nextNodes.status = status;
        } else {
            nextNodes.status = true;
        }
        return nextNodes;
    };
    if (foundObj) {
        findValue(foundObj, value, status);
        return nodes;
    }
};

const getupdatednodes = (nodeid, allnodes) => {
    allnodes.forEach((node, index) =>
        node.id === nodeid
            ? allnodes.splice(index, 1)
            : node.nodes
                ? getupdatednodes(nodeid, node.nodes)
                : ''
    );
    return allnodes
}

const add_New_Node = (nodeid, nodeobj, allnodes) => {
    allnodes.forEach((node, index) =>
        node.id === nodeid
            ? allnodes[index].nodes.push(nodeobj)
            : node.nodes
                ? add_New_Node(nodeid, nodeobj, node.nodes)
                : ''
    );
    return allnodes
}

const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

const isUniqueId = (id, allnodes) => {

    let found = true;
    let foundCheck = (id, allNodes) => {
        for (let i = 0; i < allNodes.length; i++) {
            if (allNodes[i].id === id) {
                found = false;
            } else {
                console.log(allNodes[i]);
                if (allNodes[i].nodes.length > 0) {
                    foundCheck(id, allNodes[i].nodes);
                }
            }
        }
    };
    foundCheck(id, allnodes);
    return found;
};

const getPath = (obj, id, key, delimiter) => {
    let stack = obj.map((item) => ({ path: `${delimiter}${item[key]}`, currObj: item }));
    while (stack.length) {
        const { path, currObj } = stack.pop();
        if (currObj.id === id) {
            return { path: path, node: currObj };
        } else if (currObj.nodes?.length) {
            stack = stack.concat(
                currObj.nodes.map((item) => ({
                    path: path.concat(`${delimiter}${item[key]}`),
                    currObj: item,
                }))
            );
        }
    }
    return null; // if id does not exists
}

// ******************************** CUSTOM HELPER FUNCTIONS END *********************







const TreeView = forwardRef(({ icons, handleAddNode, onNodeClickOptions, onNodeClick, filternodes = [], column, expanded, handleExpand, changeState, customStyling, horizontalSpacing, verticalSpacing, borderLeft, allowCheck, allowDelete, allowAdd, addText }, ref) => {
    useImperativeHandle(ref, () => {
        return {
            addNewNode,
        };
    });


    const addNewNode = (nodeid, obj) => {
        const allnodes = filternodes
        let id = uniqueId(8)
        let status = false
        let nodes = []
        let value = ""
        if (!obj.hasOwnProperty('text') || obj.text === "") {
            return alert('key "text" is missing in the object or passed empty string')
        }
        if (!obj.hasOwnProperty('value') || obj.value === "") {
            value = obj.text.replace(/\s/g, '').toLowerCase()
        } else {
            value = obj.value
        }
        if (obj.hasOwnProperty('id') && obj.id !== "") {
            id = obj.id
        }
        if (obj.hasOwnProperty('nodes')) {
            nodes = obj.nodes
        }

        const newObj = {
            ...obj,
            text: obj.text,
            value: value,
            status: status,
            nodes: nodes,
            id: id,
        }
        console.log(newObj);
        const isIdUnique = isUniqueId(id, allnodes)
        if (isIdUnique) {
            if (nodeid === 0) {
                allnodes.push(newObj)
                changeState(allnodes)
            } else {
                changeState(add_New_Node(nodeid, newObj, allnodes))
            }
        }
        else {
            alert("Every node id must be uniqe.This id already exist in the tree")
        }

    }

    return (

        <div className="rtc-row" style={customStyling}>
            {allowAdd ? (
                <div className={`rtc-scroll rtc-col-${column}`}>
                    <span title={addText} style={{ cursor: "pointer" }} onClick={() => handleAddNode(0)} >
                        {icons.addIcon}<span style={{ marginLeft: 7 }}>{addText}</span>
                    </span>
                </div>
            ) : null}

            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={`rtc-scroll rtc-col-${column}`} style={{ overflowX: "auto" }}>
                        <TreeNode icons={icons} handleAddNode={handleAddNode} onNodeClickOptions={onNodeClickOptions} onNodeClick={onNodeClick} filternodes={filternodes} nodes={items} expanded={expanded} handleExpand={handleExpand} changeState={changeState} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} allowDelete={allowDelete} allowAdd={allowAdd} />
                    </div>
                )
            })}
        </div>
    );
})


const Tree = (props) => {
    return (
        <>
            {props.data.map((items, i) => (
                <TreeNode icons={props.icons} handleAddNode={props.handleAddNode} onNodeClickOptions={props.onNodeClickOptions} onNodeClick={props.onNodeClick} filternodes={props.filternodes} key={i} nodes={items} expanded={props.expanded} handleExpand={props.handleExpand} changeState={props.changeState} horizontalSpacing={props.horizontalSpacing} verticalSpacing={props.verticalSpacing} borderLeft={props.borderLeft} allowCheck={props.allowCheck} allowDelete={props.allowDelete} allowAdd={props.allowAdd} />
            ))}

        </>
    );
};

const TreeNode = ({ icons, handleAddNode, onNodeClickOptions, onNodeClick, filternodes, nodes, expanded, handleExpand, changeState, horizontalSpacing, verticalSpacing, borderLeft, allowCheck, allowDelete, allowAdd }) => {
    const hasChild = nodes.nodes.length > 0 ? true : false;
    const handleVisibility = (e) => {
        const hasnodes = e.nodes.length > 0 ? true : false;
        if (!hasnodes) return
        let newArray = expanded
        if (expanded.includes(e.id)) {
            newArray = expanded.filter((value) => { return value !== e.id })
        } else {
            newArray.push(e.id)
        }
        handleExpand(newArray)
    }

    const handleSingleNode = (nodes) => {
        const nodeObj = getPath(filternodes, nodes.id, onNodeClickOptions.key, onNodeClickOptions.delimiter)
        if (onNodeClick) {
            onNodeClick(nodeObj)
            if (onNodeClickOptions.allowExpand) {
                handleVisibility(nodes)
            }
        }

    }

    const handleCheck = (e) => {
        changeState(findNode(filternodes, parseInt(e.target.value), e.target.checked))
    }
    const handleDeleteNode = (nodeid, allnodes) => {
        if (window.confirm("Are you sure you want to delete")) {
            changeState(getupdatednodes(nodeid, allnodes))
        }

    }

    return (
        <>
            <div className="rtc-d-flex" style={{ alignItems: "center", marginBottom: verticalSpacing }} >
                {hasChild && (
                    <button name={nodes.id} onClick={(e) => handleVisibility(nodes)} style={{ height: "fit-content" }} className="rtc-btn">
                        {expanded.includes(nodes.id) ? icons.expandIcon : icons.compressIcon}
                    </button>
                )}
                <div>
                    <span style={{ display: "flex", alignItems: "end" }}>
                        {allowCheck &&
                            (<span style={{ marginRight: "7px" }}>
                                <input value={nodes.id} name={nodes.id} onChange={(e) => handleCheck(e)} type="checkbox" checked={nodes.status} style={{ width: `16px`, height: `16px`, verticalAlign: "middle" }} />
                            </span>)
                        }
                        <span className="rtc-text-wrapper">
                            {hasChild ? (
                                <span>
                                    {expanded.includes(nodes.id) ? icons.nodeExpandIcon : icons.nodeCompressIcon}
                                </span>
                            ) :
                                icons.nonNodeIcon ? <span>{icons.nonNodeIcon}</span> : ""

                            }
                            <span style={{ cursor: onNodeClick ? "pointer" : "auto" }} onClick={(e) => handleSingleNode(nodes)} >     {nodes.text}</span>

                            {allowDelete ? <span title="Delete" onClick={() => handleDeleteNode(nodes.id, filternodes)} className="rtc-deleteicon">{icons.deleteIcon}</span> : null}
                            {allowAdd ? <span title="Add" onClick={() => handleAddNode(nodes.id)} className="rtc-addicon">{icons.addIcon}</span> : null}
                        </span>
                    </span>
                </div>
            </div>
            {expanded.includes(nodes.id) && (
                <div style={{ borderLeft, paddingLeft: borderLeft === "none" ? horizontalSpacing : `calc(${horizontalSpacing} - 1px )` }}>
                    <Tree icons={icons} handleAddNode={handleAddNode} onNodeClickOptions={onNodeClickOptions} onNodeClick={onNodeClick} filternodes={filternodes} data={nodes.nodes} expanded={expanded} handleExpand={handleExpand} changeState={changeState} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} allowDelete={allowDelete} allowAdd={allowAdd} />
                </div>
            )}
        </>
    );
};

TreeView.displayName = "TreeView"

// Specifies the default values for props:
TreeView.defaultProps = {
    borderLeft: 'none',
    customStyling: {},
    icons: {
        compressIcon: <img src={chevronRight} alt="compressicon" />,
        expandIcon: <img src={chevronDown} alt="expandicon" />,
        nodeCompressIcon: null,
        nodeExpandIcon: null,
        nonNodeIcon: null,
        deleteIcon: <img src={deleteicon} alt="deleteicon" />,
        addIcon: <img src={addicon} alt="deleteicon" />,
    },
    column: 12,
    allowCheck: true,
    allowDelete: false,
    allowAdd: false,
    horizontalSpacing: "23px",
    verticalSpacing: "0px",
    addText: "Add New Node",
    onNodeClickOptions: {
        allowExpand: false,
        key: "text",
        delimiter: "/"
    }
};

TreeView.propTypes = {
    borderLeft: PropTypes.string,
    allowCheck: PropTypes.bool,
    allowDelete: PropTypes.bool,
    allowAdd: PropTypes.bool,
    verticalSpacing: PropTypes.string,
    horizontalSpacing: PropTypes.string,
    customStyling: PropTypes.object,
    column: PropTypes.number,
    filternodes: PropTypes.array.isRequired,
    expanded: PropTypes.array.isRequired,
    handleExpand: PropTypes.func.isRequired,
    changeState: PropTypes.func,
    onAllowAdd: PropTypes.func,
    handleAddNode: PropTypes.func,
    onNodeClick: PropTypes.func,
    onNodeClickOptions: PropTypes.object,
    savebtnClass: PropTypes.string,
    addText: PropTypes.string,
    icons: PropTypes.object
};


export default TreeView;