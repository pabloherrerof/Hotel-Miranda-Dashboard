import { Navigate, useParams } from "react-router-dom";
import {
  Card,
  CardContainer,
  CardTitle,
  UserImage,
  CardItem,
  CardSeparator,
  TitleRow,
  FeaturesRow,
} from "../../components/CardStyled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, getUser } from "../../features/users/usersThunks";
import {
  getSingleUserStatus,
  getUsersSingle,
  getUsersStatus,
} from "../../features/users/usersSlice";
import { HashLoader } from "react-spinners";
import { Wrapper } from "../../components/LayoutStyled";



export const SingleUser = ({ match }) => {
  const userId = useParams();
  const dispatch = useDispatch();
  const getUserData = useSelector(getUsersSingle);
  const getStatus = useSelector(getUsersStatus);
  const getUserStatus = useSelector(getSingleUserStatus);
  console.log(userId)


  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchUsers());
    } 
    if(getUserStatus ==="idle" || getUserData){
      if(userId.id !== getUserData.id){
        dispatch(getUser(userId.id))
      }
    }
  }, [dispatch, getStatus, getUserStatus, userId.id, getUserData]);

  if (getUserStatus === "pending" || getStatus === "pending") {
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
  } else if (getUserData) {
    return (
      <>
        <CardContainer>
          <Card>
            <TitleRow>
              <UserImage>
                <img src={getUserData.photo} alt="" />
              </UserImage>
              <CardTitle>
                <h2>{getUserData.name}</h2>
                <h5>{getUserData.position}</h5>
              </CardTitle>
            </TitleRow>
            <FeaturesRow>
              <CardItem>
                <h6>Phone number</h6>
                <h5>{getUserData.phone}</h5>
              </CardItem>
              <CardItem>
                <h6>Email</h6>
                <h5>{getUserData.email}</h5>
              </CardItem>
            </FeaturesRow>
            <FeaturesRow>
              <CardItem>
                <h6>Date of registration</h6>
                <h5>{getUserData.startDate}</h5>
              </CardItem>
              <CardItem state={getUserData.state}>
                <h6>Status</h6>
                <h5>{getUserData.state}</h5>
              </CardItem>
            </FeaturesRow>
            <FeaturesRow>
              <CardItem>
                <h6>Password</h6>
                <h5>{getUserData.password}</h5>
              </CardItem>
            </FeaturesRow>
            <CardSeparator />
            <FeaturesRow>
              <CardItem paragraph>
                <h3>Description</h3>
                <p>{getUserData.jobDescription}</p>
              </CardItem>
            </FeaturesRow>
          </Card>
        </CardContainer>
      </>
    );
  } else {
    return (
      <>
        <Navigate to="error" />
      </>
    ); 
  }
  
};
