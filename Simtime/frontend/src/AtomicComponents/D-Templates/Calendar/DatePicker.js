import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import Week from "../../C-Organisms/Calendar/Week";
import Paragraph from "../../A-Atomics/Font/Paragraph";
import Image from "../../A-Atomics/Image";
import {  generate, getStrFullDate } from "./Generator";
import { MAIN_COLOR, ST_SEMI_GRAY,ST_SEMI_YELLOW } from "../../Colors";

// cal_prev_page = [0]; -현재(오늘)로부터 과거로 load한 page
// cal_next_pate = [0]; -현재(오늘)로부터 미래로 load한 page

const Wrap = styled.div`
  width: 286px;
  height: 360px;
  padding-top: 5px;
  padding-bottom: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
`;

const MonthWrap = styled.div`
  width: 100%;
  height: 36px;

  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
`;

const Arrow = styled(Image)`
  opacity: 0.75;
`;

const Month = styled(Paragraph)`
  font-weight: 500;
`;

const DayWrap = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  overflow: hidden;
  border-bottom: dashed 1px ${ST_SEMI_GRAY};
`;

const CalendarWrap = styled.div`
  width: 100%;
  height: 260px;
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  overflow: hidden;
`;

function DatePicker(props) {
  const [curr, setCurr] = useState(props.currDate);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["January", "February", "March", "April","May","June","July","August","September","October"  ,"November" ,"December"];
  
  const nextMonth = () =>{
    setCurr(new Date(curr.getFullYear(), curr.getMonth()+1, 1));
  }
  const prevMonth = () =>{
    var today = getStrFullDate(new Date(), "yyyymmdd").substr(0,6);
    var yyyymm = getStrFullDate(curr, "yyyymmdd").substr(0,6);
    
    if(yyyymm > today){
      setCurr(new Date(curr.getFullYear(), curr.getMonth()-1, 1));
    }
  }

  //요일
  const renderDay = () => {
    return days.map((day, index) => {
      return (
        <Paragraph key={day} color="ST_GRAY">
          {day}
        </Paragraph>
      );
    });
  };

  //일자
  const renderWeek = (curr) => {
    var dates = generate(curr,0);
    console.log(dates)
    return dates.map((week, index) => {
      return (
        <Week
          key={week.id}
          id={week.id}
          isDatePicker={true}
          weekDates={week.weekDates}
          selectDate={props.selectDate}

        />
      );
    });
  };

  return (
    <Wrap>
      <MonthWrap>
        <Arrow
          width="10px"
          height="10px"
          src="static/img/icons/left-arrow.png"
          onClick={prevMonth}
        />
        <Month fontSize="14px" color="TEXT">
          {`${months[curr.getMonth()]} ${curr.getFullYear()}`}
        </Month>
        <Arrow
          width="10px"
          height="10px"
          src="static/img/icons/right-arrow.png"
          onClick={nextMonth}
        />
      </MonthWrap>
      <DayWrap>{renderDay()}</DayWrap>
      <CalendarWrap>{renderWeek(curr)}</CalendarWrap>
    </Wrap>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  selectedDate: PropTypes.string,
};

DatePicker.defaultProps = {
  currDate: new Date(),
  height: "98%",
  width: "98%",
  selectedDate: "0D", //context로 해보자
};
