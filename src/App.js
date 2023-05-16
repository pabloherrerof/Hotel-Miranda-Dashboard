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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Dashboard_1 = require("./pages/Dashboard/Dashboard");
const Bookings_1 = require("./pages/Booking/Bookings");
const Rooms_1 = require("./pages/Rooms/Rooms");
const Contact_1 = require("./pages/Contact");
const Users_1 = require("./pages/Users/Users");
const SingleUser_1 = require("./pages/Users/SingleUser");
require("./App.css");
const Login_1 = require("./pages/Login/Login");
const SingleBooking_1 = require("./pages/Booking/SingleBooking");
const ErrorPage_1 = require("./pages/ErrorPage/ErrorPage");
const PrivateRoute_1 = require("./components/PrivateRoute");
const Layout_1 = require("./components/Layout");
const SingleRoom_1 = require("./pages/Rooms/SingleRoom");
const UserContext_1 = require("./components/UserContext");
const initialState = {
    auth: false,
    user: {},
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LogIn":
            return Object.assign(Object.assign({}, state), { auth: true, user: action.payload });
        case "LogOut":
            return Object.assign(Object.assign({}, state), { auth: false, user: {} });
        default:
            return state;
    }
};
function App() {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    return (<>
    <UserContext_1.UserContext.Provider value={{ state, dispatch }}>
      <react_router_dom_1.BrowserRouter>
      
        <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/login" element={state.auth ? <react_router_dom_1.Navigate to="/"/> : <Login_1.Login />}/>
         
         <react_router_dom_1.Route element={<PrivateRoute_1.PrivateRoute auth={state.auth}><Layout_1.Layout /></PrivateRoute_1.PrivateRoute>}>
          <react_router_dom_1.Route path="/" element={<Dashboard_1.Dashboard />}/>
 
          <react_router_dom_1.Route path="/bookings" element={<Bookings_1.Bookings />}/>
          <react_router_dom_1.Route path="/bookings/:id" element={<SingleBooking_1.SingleBooking />}/>

          <react_router_dom_1.Route path="/rooms" element={<Rooms_1.Rooms />}/>
          <react_router_dom_1.Route path="/rooms/:id" element={<SingleRoom_1.SingleRoom />}/>

          <react_router_dom_1.Route path="/contact" element={<Contact_1.Contact />}/>

          <react_router_dom_1.Route path="/users" element={<Users_1.Users />}/> {/*/ Vista de datos de usuario loggeado con posibilidad de editar*/}
          <react_router_dom_1.Route path="/users/:id" element={<SingleUser_1.SingleUser />}/> 
          <react_router_dom_1.Route path="*" element={<ErrorPage_1.ErrorPage />}/>
          </react_router_dom_1.Route>
          
        </react_router_dom_1.Routes>
        
      </react_router_dom_1.BrowserRouter>
      </UserContext_1.UserContext.Provider>
    </>);
}
exports.default = App;
