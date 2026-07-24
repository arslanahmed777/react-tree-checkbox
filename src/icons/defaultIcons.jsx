import { createElement } from "react";
import chevronRight from "./chevronRight.svg";
import chevronDown from "./chevronDown.svg";
import deleteIconAsset from "./deleteIcon.svg";
import addIconAsset from "./addicon.svg";
import editIconAsset from "./editIcon.svg";

const decorativeImg = (src) =>
  createElement("img", { src, alt: "", "aria-hidden": "true" });

export const defaultIcons = {
  compressIcon: decorativeImg(chevronRight),
  expandIcon: decorativeImg(chevronDown),
  nodeCompressIcon: null,
  nodeExpandIcon: null,
  nonNodeIcon: null,
  deleteIcon: decorativeImg(deleteIconAsset),
  addIcon: decorativeImg(addIconAsset),
  editIcon: decorativeImg(editIconAsset),
};
