"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = exports.Content = exports.RightSection = exports.LeftMenu = exports.Container = void 0;
const styled_components_1 = __importStar(require("styled-components"));
exports.Container = styled_components_1.default.div `
    min-height: 100vh;
    display: flex;
    margin: 0;
    max-width: 100vw;
`;
exports.LeftMenu = styled_components_1.default.div `
 display: inline-block;
 width: 300px;
 ${props => !props.open && (0, styled_components_1.css) `
    display: none;
`}
 `;
exports.RightSection = styled_components_1.default.section `
display: inline-block;
width: ${props => props.open ? "calc(100% - 300px)" : "100%"};
`;
exports.Content = styled_components_1.default.main `
display: flex;
align-items: center;
flex-direction: column;
background-color: #00000005;
padding: 3% 30px;
height: calc(100% - 100px);
position: relative;
`;
exports.Wrapper = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
