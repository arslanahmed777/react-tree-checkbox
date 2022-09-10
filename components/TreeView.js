
import React from "react";
import PropTypes from 'prop-types';
import folderClose from "./folderClose.svg"
import folderOpen from "./folderOpen.svg"
import deleteicon from "./deleteIcon.svg"
import addicon from "./addicon.svg"
import "./Tree.css";

// ******************************** CUSTOM HELPER FUNCTIONS *********************
let findNode = (nodes, value, status) => {
    let foundObj = null;
    nodes.forEach((__) => {
        if (__.value === value) {
            foundObj = __;
        } else {
            let searchRecursive = (node) => {
                if (node.nodes) {
                    node.nodes.forEach((_) => {
                        if (_.value === value) {
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
            if (nextNodes.value === value) {
                foundNodes.push(nextNodes);
            } else {
                if (nextNodes.nodes) {
                    nextNodes.nodes.forEach((_) => {
                        if (_.value === value) {
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
        let setStatus = (nextNodes, { value }, status) => {
            let recursiveTrue = (nextNodes, value) => {
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
                    if (node.value === value) {
                        let setRecursiveParent = (node, value) => {
                            if (node.nodes) {
                                if (node.nodes.some((v) => v.value === value)) {
                                    node.status = true;
                                    setRecursiveParent(parentNode, node.value);
                                } else {
                                    if (node.nodes) {
                                        node.nodes.forEach((_) => {
                                            setRecursiveParent(_, value);
                                        });
                                    }
                                }
                            }
                        };
                        setRecursiveChild(node, true);
                        setRecursiveParent(parentNode, value);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveTrue(_);
                            });
                        }
                    }
                };
                let setRecursiveFalse = (node) => {
                    if (node.value === value) {
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

                if (parentNode.value === value) {
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

            recursiveTrue(nextNodes, value, status);
        };

        recursiveFind(nextNodes, value);
        setStatus(nextNodes, foundNodes[0], status);
        if (status && nextNodes.value === value) {
            nextNodes.status = status;
        } else if (nextNodes.value === value && !status) {
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

const addNewNode = (nodeid, nodeobj, allnodes) => {
    allnodes.forEach((node, index) =>
        node.id === nodeid
            ? allnodes[index].nodes.push(nodeobj)
            : node.nodes
                ? addNewNode(nodeid, nodeobj, node.nodes)
                : ''
    );
    return allnodes
}

const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}







const TreeView = ({ filternodes = [], column, expandIcon, deleteIcon, compressIcon, addIcon, expanded, handleExpand, changeState, fontSize, backgroundColor, color, horizontalSpacing, verticalSpacing, borderLeft, allowCheck, allowDelete, allowAdd, saveTree, savebtnClass }) => {
    //column = 12 / column
    return (
        <div className="rtc-row" style={{ fontSize: fontSize, backgroundColor: backgroundColor, color: color }}>
            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={`rtc-scroll rtc-col-${column}`} style={{ overflowX: "auto" }}>
                        <TreeNode filternodes={filternodes} nodes={items} expandIcon={expandIcon} deleteIcon={deleteIcon} addIcon={addIcon} compressIcon={compressIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} allowDelete={allowDelete} allowAdd={allowAdd} />
                    </div>
                )
            })}
            {typeof saveTree === "function" && (
                <div className="rtc-col-12">
                    <button onClick={() => { saveTree(filternodes) }} className={savebtnClass}>Save</button>
                </div>
            )}

        </div>
    );
};

const Tree = (props) => {
    return (
        <>
            {props.data.map((items, i) => (
                <TreeNode filternodes={props.filternodes} key={i} nodes={items} expandIcon={props.expandIcon} deleteIcon={props.deleteIcon} addIcon={props.addIcon} compressIcon={props.compressIcon} expanded={props.expanded} handleExpand={props.handleExpand} changeState={props.changeState} fontSize={props.fontSize} horizontalSpacing={props.horizontalSpacing} verticalSpacing={props.verticalSpacing} borderLeft={props.borderLeft} allowCheck={props.allowCheck} allowDelete={props.allowDelete} allowAdd={props.allowAdd} />
            ))}

        </>
    );
};

const TreeNode = ({ filternodes, nodes, expandIcon, deleteIcon, addIcon, compressIcon, expanded, handleExpand, changeState, fontSize, horizontalSpacing, verticalSpacing, borderLeft, allowCheck, allowDelete, allowAdd }) => {
    const hasChild = nodes.nodes.length > 0 ? true : false;
    const handleVisibility = (e) => {
        let newArray = expanded
        if (expanded.includes(e)) {
            newArray = expanded.filter((value) => { return value !== e })
        } else {
            newArray.push(e)
        }
        handleExpand(newArray)
    }

    const handleCheck = (e) => {
        changeState(findNode(filternodes, e.target.value, e.target.checked))
    }
    const handleDeleteNode = (nodeid, allnodes) => {
        changeState(getupdatednodes(nodeid, allnodes))
    }

    const handleAddNode = (nodeid, allnodes) => {
        let person = prompt("Enter the value");
        if (person === null) return

        console.log(nodeid, person);
        let newobj = {
            text: person,
            value: person.toLowerCase(),
            status: false,
            nodes: [],
            id: uniqueId(),
        }
        console.log(newobj);
        changeState(addNewNode(nodeid, newobj, allnodes))

    }
    return (
        <>
            <div className="rtc-d-flex" style={{ alignItems: "center", marginBottom: verticalSpacing }} >
                {hasChild && (
                    <button name={nodes.value} onClick={(e) => handleVisibility(nodes.value)} style={{ fontSize: "inherit", height: "fit-content" }} className="rtc-btn">
                        {expanded.includes(nodes.value) ? expandIcon : compressIcon}
                    </button>
                )}
                <div>
                    <span style={{ display: "flex", alignItems: "end" }}>
                        <span className="rtc-mx-1">
                            {allowCheck && <input value={nodes.value} name={nodes.value} onChange={(e) => handleCheck(e)} type="checkbox" checked={nodes.status} className="rtc-mx-1" style={{ width: `calc(${fontSize} - 8px)`, height: `calc(${fontSize} - 8px)` }} />}
                        </span>
                        <span className="rtc-text-wrapper">{nodes.text}
                            {allowDelete ? <span title="Delete" onClick={() => handleDeleteNode(nodes.id, filternodes)} className="rtc-deleteicon">{deleteIcon}</span> : null}
                            {allowAdd ? <span title="Add" onClick={() => handleAddNode(nodes.id, filternodes)} className="rtc-addicon">{addIcon}</span> : null}
                        </span>
                    </span>
                </div>
            </div>
            {expanded.includes(nodes.value) && (
                <div style={{ marginLeft: borderLeft === "none" ? horizontalSpacing : `calc(${horizontalSpacing} - 12px )`, borderLeft: borderLeft, paddingLeft: borderLeft === "none" ? "0px" : "12px" }}>
                    <Tree filternodes={filternodes} data={nodes.nodes} expandIcon={expandIcon} deleteIcon={deleteIcon} addIcon={addIcon} compressIcon={compressIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} allowDelete={allowDelete} allowAdd={allowAdd} />
                </div>
            )}
        </>
    );
};

// Specifies the default values for props:
TreeView.defaultProps = {
    borderLeft: 'none',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '18px',
    compressIcon: <img src={folderClose} alt="compressicon" />,
    expandIcon: <img src={folderOpen} alt="expandicon" />,
    deleteIcon: <img src={deleteicon} alt="deleteicon" />,
    addIcon: <img src={addicon} alt="deleteicon" />,
    column: 6,
    allowCheck: true,
    allowDelete: false,
    allowAdd: false,
    horizontalSpacing: "14px",
    verticalSpacing: "5px",
    saveTree: false,
    savebtnClass: "rtc-save-button"
};

TreeView.propTypes = {
    borderLeft: PropTypes.string,
    allowCheck: PropTypes.bool,
    allowDelete: PropTypes.bool,
    allowAdd: PropTypes.bool,
    verticalSpacing: PropTypes.string,
    horizontalSpacing: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    compressIcon: PropTypes.element,
    expandIcon: PropTypes.element,
    deleteIcon: PropTypes.element,
    addIcon: PropTypes.element,
    column: PropTypes.number,
    filternodes: PropTypes.array.isRequired,
    expanded: PropTypes.array.isRequired,
    handleExpand: PropTypes.func.isRequired,
    changeState: PropTypes.func,
    saveTree: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
    savebtnClass: PropTypes.string
};


export default TreeView;