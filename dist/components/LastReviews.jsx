var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewComment, ReviewContainer, ReviewInfo, ReviewSlider } from "./LastReviewsStyled";
import { dateConverter, maxCharString } from "../features/otherFunctions";
import { ArchiveButton } from "./Button";
import { archiveContacts } from "../features/contacts/contactThunks";
import { Modal } from "./Modal";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
export const LastReviews = ({ data }) => {
    const SlickButtonFix = (_a) => {
        var { currentSlide, slideCount, children } = _a, props = __rest(_a, ["currentSlide", "slideCount", "children"]);
        return (<span {...props}>{children}</span>);
    };
    const [showModal, setShowModal] = useState(true);
    const [target, setTarget] = React.useState();
    const dispatch = useAppDispatch();
    const settings = {
        prevArrow: <SlickButtonFix></SlickButtonFix>,
        nextArrow: <SlickButtonFix> </SlickButtonFix>,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false
    };
    const onClickArchiveHandler = (contact) => {
        dispatch(archiveContacts(contact));
    };
    return (<>
          <ReviewSlider {...settings}>
          {data.map((element, i) => (<div key={i}>
              <ReviewContainer onClick={() => {
                setTarget(element);
                setShowModal(true);
            }}>
                <ReviewComment>
                  {maxCharString(element.comment, 130)}
                </ReviewComment>
                <ReviewInfo>
                  <div>
                    <h4>{element.customer.name}</h4>
                    <p>{dateConverter(element.date).date}</p>
                  </div>
                  {element.archived !== true ? <ArchiveButton archived onClick={() => onClickArchiveHandler(element)}>Archive</ArchiveButton> : ""}
                  {element.archived ? <ArchiveButton unarchived onClick={() => onClickArchiveHandler(element)}>Unarchive</ArchiveButton> : ""}
                </ReviewInfo>
              </ReviewContainer>
            </div>))}
        </ReviewSlider>
        <Modal mode="moreInfo" page={"contacts"} setShowModal={setShowModal} showModal={showModal} target={target}/>
             
        </>);
};
