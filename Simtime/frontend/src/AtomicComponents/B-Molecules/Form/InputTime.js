import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useEffect,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "./Input";
import Paragraph from "../../A-Atomics/Font/Paragraph";
import SelectBox from "../../A-Atomics/Filter/SelectBox";
import SelectBoxRef from "../../A-Atomics/Filter/SelectBoxRef";
import { MAIN_COLOR, ST_GRAY, ST_SEMI_YELLOW } from "../../Colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const MyParagraph = styled(Paragraph)`
  widht: 28%;
`;

const InnerWrap = styled.div`
  width: ${(props) => (props.name ? "80%" : "100%")};
  height: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MyInput = styled.input`
  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }

  width: 30%;
  height: 100%;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
  padding-left: 5px;

  :focus {
    border: solid 1px ${MAIN_COLOR};
  }

  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
`;

const StyledSelectBox = styled(SelectBoxRef)``;

function InputTime(props) {
  const { width, height, label, name, value, cursor } = props;
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [meridiem, setMeridiem] = useState("AM");

  const hourRef = useRef();
  const minRef = useRef();
  const meridiemRef = useRef(); //meridiem

  // useEffect(() => {
  //   console.log(meridiemRef.current.state);
  // }, [meridiem]);

  const merHandleChange = (e, option) => {
    console.log("merHandleChange");
  };

  const handleChange = (e) => {
    e.preventDefault();
    var max = e.target.name == "hour" ? 24 : 59;

    var res = null;
    var hourAsParam = 0; //24시기준

    // 마지막 입력한 2개값 남기기  (queue?)
    var inputValue = parseInt(
      e.target.value.replace(/[^0-9]/g, "").substr(e.target.value.length - 2, 2)
    );

    //마지막 입력만 남기기
    var newValue = parseInt(
      e.target.value.substr(e.target.value.length - 1, 1)
    );

    if (e.target.name == "hour") {
      //시간
      if (inputValue <= max && inputValue >= 0) {
        //0~24 (범위내)
        res = inputValue;
        setHour(res);
        console.log(meridiem);

        if (meridiem == "PM") {
          hourAsParam = res < 12 ? res + 12 : res;
          console.log(hourAsParam);
        } else {
          //"AM"
          if (res == 12) hourAsParam = res - 12;
          else if (res > 12) setMeridiem("PM");
        }
      } else {
        res = newValue;
        setHour(res);
      } //범위 밖이면 마지막 입력만 남긴다.
    } else {
      //분
      if (inputValue <= max && inputValue >= 0) {
        res = inputValue;
        setMin(res);
      } else {
        res = newValue;
        setMin(newValue);
      }
    }

    // onChange(hourAsParam.toString() + ":" + minRef.current.value.toString());
  };

  return (
    <Wrap {...props}>
      {label && (
        <MyParagraph fontSize="18px" color="MAIN_COLOR">
          {label}
        </MyParagraph>
      )}
      <InnerWrap name={name}>
        <MyInput
          ref={hourRef}
          placeholder=""
          name="hour"
          value={("00" + hour).substr(("00" + hour).length - 2, 2)}
          onChange={handleChange}
        ></MyInput>
        :
        <MyInput
          ref={minRef}
          placeholder=""
          name="min"
          value={("00" + min).substr(("00" + min).length - 2, 2)}
          onChange={handleChange}
        ></MyInput>
        <StyledSelectBox
          width="60px"
          height="40px"
          options={["AM", "PM"]}
          defaultOption={meridiem}
          onChange={merHandleChange}
          ref={meridiemRef}
        />
        {/*

        <MySelectBox ref={meridiemRef}></MySelectBox> */}
      </InnerWrap>
    </Wrap>
  );
}

export default InputTime;

InputTime.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  cursor: PropTypes.string,
};

InputTime.defaultProps = {
  width: "100%",
  height: "40px",
  label: null,
  name: null,
  desc: null,
  value: "",
  readOnly: false,
  cursor: null,
};

// import React, { useState, useCallback, useRef, forwardRef } from "react";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import Input from "./Input";
// import Paragraph from "../../A-Atomics/Font/Paragraph";
// import SelectBox from "../../A-Atomics/Filter/SelectBox";
// import { MAIN_COLOR, ST_GRAY, ST_SEMI_YELLOW } from "../../Colors";

// const Wrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   height: ${(props) => props.height};
//   width: ${(props) => props.width};
// `;

// const MyParagraph = styled(Paragraph)`
//   widht: 28%;
// `;

// const InnerWrap = styled.div`
//   width: ${(props) => (props.name ? "80%" : "100%")};
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const MyInput = styled.input`
//   ::placeholder {
//     color: ${ST_GRAY};
//     font-size: 15px;
//     font-weight: 300;
//   }
//   width: 30%;
//   height: 100%;
//   border: solid 1px ${ST_SEMI_YELLOW};
//   border-radius: 6px;
//   padding-left: 5px;
//   :focus {
//     border: solid 1px ${MAIN_COLOR};
//   }
//   ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
// `;

// const MySelectBox = styled(SelectBox)``;

// function InputTime(props) {
//   const { width, height, label, name, value, cursor } = props;
//   const [hour, setHour] = useState("");
//   const [min, setMin] = useState("");

//   const hourRef = useRef();
//   const minRef = useRef();
//   const meridiemRef = useRef(); //meridiem

//   const handleChange = (e) => {
//     e.preventDefault();
//     var myValue = parseInt(
//       e.target.value.replace(/[^0-9]/g, "").substr(e.target.value.length - 2, 2)
//     );
//     var newValue = parseInt(
//       e.target.value.substr(e.target.value.length - 1, 1)
//     );

//     if (e.target.name == "hour") {
//       if (myValue <= 24 && myValue >= 0) setHour(myValue);
//       else setHour(newValue);
//       hourRef.current.focus();
//     } else {
//       if (myValue <= 59 && myValue >= 0) setMin(myValue);
//       else setMin(newValue);
//     }
//   };

//   return (
//     <Wrap {...props}>
//       {label && (
//         <MyParagraph fontSize="18px" color="MAIN_COLOR">
//           {label}
//         </MyParagraph>
//       )}
//       <InnerWrap name={name}>
//         <MyInput
//           placeholder=""
//           name="hour"
//           onChange={handleChange}
//           value={("00" + hour).substr(("00" + hour).length - 2, 2)}
//           ref={hourRef}
//         ></MyInput>
//         :
//         <MyInput
//           placeholder=""
//           name="min"
//           onChange={handleChange}
//           value={("00" + min).substr(("00" + min).length - 2, 2)}
//           ret={minRef}
//         ></MyInput>
//         <MySelectBox
//           width="60px"
//           height="40px"
//           options={["AM", "PM"]}
//         ></MySelectBox>
//       </InnerWrap>
//     </Wrap>
//   );
// }

// export default InputTime;

// InputTime.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
//   label: PropTypes.string,
//   name: PropTypes.string,
//   desc: PropTypes.string,
//   value: PropTypes.string,
//   readOnly: PropTypes.bool,
//   cursor: PropTypes.string,
// };

// InputTime.defaultProps = {
//   width: "100%",
//   height: "40px",
//   label: null,
//   name: null,
//   desc: null,
//   value: "",
//   readOnly: false,
//   cursor: null,
// };
