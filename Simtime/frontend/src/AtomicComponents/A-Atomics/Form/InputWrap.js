import React, { useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Paragraph from "../Font/Paragraph";
import {
  MAIN_COLOR,
  ST_GREEN,
  ST_GRAY,
  ST_RED,
  ST_SEMI_YELLOW,
  ST_GRAY_DARK,
  ST_SEMI_GRAY,
} from "../../Colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const MyParagraph = styled(Paragraph)`
  width: 20%;
`;

const MyInput = styled.input`
  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }

  width: ${(props) => (props.name ? "80%" : "100%")};
  height: 100%;
  padding-left: 5px;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;

  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)};

  &:focus {
    outline: none;
    border: solid 1px ${MAIN_COLOR};
  }

  &.valid-value {
    // border: solid 1px ${ST_GREEN};
    background-size: 18px;
    background-repeat: no-repeat;
    background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check-valid.png");
    background-position: 94% center;
  }

  &.invalid-value {
    border: solid 1px ${ST_RED};
  }

`;

function InputWrap(props) {
  const {
    children,
    width,
    height,
    label,
    name,
    desc,
    value,
    readOnly,
    cursor,
    innerRef,
    enterHandler,
  } = props;
  const [myValue, setMyValue] = useState(value);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    setMyValue(e.target.value);
  }, []);

  const handleKeyUp = useCallback((e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (e.key === "Enter") {
      enterHandler(e.target.value);
    }
  });

  const defaultInput = () => {
    return (
      <MyInput
        name={name}
        placeholder={desc}
        readOnly={readOnly}
        value={readOnly ? value : myValue}
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        cursor={cursor}
        ref={innerRef}
      ></MyInput>
    );
  };

  return (
    <Wrap {...props}>
      {label && (
        <MyParagraph fontSize="18px" color="MAIN_COLOR">
          {label}
        </MyParagraph>
      )}
      {children ? children : defaultInput()}
    </Wrap>
  );
}

export default React.forwardRef((props, ref) => (
  <InputWrap {...props} innerRef={ref} />
));
InputWrap.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  cursor: PropTypes.string,
  enterHandler: PropTypes.func,
};

InputWrap.defaultProps = {
  width: "100%",
  height: "3em",
  label: null,
  name: null,
  desc: null,
  value: "",
  readOnly: false,
  cursor: null,
  enterHandler: null,
};
