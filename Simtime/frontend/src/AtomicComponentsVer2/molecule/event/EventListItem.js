import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

import HeartIcon from "../../atom/icons/HeartIcon"
import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import StatusButton from "../../atom/buttons/StatusButton"
import ImageUser from "../../../AtomicComponents/A-Atomics/ImageUser"
import Tag from "../../atom/fonts/Tag"

const EventList = styled.li`
    min-width: 245px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    border-top: solid 1px ${Colors.MAIN_COLOR};
   
    &:hover{
        background-color: ${Colors.MAIN_COLOR_LIGHT}
    }
`

const Header = styled.header`
    width: 96%; 
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
`

const Title = styled.strong`
    color: ${Colors.TEXT};
    flex: 1;
    font-size: 18px;
`

const Like = styled(StatusButton)`
    width: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.a`
    flex: 1;
    width: 96%;
    padding-left: 10px;

    display: flex;
    flex-direction: row;
`

const Host = styled(ImageUser)`
    margin: auto 10px 1em 0px;
    max-width: 45px;
    max-height: 45px;
`

const EventDesc = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    min-width: 0px;
`
const Address = styled.address`
    height: 20px;
    margin-bottom: 2px;
`

const Time = styled.time`
    height: 20px;
    margin-bottom: 2px;
`

const Tags = styled(Tag)`
    color: ${Colors.TEXT_TAG};
`

function EventListItem(props) {
    const {id, title, location, time, tags, host, like, join} = props.event;
    return (
        <EventList {...props} className='list-event-item'>
            <Header>
                <a href="#"><Title> {join? <CheckCircleIcon />: null} {title} </Title></a>
                <Like selected={like} color="ST_PINK"><HeartIcon /></Like>
            </Header>
            <Content href="#" className="event-list-content">
                <Host url={host.url}/>
                <EventDesc>
                    <Address>{location.name}</Address>
                    <Time>{time}</Time>
                    <Tags>{tags.map((tag)=> {return '#'+tag+" "})}</Tags>
                </EventDesc>
            </Content>
        </EventList>
    )
}

export default EventListItem

EventListItem.propTypes = {
    event: PropTypes.object,
    // id: PropTypes.string,
    // title: PropTypes.string,
    // location: PropTypes.object,
    // time: PropTypes.string,
    // tags: PropTypes.array,
    // host: PropTypes.object,
    // like: PropTypes.bool,
    // join: PropTypes.bool
  };

EventListItem.defaultProps = {
    event: {
        id: "0",
        title: "Simtime Test",
        location: {name:"작업실(우리집)", address:"경기도 부천시"},
        time: "PM 19:00",
        tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
        host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
        like: null,
        join: null,
    }
  };
  