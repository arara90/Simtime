import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteEvent, joinEvent } from "../../../../redux/actions/events"
// import {deleteInvitation} from "../../../../redux/actions/invitations"

import EventDetailHeader from "../../../molecule/event/EventDetailHeader"
import EventDetailContent from "../../../molecule/event/EventDetailContent"
import SolidButton from "../../../atom/buttons/SolidButton"
import TextButton from "../../../atom/buttons/TextButton"

import * as Colors from "../../../Colors";


const Wrap = styled.article`
  width: 100%;
  min-width: 245px;
  border : solid 1px ${Colors.MAIN_COLOR};

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0;

`

const Buttons = styled.footer`
  width: 96%;
  padding: 0.5em 1em 1em 1em;
  text-align: center;
`

const JoinButton = styled(SolidButton)`
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
`

const DeleteButton = styled(TextButton)``



function EventDetail(props) {
  const {isHost, invitation} = props;
  const {id, attendance, show, like, event} = invitation;
  const {event_name, event_date, tags, host} = event;

  const deleteHandler=(eventId, date)=>{
    props.deleteEvent(eventId, date);
    props.backHandler();
  }

  const joinHandler=(invitationId)=>{

  }
  return (
        <Wrap>
          <EventDetailHeader  host={host} event_name={event_name} tags={tags} backHandler={props.backHandler}/>
          <EventDetailContent {...event} like={like}/>
          <Buttons>
            <JoinButton color="ST_BLUE" >Join</JoinButton>
            {isHost && <DeleteButton color="ST_GRAY" onClick={() => deleteHandler(event.id, event_date)}>delete</DeleteButton>}
            {!isHost && <DeleteButton color="ST_GRAY" onClick={() => deleteHandler(event.id, event_date)}>hide</DeleteButton>}
          </Buttons>
        </Wrap>
    )
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (id,date) => dispatch(deleteEvent(id,date)),
    joinEvent: ()=>dispatch(joinEvent())
  };
};

export default connect(null, mapDispatchToProps)(EventDetail);


EventDetail.propTypes = {
  invitation: PropTypes.object,
  };

EventDetail.defaultProps = {
  invitation: {
    id:null, 
    attendance: false, 
    show:true, 
    like:false,
    event: {
      id: "0",
      event_name: "Simtime Test",
      event_place: {name:"작업실(우리집)", address:"경기도 부천시"},
      event_time: "PM 19:00",
      tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
  
      host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
    }


  },
 
  };
  