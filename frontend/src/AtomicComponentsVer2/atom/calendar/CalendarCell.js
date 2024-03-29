import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";


const Wrap = styled.div`
  min-height: 2em;
  overflow: hidden;
  border: solid 1px  ${Colors.BG_INACTIVE_LIGHT};

  background-color: ${(props) => (props.isActive ? ( props.isActiveMonth ? Colors.BG_WHITE : Colors.BG_INACTIVE_LIGHT) : Colors.BG_INACTIVE)};
  ${(props) => (props.isToday ? `background-color: ${Colors.MAIN_COLOR_LIGHT};` : "")}

  & .check{
    border-top-color: ${(props) => (props.isActive ? ( props.isActiveMonth ? Colors.BG_WHITE : Colors.BG_INACTIVE_LIGHT) : Colors.BG_INACTIVE)};
    border-right-color: ${(props) => (props.isActive ? ( props.isActiveMonth ? Colors.BG_WHITE : Colors.BG_INACTIVE_LIGHT) : Colors.BG_INACTIVE)};

    ${(props) => (props.isToday ? `border-top-color:${Colors.MAIN_COLOR_LIGHT};` : "")}
    ${(props) => (props.isToday ? `border-right-color: ${Colors.MAIN_COLOR_LIGHT};` : "")}
  }

  &:hover{
    ${(props) => (props.isActive ? `
    //border: solid 1px  ${Colors.MAIN_COLOR};
    background: ${Colors.MAIN_COLOR}95;` : null )}
    outline: none;

    .check{
      ${(props) => (props.isActive ? `
      border-top-color: ${Colors.MAIN_COLOR}95;
      border-right-color: ${Colors.MAIN_COLOR}95;
      ` : null )}
    }
  }



 
`

function CalendarCell(props) {
  const {isSelected, isActiveMonth, isToday, isActive } = props;

    return (
        <Wrap {...props}>
          {props.children}
        </Wrap>
    )
}

export default CalendarCell

CalendarCell.propTypes = {
  isSelected: PropTypes.bool, 
  isActiveMonth: PropTypes.bool, 
  isToday: PropTypes.bool, 
  isActive: PropTypes.bool, 
  };

CalendarCell.defaultProps = {
  isSelected: null, 
  isActiveMonth: null, 
  isToday: null, 
  isActive: null,
  color: "ST_WHITE"
  };
  