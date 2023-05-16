"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiText = exports.KpiIcon = exports.KPI = exports.KpiRow = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.KpiRow = styled_components_1.default.div `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 2rem;
`;
exports.KPI = styled_components_1.default.div `
  height: 70px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;

  &:hover {
    scale: 1.1;
  }
`;
exports.KpiIcon = styled_components_1.default.div `
  width: 55px;
  height: 55px;
  background: #ffedec;
  border-radius: 8px;
  color: #e23428;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffedec;
    background-color: #e23428;
  }
`;
exports.KpiText = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0;
  h2 {
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    font-family: "Poppins";
    color: #393939;
    margin: 0;
  }

  h6 {
    text-align: left;
    font-weight: 300;
    font-size: 10px;
    font-family: "Poppins";
    color: #787878;
    margin: 0;
  }
`;
