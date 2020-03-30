import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const types = {
  A: styled.a`
    font-size: 16px
    &:link {
      color: #32c5ff;
    }
    &:hover {
      color: #ff3300;
    }
    &:visited {
      color: #32c5ff;
    }
  `,

  NORMAL: styled.span`
    color: #444444
    font-size: 16px`,

  COLORED: styled.span`
  color: #6236ff
  font-size: 16px `,

  ETC: styled.div``
};

const StyledText = props => {
  const { type, src } = props;

  const Content = types[props.type];
  const renderText = () => {
    switch (props.type) {
      case "A":
        return <Content href={src} {...props}></Content>;
      case "NORMAL":
        return <Content {...props}></Content>;
      case "ETC":
        return <Content {...props}></Content>;
      default:
        return <Content {...props}></Content>;
    }
  };

  return renderText();
};

export default StyledText;

StyledText.propTypes = {
  type: PropTypes.oneOf(["A", "NORMAL", "COLORED", "ETC"]),
  src: PropTypes.string
};

StyledText.defaultProps = {
  type: "NORMAL",
  src: "http://localhost:8080/"
};
