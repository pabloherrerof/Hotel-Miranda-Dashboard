"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalCloseRow = exports.ModalButtonRow = exports.ModalContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.ModalContainer = styled_components_1.default.div `

    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
    padding: 1rem 2rem;
    padding-bottom: 2rem;
    background-color: #FFFFFFFF;
    border-radius: 12px;
    position: fixed;
    top: ${props => props.top ? "10%" : "40%"};
    box-shadow: 0px 3px 10px #00000005;
    border: 0.5px solid #212121 ;
    gap: 1rem;
    z-index: 5;
    max-width: 500px;


    h2{
    text-align: center;
    font-weight: 600;
    font-family: "Poppins";
    font-size: 20px;
    letter-spacing: 0px;
    color: #212121;
    margin: 0;
    }  
`;
exports.ModalButtonRow = styled_components_1.default.div `
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
        width: 100%;
`;
exports.ModalCloseRow = styled_components_1.default.div `
    width: 100%;
    text-align: end;
    color: #E23428;
    font-size: 20px;

    svg:hover{
        scale: 1.2;
        cursor: pointer;
    }
    
`;
