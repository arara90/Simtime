import React from 'react';
import styled, {css} from "styled-components";
import PropTypes from "prop-types";

import {MAIN_COLOR, TEXT, ST_BLUE} from "../../Colors";

import StatusButton from "../../atom/buttons/StatusButton"
import DetailTextRow from "../../atom/DetailTextRow"

import MapMarkerIcon from "../../atom/icons/MapMarkerIcon"
import ClockIcon from "../../atom/icons/ClockIcon"
import PeopleIcon from "../../atom/icons/PeopleIcon"
import HeartIcon from "../../atom/icons/HeartIcon"
import TextBox from "../../atom/TextBox"

import ImageUser from "../../atom/ImageUser"
import Map from "../../atom/Map"
import Tag from "../../atom/fonts/Tag"

const Wrap = styled.div`
    width: 100%;
    min-width: 245px;
    padding: 1em;
    color: ${MAIN_COLOR};
`

const Detail = styled.div`
    display: flex;
    height: 2em;

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
` 
const LikeButton = styled(StatusButton)`
  padding-right: 1px;
  padding-top: 0;
`

const Users = styled.ul`
    width: 100%;
    margin-top: 0.5em;
    padding: 0 1em 2px 1em;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    overflow-x: auto;       
    overflow-y: hidden;   

    &::-webkit-scrollbar {
        height: 6px;
      }
      

`
const UserList = styled.li`
    display: inline-block;
    margin-right: 0.5em;
    `
const StyledImageUser = styled(ImageUser)`
`




const IconStyle = css`
    color: ${MAIN_COLOR};
    margin-right: 1em;
`
const LocationIcon = styled(MapMarkerIcon)`${IconStyle}`
const TimeIcon = styled(ClockIcon)`${IconStyle}`
const ParticipantsIcon = styled(PeopleIcon)`${IconStyle}`


const Message = styled(TextBox)`
    margin-top: 1em;
`

const StyledTag = styled(Tag)``

function EventDetailContent(props) {
    const {location, time, participants, message, tags, like} = props;
    return (
        <Wrap className="event-detail">
            <Detail>
                <strong>Details</strong>
                <LikeButton color="ST_PINK" selected={like}><HeartIcon /></LikeButton>
            </Detail>
            <DetailTextRow as="time"><TimeIcon className="fa-fw"/>{time}</DetailTextRow>
            <DetailTextRow as="address"><LocationIcon className="fa-fw"/>{location.name}</DetailTextRow>
            <Users className="participants">
                <ParticipantsIcon className="fa-fw" />
                {participants.map((p)=>{
                return (
                    <UserList key={p.name}>
                        <StyledImageUser width="2em" height="2em" url={p.url}/>
                    </UserList>)
                })}
            </Users>
            <Map mapId="event-detail-map"/>
            <Message line={6}>{message}</Message>
            <StyledTag multiple line={2}> {tags.map((tag)=> {return '#'+ tag+" "})}</StyledTag>
        </Wrap>
    )
}

export default EventDetailContent

EventDetailContent.propTypes = {
    location : PropTypes.object,
    time: PropTypes.string,
    participants: PropTypes.array,
    message: PropTypes.string,
    tags: PropTypes.array,
    like: PropTypes.bool,
  };

EventDetailContent.defaultProps = {
    location : {name:"송내역 1호선", address:"부천시 송내대로39번길 14"},
    time: "2020/04/03 (월) PM 8:00 ",
    participants: [
        {name:"arara90", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        {name:"admin", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
        // {name:"arara901", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        // {name:"admin1", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
        // {name:"arara902", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        // {name:"admin3", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
        // {name:"arara903", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        // {name:"admin4", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
        // {name:"arara3", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        // {name:"admi", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
    ],
    message: "이것다.이것은 T니다.이것은 Test Message입니st MeMessage입니다.이것은 Test Message입니다.이것은 Test Message입니다.",
    tags: ["나이","tg1", "강1", "맥1", "tag", 
    "한강", "맥주", "나들이","tag1", "한강1", 
    "맥1주", "나1들이","한강3", "맥2주", 
    "나3들", "들이","한강3", "맥2주", 
    "3들이", "나1들이","강3", "주", 
    ],
    like: true
    
  };