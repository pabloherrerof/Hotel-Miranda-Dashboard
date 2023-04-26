import {
    Card,
    CardContainer,
    CardImage,
    Booked,
    CardTitle,
    CardItem,
    CardSeparator,
    CardAmenitie,
    TitleRow,
    FeaturesRow,
  } from "../../components/CardStyled";

  import {
    IoBedOutline,
    IoShieldCheckmarkOutline,
    IoWifiOutline,
  } from "react-icons/io5";
  import { MySlider } from "../../components/Slider";

export const Room = (props) => {
 let bookStatus = "OFFER";



    return (
      <>
        <CardContainer full>
          <Card full>
            <TitleRow>
              <CardTitle>
                <h2>Room 001</h2>
                <h5>Double bed</h5>
              </CardTitle>
            </TitleRow>
            <FeaturesRow>
            <CardItem paragraph>
                <h3>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
              </CardItem>
            </FeaturesRow>
            <CardSeparator />
            <FeaturesRow>
              <CardItem>
              <h6>Price</h6>
                <h4>
                  145 $ <span>/per night</span>
                </h4>
              </CardItem>
              <CardItem>
                <h6>Discount</h6>
                <h4>20%</h4>
              </CardItem>
            </FeaturesRow>
            <CardSeparator />
            
            <FeaturesRow amenities>
              <CardItem amenitie>
                <CardAmenitie>
                  <IoBedOutline />2 Bedroom
                </CardAmenitie>
              </CardItem>
              <CardItem amenitie>
                <CardAmenitie>
                  <IoShieldCheckmarkOutline /> 24 Hours Guard
                </CardAmenitie>
              </CardItem>
              <CardItem amenitie>
                <CardAmenitie>
                  <IoWifiOutline /> Free Wifi
                </CardAmenitie>
              </CardItem>
              <CardItem amenitie>
                <CardAmenitie>2 Bathroom</CardAmenitie>
              </CardItem>
              <CardItem amenitie>
                <CardAmenitie>Air Conditioner</CardAmenitie>
              </CardItem>
              <CardItem amenitie>
                <CardAmenitie>Television</CardAmenitie>
              </CardItem>
            </FeaturesRow>
            <FeaturesRow>
              <CardItem paragraph>
                <h3>Cancellation</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
              </CardItem>
            </FeaturesRow>
          </Card>
          <CardImage>
            <MySlider>
           
            </MySlider>
  
            <Booked bookStatus={bookStatus}>{bookStatus}</Booked>
          </CardImage>
         
          
        </CardContainer>
      </>
    );
}