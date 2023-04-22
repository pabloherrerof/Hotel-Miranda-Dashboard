
import { Card, CardContainer, CardImage, Booked, CardTitle, UserImage, CardItem, CardSeparator, CardAmenitie, TitleRow, FeaturesRow, CardImageText} from "../../components/Card";
import {IoBedOutline, IoShieldCheckmarkOutline, IoWifiOutline} from "react-icons/io5"
import styled from "styled-components";
import { MySlider } from "../../components/Slider";




export const SingleBooking = (props) =>{
    let bookStatus = "IN PROGRESS"
    return(<>
        <CardContainer full>
            <Card full>
                <TitleRow>
                <UserImage/>
                <CardTitle>
                    <h2>Pablo Herrero</h2>
                    <h5>ID123456</h5>
                </CardTitle>
                </TitleRow>
                <FeaturesRow>
                    <CardItem>
                        <h6>Check in</h6>
                        <h5>October 24, 2023</h5>
                    </CardItem>
                    <CardItem>
                        <h6>Check out</h6>
                        <h5>October 31, 2023</h5>
                    </CardItem>
                </FeaturesRow>
                <CardSeparator/>
                <FeaturesRow>
                    <CardItem>
                        <h6>Room info</h6>
                        <h4>Room 0001</h4>
                    </CardItem>
                    <CardItem>
                        <h6>Price</h6>
                        <h4>145 $ <span>/per night</span></h4>
                    </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                    <CardItem paragraph>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </CardItem>
                </FeaturesRow>
                <FeaturesRow amenities>
                   <CardItem amenitie>
                    <CardAmenitie><IoBedOutline/>2 Bedroom</CardAmenitie>
                   </CardItem>
                   <CardItem amenitie>
                    <CardAmenitie><IoShieldCheckmarkOutline/> 24 Hours Guard</CardAmenitie>
                   </CardItem>
                   <CardItem amenitie>
                    <CardAmenitie><IoWifiOutline/> Free Wifi</CardAmenitie>
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
             </Card>
            <CardImage>
                
        <MySlider/>

                <Booked bookStatus={bookStatus}>{bookStatus}</Booked>
                <CardImageText/></CardImage>
        </CardContainer>
    </>)
}