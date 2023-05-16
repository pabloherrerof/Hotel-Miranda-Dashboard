"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseIcon = exports.CardHeader = exports.FeaturesRow = exports.TitleRow = exports.CardAmenitie = exports.CardSeparator = exports.CardItem = exports.UserImage = exports.CardTitle = exports.Booked = exports.CardImageText = exports.CardImage = exports.Card = exports.CardContainer = void 0;
const io5_1 = require("react-icons/io5");
const styled_components_1 = __importDefault(require("styled-components"));
exports.CardContainer = styled_components_1.default.section `
  width: ${(props) => (props.full ? "100%" : "80%")};
  background-color: #ffffff;
  display: flex;
  border-radius: 30px;
  max-height: 110vh;
`;
exports.Card = styled_components_1.default.div `
  width: ${(props) => (props.full ? "46%" : "100%")};
  background-color: #ffffff;
  border-radius: 12px;
  padding: 4%;
`;
exports.CardImage = styled_components_1.default.div `
  width: 50%;
  height: 100%;
  position: relative;
  background-color: #c5c5c5;
  border-radius: 0 12px 12px 0;
  overflow: hidden;
  font-weight: 500;

  .slick-slider {
    width: 100%;
    height: 100%;
    margin: 0;
    position: relative;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    font-family: "Courier";
    background-color: #ffffff47;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid;
    width: 40px;
    height: 40px;
    position: absolute;
  }

  .slick-next {
    position: absolute;
    top: 50%;
    right: 50px;
    z-index: 10;
  }
  .slick-prev {
    position: absolute;
    top: 50%;
    left: 30px;
    z-index: 10;
  }

  
`;
exports.CardImageText = styled_components_1.default.div `
  height: 40%;
  width: 100%;
  background: rgb(64, 68, 68);
  background: linear-gradient(
    0deg,
    rgba(64, 68, 68, 0.9486388305322129) 19%,
    rgba(99, 100, 100, 0.6769301470588236) 51%,
    rgba(116, 115, 115, 0.309983368347339) 79%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  z-index: 1;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3rem;

  h4 {

    padding-left: 5%;
    padding-right: 5%;
    font-size: 22px;
    color: #ffffff;
    font-weight: 500;
    font-family: "Poppins";
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p {
    padding-left: 5%;
    padding-right: 5%;
    font-family: "Poppins";
    font-weight: 300;
    font-size: 14px;
    color: #ffffff70;
  }
`;
exports.Booked = styled_components_1.default.div `
  position: absolute;
  text-align: center;
  padding: 1%;
  top: 30px;
  width: 200px;
  right: -60px;
  background-color: ${(props) => {
    switch (props.bookStatus) {
        case "CHECK IN":
            return "#5AD07A";
        case "CHECK OUT":
            return "#E23428";
        case "IN PROGRESS":
            return "#ebd90d";
        case "OFFER":
            return "#c1ae8b";
        default:
            return "transparent";
    }
}};
  height: 30px;
  z-index: 1;
  transform: rotate(45deg);

  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
`;
exports.CardTitle = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin: 0;

  h2 {
    text-align: left;
    font-weight: 600;
    font-family: "Poppins";
    font-size: 30px;
    letter-spacing: 0px;
    color: #212121;
    margin: 0;
  }

  h5 {
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    letter-spacing: 0px;
    color: #799283;
    margin: 0;
  }
`;
exports.UserImage = styled_components_1.default.div `
  object-fit: cover;
  img {
    border-radius: 12px;
    width: 100px;
    height: 100px;
  }
`;
exports.CardItem = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => props.paragraph ? "100%" : props.amenitie ? "auto" : "50%"};

  h6 {
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    color: #6e6e6e;
    margin: 0;
  }

  h5 {
    font-weight: medium;
    font-family: "Poppins";
    font-size: 16px;
    text-decoration: ${(props) => {
    if (props.discount > 0 && props.price) {
        return "line-through";
    }
    else
        return "none";
}};
    color:${(props) => {
    if (props.state) {
        switch (props.state) {
            case "ACTIVE":
                return "#5AD07A";
            case "INACTIVE":
                return "#E23428";
            case "AVAILABLE":
                return "#5AD07A";
            case "BOOKED":
                return "#E23428";
            default:
                return "#212121";
        }
    }
    else {
        if (props.discount > 0 && props.offer) {
            return "#E23428";
        }
        else
            return "#212121";
    }
}};
    margin: 0;
  }

  h4 {
    font-weight: medium;
    font-family: "Poppins";
    font-size: 20px;
    color: #212121;
    margin: 0;
  }
  span {
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    color: #799283;
    margin: 0;
    
  }

  p {
    font-weight: normal;
    font-family: "Poppins";
    font-size: 14px;
    color: #363636;
    margin: 0;
  }
`;
exports.CardSeparator = styled_components_1.default.div `
  background-color: #ebebeb;
  height: 1px;
  width: 100%;
  margin: 2rem 0;
`;
exports.CardAmenitie = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  gap: 0.8rem;
  background-color: #e8f2ef;
  padding: 1rem 0.8rem;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 14px;
  color: #135846;
  text-align: center;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 22px;
    font-weight: 600;
  }
`;
exports.TitleRow = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  gap: 10%;
  margin-bottom: 5%;
`;
exports.FeaturesRow = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  margin-top: 2.2rem;
  gap: ${(props) => (props.amenities ? "1rem" : "0")};
  flex-wrap: wrap;
`;
exports.CardHeader = styled_components_1.default.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 30px;
  margin-bottom: 2rem;
  color: ${(props) => props.close ? "#E23428" : "gray"};
  svg:hover{
    scale: 1.1;
    cursor:pointer;
  }
  p{
    color: red;
    font-size: 10px;
  }
`;
exports.CloseIcon = (0, styled_components_1.default)(io5_1.IoClose) `
 color:  #E23428;
`;
