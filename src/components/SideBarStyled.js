"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Copyright = exports.MenuLink = exports.SideBarUserImage = exports.User = exports.LinkContainer = exports.Logo = exports.Wrapper = void 0;
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
exports.Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  box-shadow: 13px 3px 40px #00000005;
  gap: 1.8rem;
  align-items: center;
  width: 100%;
  padding-bottom: 5%;
  height: 100%;
`;
exports.Logo = styled_components_1.default.div `
  height: 100px;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: center;
  gap: ${(props) => (props.column ? "0.5rem" : "1.5rem")};
  p {
    margin: 0;
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    color: #5d5449;
  }
  h2 {
    margin: 0;
    font-family: "Poppins";
    font-weight: 900;
    font-size: 28px;
  }
  img {
    width: 60px;
  }
`;
exports.LinkContainer = styled_components_1.default.ul `
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2.5rem;
  font-family: "Poppins";
  font-style: 18px;
  font-weight: normal;
  color: #799283;
  padding: 0;

  li:hover {
    scale: 1.2;
    cursor: pointer;
  }

  svg {
    font-size: 22px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;
exports.User = styled_components_1.default.div `
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  margin: 15% 0;

  .user-image {
    width: 70px;
    height: 70px;
    background-color: #c5c5c5;
    border-radius: 8px;
  }

  h5 {
    text-align: center;
    font-family: "Poppins";
    font-size: 16px;
    font-weight: medium;
    letter-spacing: 0px;
    color: #393939;
    margin-top: 1rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #b2b2b2;
    margin: 0;
    margin-bottom: 1rem;
  }

  button {
    background: #ebf1ef;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-family: "Poppins";
    font-weight: 600;
    letter-spacing: 0px;
    color: #135846;
    padding: 0.7rem 2rem;
  }

  button:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;
exports.SideBarUserImage = styled_components_1.default.img `
    width: 70px;
    height: 70px;
    background-color: #c5c5c5;
    border-radius: 8px;
    object-fit: cover;
`;
exports.MenuLink = (0, styled_components_1.default)(react_router_dom_1.NavLink) `
  font-weight: normal;
  color: #799283;
  text-decoration: none;

  &.active {
    color: #135846;
    font-weight: 600;
  }
`;
exports.Copyright = styled_components_1.default.div `
  margin-top: 0;
  padding: 0 1%;

  h6 {
    font-size: 14px;
    font-family: "Poppins";
    font-weight: 600;
    color: #212121;
    margin-bottom: 5px;
    margin-top: 0;
  }

  p {
    font-family: "Poppins";
    font-weight: 300;
    font-size: 12px;
    color: #799283;
    margin: 0;
  }
`;
