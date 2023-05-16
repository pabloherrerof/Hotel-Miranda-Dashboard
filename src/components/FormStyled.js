"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputBig = exports.Label = exports.RadioInput = exports.Input = exports.FormContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.FormContainer = styled_components_1.default.form `
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  padding: 2rem;
  p{
    color: red;
    font-size: 10px;
  }
`;
exports.Input = styled_components_1.default.div `
  width: 75%;
  min-width: 200px;
  font-weight: normal;
  font-family: "Poppins";
  font-size: 14px;
  letter-spacing: 0px;
  color: #212121;
  margin: 0;
  display: flex;
  flex-direction: column;

  h6{
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    color: #6e6e6e;
    margin: 0;
  }
  

  input {
    border: none;
    box-shadow: 0px 3px 10px #00000005;
    background-color: #d4d4d4;
    border-radius: 6px;
    padding: 0.3rem 0.5rem;
    font-weight: normal;
  font-family: "Poppins";
  font-size: 12px;
  }

  select {
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    letter-spacing: 0px;
    color: #212121;
    margin: 0;
    border: none;
    border-bottom: 1px solid black;
  }
`;
exports.RadioInput = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
exports.Label = styled_components_1.default.label `
     color: ${props => {
    if (props.active) {
        return "#5AD07A";
    }
    if (props.inactive) {
        return "#E23428";
    }
}};
`;
exports.InputBig = styled_components_1.default.div `
  width: 100%;
 
  
  letter-spacing: 0px;
  color: #212121;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 150px;
  
h6{
  margin: 0;
  font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    color: #6e6e6e;
    margin: 0;
}
  input {
    border: none;
    box-shadow: 0px 3px 10px #00000005;
    background-color: #d4d4d4;
    border-radius: 6px;
    padding: 0.3rem 0.5rem;
    height: 100%;
    font-weight: normal;
  font-family: "Poppins";
  font-size: 12px;

  }`;
