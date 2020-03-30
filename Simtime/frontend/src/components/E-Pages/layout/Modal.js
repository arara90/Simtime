import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getEvent } from "../../actions/events";
import { EventForm } from "../invitations/EventForm";

const MyModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrap = styled.div`
  background: white;
  padding: 1rem;
  width: 400px;
  height: auto;
`;

const Modal = props => {
  return (
    <MyModal>
      <ContentWrap>
        {console.log("modal: ", props)}
        <EventForm {...props} />
        <button onClick={props.onClose}>닫기</button>
      </ContentWrap>
    </MyModal>
  );
};

const mapStateToProps = state => ({
  event: state.events.selectedEvent[0],
  user: state.auth.user
});

export default connect(mapStateToProps, { getEvent })(Modal);
