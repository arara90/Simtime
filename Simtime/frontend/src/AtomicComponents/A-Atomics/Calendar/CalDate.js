import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Paragraph from "../Font/Paragraph";

const Text = styled(Paragraph)`
  font-weight: bold;
  line-height: ${(props) => props.contentHeight}px;
`;

function CalDate(props) {
  const { isActiveMonth, date, day, contentHeight } = props;

  const color = (day) => {
    if (day == 0) return "ST_RED";
    else if (day == 6) return "ST_BLUE";
    else return "TEXT";
  };

  return (
    <Text
      {...props}
      date={date}
      color={isActiveMonth ? color(day) : "ST_GRAY"}
      contentHeight={contentHeight}
    >
      {props.children}
    </Text>
  );
}

export default CalDate;

CalDate.propTypes = {
  contentHeight: PropTypes.string,
  day: PropTypes.number,
  isActiveMonth: PropTypes.bool,
};

CalDate.defaultProps = {
  contentHeight: "120px",
  day: 0,
  isActiveMonth: true,
};