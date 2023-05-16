"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewInfo = exports.ReviewComment = exports.ReviewContainer = exports.ReviewSlider = void 0;
const react_slick_1 = __importDefault(require("react-slick"));
const styled_components_1 = __importDefault(require("styled-components"));
exports.ReviewSlider = (0, styled_components_1.default)(react_slick_1.default) `
    width: 100%;
    margin-bottom: 2rem;
`;
exports.ReviewContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  background-color: #ffffff;
  margin-right: 20px;
  min-height: 180px;
  
  &:hover{
    scale: 1.1;
    cursor: pointer;
  }
`;
exports.ReviewComment = styled_components_1.default.div `
  font-size: 12px;
  font-weight: normal;
  color: #262626;
  font-family: "Poppins";
  background-color: #FFFFFFFF;
  
`;
exports.ReviewInfo = styled_components_1.default.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins";
  background-color: #FFFFFFFF;


  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #262626;
    margin: 0;
  }

  p {
    font-weight: normal;
    font-size: 10px;
    color: #799283;
    margin: 0;
  }
`;
