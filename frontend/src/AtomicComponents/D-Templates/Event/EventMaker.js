import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import PropTypes from "prop-types";

import {ModalContext} from "../../../contexts/modalContext"
import DefaultModal from "../../../AtomicComponentsVer2/molecule/modal/DefaultModal"
import Label from "../../../AtomicComponentsVer2/atom/forms/Label"
import InputColor from "../../../AtomicComponentsVer2/atom/forms/InputColor"
import InputImage from "../../../AtomicComponentsVer2/atom/forms/InputImage"
import CalendarEventLabel from "../../../AtomicComponentsVer2/molecule/calendar/CalendarEventLabel"

import Input from "../../B-Molecules/Form/Input";
import TextArea from "../../B-Molecules/Form/TextArea";
import InputTag from "../../B-Molecules/Form/InputTag";
import InputTime from "../../B-Molecules/Form/InputTime";
import DatePicker from "../../D-Templates/Calendar/DatePicker";
import SearchLocation from "../../C-Organisms/Event/Create/SearchLocation";

import { getStrFullDate, getFullTime } from "../Calendar/Generator";
import { getEvent, editEvent } from "../../../redux/actions/events";

import * as Colors from "../../Colors"

const ContentWrap = styled.form``
const PageWrap = styled.div`
  overflow: hidden;
  height: 26em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MyInput = styled(Input)`margin-bottom: 15px;`;
const MyTextArea = styled(TextArea)` margin-bottom: 15px;`;
const MyInputTime = styled(InputTime)`margin-bottom: 15px;`;
const MyDateInput = styled(Input)`margin-bottom: 15px;`;
const PositionWrap = styled.div`
  width: 100%;
  position: relative;
`;
const MyDatePicker = styled(DatePicker)`
  ${(props) =>
    props.isShown
      ? `  
      width: 100%;
      background-color: white;
      position: absolute;
      top: 45px;
      right: 0px;`
      : "display: none;"}
`;

const ColorLabel = styled(Label)`
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 38px; 
}
`
//height는 CalendarEventLabel의 button크기

const MyInputColor = styled(InputColor)`
    z-index: 9;
    width: 80%;
    opacity: 0;
`

const MyCalendarEventLabel = styled(CalendarEventLabel)`
  position: absolute;
  width: 80%;
  top:0;
  right: 0;
`

const ImageLabel = styled(Label)`
    display: flex;
    flex-direction: column;
}
`

const MyInputImage = styled(InputImage)`
  color : ${Colors.TEXT};
`


function EventMaker(props) {
  // const palette = Object.values(Colors.Palette);
  // const getColor = (palette)=> palette[Math.floor(Math.random() * palette.length)]
  const {closeContextModal } = React.useContext(ModalContext);
  const {closeModal, user, editEvent, eventSubmitHandler, invitation, isEdit, selectedDate} = props;
  const today = new Date();


  //states
  const [datePicker, setDatePicker] = useState(false);
  const [name, setName] = useState(isEdit ? invitation.event.event_name : "");
  const [date, setDate] = useState(isEdit ? invitation.event.event_date : selectedDate);
  const [time, setTime] = useState(isEdit ? invitation.event.event_time : "");
  const [place, setPlace] = useState(isEdit ? invitation.event.event_place : {});
  const [message, setMessage] = useState(isEdit ? invitation.event.message :"");
  const [color, setColor] = useState( isEdit ? invitation.event.color : "");
  const [imgFile, setImgFile] = useState(isEdit? invitation.event.photo :null); //파일

  // //not yet
  const [tags, setTags] = useState([]);
  const [fontColor, setFontColor] = useState();


  const [event, setEvent] = useState({});

  useEffect(()=>setEvent({...event, event_name: name}),[name]);
  useEffect(()=>setEvent({...event, event_date: date}),[date]);
  useEffect(()=>setEvent({...event, event_time: time}),[time]);
  useEffect(()=>setEvent({...event, event_place: place}),[place]);
  useEffect(()=>setEvent({...event, message: message}),[message]);
  useEffect(()=>setEvent({...event, color: color}),[color]);
  useEffect(()=>setEvent({...event, tags: tags}),[tags]);
  useEffect(()=>{setEvent({...event, photo: imgFile})},[imgFile]);

  useEffect(()=>{
    const initEvent = {
      event_name: name,
      event_date: getStrFullDate(today, "yyyy-mm-dd"),
      event_time: time, //14:00 PM
      event_place: place,
      tags: tags,
      message: message,
      host: user.id,
      photo: imgFile
    }

    setEvent(isEdit? {id: invitation.event.id } : initEvent)
  },[]);


  const showDatePicker = () => setDatePicker(!datePicker);
  const hadleSubmit = async () => {
    // e.preventDefault();
    // e.stopPropagation();

    var fin_time = time
    if(time.split(' ')[1] == "PM" && time.split(':')[0] < 13){
      fin_time = (parseInt(time.split(':')[0]) + 12).toString() +":"+ time.split(':')[1]
    } 

    if(isEdit){
      try{
        var newEvent = {...event, 'event_date': date, 'event_time': fin_time}
        // var invitation = invitation

        console.log(newEvent, invitation)

        var resStatus = await editEvent(newEvent, invitation); 
        if(resStatus=='200') {
          closeContextModal()
          closeModal() //modal 변경
        }
      }catch(e){
        console.log("Error", e); 
      }
    }else{
      eventSubmitHandler({...event, 'event_time': fin_time} , imgFile)
    }
  };


  //changeHandlers
  const nameChange = useCallback((e) => setName(e.target.value));
  const placeChange = useCallback((place) => setPlace(place));
  const changeDate = useCallback((strDate) => setDate(strDate));
  const changeTags = useCallback((tags) => setTags(tags));
  const changeTime = useCallback((time) => setTime(time));

  //pages
  const firstPage = () => {
    return (
      <PageWrap {...props} >
        <MyInput label="Event" name="eName" desc="Event Name" value={name} onChange={nameChange} />
        <PositionWrap>
          <MyDateInput name="eDate" label="Date" desc={date} value={date} readOnly={true} cursor="pointer" onClick={showDatePicker} />
          <MyDatePicker isShown={datePicker} selectDate={changeDate} selectedDate={date} onClose={()=>{setDatePicker(false);}} />
        </PositionWrap>
        <MyInputTime name="eTime" label="Time" cursor="pointer" changeTime={changeTime} time={time}/>
        <SearchLocation placeToEdit={isEdit?invitation.event.event_place:null} name="ePlace" onChange={placeChange} />
      </PageWrap>
    );
  };

  const secondPage = () => {
    return (
      <PageWrap {...props} >
        <MyTextArea label="Message" name="eMessage" value={message} desc="1000자 이내" height="200px" maxLength={1000}
          onChange={(e)=>setMessage(e.target.value)} />
        <InputTag changeTags={changeTags} label="Tag" name="eTag" desc="Tag 입력"></InputTag>
      </PageWrap>
    );
  };
  
  const thirdPage =() => {
    return (
      <PageWrap {...props}>
          <ColorLabel htmlFor ="LabelColor"> Color
            <MyInputColor value={color} changeHandler={setColor} type="color" name="LabelColor"/> 
            <MyCalendarEventLabel color={color}
             name={name || user.username}
             time={time}
             location={place.name}
             host={user}
          /> 
          </ColorLabel>
          <ImageLabel htmlFor ="imgFile"> Photo
            <MyInputImage handleImageFile={setImgFile} src={isEdit?invitation.event.photo:null}  />
          </ImageLabel>
      </PageWrap>
    );
  };


  return(
    //0128 <ContentWrap onSubmit={submitHandler} encType="multipart/form-data"> 
    // <ContentWrap onSubmit={submitHandler}>
      <DefaultModal
        title="New Event"
        pages={[firstPage(), secondPage(), thirdPage()]}
        handleSubmit={hadleSubmit}
        height="auto"
        closeModal={closeModal}
      />
    // </ContentWrap>
  )

}

const mapStateToProps = (state) => ({
  event: state.events.selectedEvent[0],
  user: state.auth.user,
  
});

const mapDispatchToProps = (dispatch)=> {
 return {
  // addEvent: (myEvent)=>dispatch(addEvent(myEvent)),
  getEvent: getEvent(),
  editEvent: (event, invitation)=>dispatch(editEvent(event, invitation)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaker);

// export default EventMaker;

EventMaker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  selectedDate: PropTypes.string,
  event: PropTypes.object,
  isEdit: PropTypes.bool
};

EventMaker.defaultProps = {
  // height: "568px",
  height: "548px",
  width: "320px",
  selectedDate: null,
  event: {},
  isEdit: false
};
