"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_redux_1 = require("react-redux");
const store_1 = require("./app/store");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
require("./index.css");
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
const root = (0, client_1.createRoot)(rootElement);
root.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.store}>
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
