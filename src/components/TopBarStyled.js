"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavItemContainer = exports.Nav = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.Nav = styled_components_1.default.nav `
  width: 100%;
  height: 100px;
  box-shadow: 0px 3px 10px #00000005;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
`;
exports.NavItemContainer = styled_components_1.default.div `
  font-size: 24px;
  color: #262626;
  display: flex;
  flex-direction: row;
  font-family: "Poppins";
  align-items: center;
  gap: 2.5rem;
  padding: 0 2%;

  svg:hover {
    scale: 1.2;
    cursor: pointer;
  }

  h2 {
    font-size: 24px;
  }
`;
