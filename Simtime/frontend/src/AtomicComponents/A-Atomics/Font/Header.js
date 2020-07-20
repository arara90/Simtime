import * as Colors from "../../Colors";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// const { type, src } = props;

//   const styledContent = (props) => {
//     const commonStyle = `
//       color: ${Colors[props.color]};
//       font-size: ${props.fontSize ? props.fontSize : ""};
//       ${props.height ? "height: " + props.height + ";" : ""}
//     `;

//     switch (props.type) {
//       case "h1":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 700;
//           font-size: ${props.fontsize ? props.fontSize : "36px"};
//         `;

//       case "h2":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 700;
//           font-size: ${props.fontSize ? props.fontSize : "24px"};
//         `;

//       case "h3":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 600;
//           font-size: ${props.fontSize ? props.fontSize : "18px"};
//         `;

//       case "h4":
//         return styled.span`
//           ${commonStyle}
//           font-weight: 500;
//           font-size: ${props.fontSize ? props.fontSize : "15px"};
//         `;

//       default:
//         return styled.span`
//           ${commonStyle}
//           font-size: ${props.fontSize ? props.fontSize : "15px"};
//         `;
//     }
//   };

//   const Content = styledContent(props);

//   const renderText = () => {
//     switch (type) {
//       case "a":
//         return <Content href={src} {...props}></Content>;
//       default:
//         return <Content {...props}></Content>;
//     }
//   };


const HT = styled.h4``

const Header = (props) => {
  const { type, src } = props;

  return (<HT {...props}></HT>)
};

export default Header;

Header.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  src: PropTypes.string,
  color: PropTypes.string,
};

Header.defaultProps = {
  type: "h1",
  src: "http://localhost:8080/",
  color: "TEXT",
};
