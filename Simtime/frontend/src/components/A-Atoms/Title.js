import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const levels = {
  "1": `font-size: 30px;`,
  "2": `font-size: 24px;`,
  "3": `font-size: 20px;`,
  "4": `font-size: 16px;`
};

const Title = styled.div`
  ${props => levels[props.level]}
  color: #444444;
`;

const StyledTitle = props => {
  return <Title {...props}></Title>;
};

StyledTitle.propTypes = {
  level: PropTypes.string
};

StyledTitle.defaultProps = {
  level: "2"
};

export default StyledTitle;
