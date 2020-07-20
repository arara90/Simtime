import * as Colors from "../../Colors";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// const StyledContent = (props) => {
//   const commonStyle = css`
//     color: ${(props) => Colors[props.color]};
//     font-size: ${(props) => props.fontSize};
//   `;

//   switch (props.type) {
//     case "a":
//       return styled.a`
//         ${commonStyle}
//         color: ${Colors.TEXT_LINK};
//         &:link {
//           color: ${Colors.TEXT_LINK};
//         }
//         &:hover {
//           color: ${Colors.TEXT_ACTIVE};
//         }
//         &:visited {
//           color: ${Colors.TEXT_VISITED};
//         }
//       `;

//     case "span":
//       return styled.span`
//         ${commonStyle}
//       `;

//     case "tag":
//       return styled.span`
//         color: ${Colors.ST_GRAY};
//         font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
//         text-decoration: underline;
//       `;

//     case "button":
//       return styled.span`
//         ${commonStyle}
//         text-decoration: underline;
//       `;

//     default:
//       return styled.span`
//         ${commonStyle}
//       `;
//   }
// };

// const StyledText = (props) => {
//   const { type, src } = props;
//   const Content = StyledContent(props);

//   const renderText = () => {
//     switch (type) {
//       case "a":
//         return <Content href={src} {...props}></Content>;
//       default:
//         return <Content {...props}></Content>;
//     }
//   };

//   return renderText();
// };

const SP = styled.span``


const Paragaph = (props) => {
  return <SP {...props}></SP>
}

export default React.memo(Paragaph);

Paragaph.propTypes = {
  type: PropTypes.oneOf(["a", "span", "tag", "button"]),
  src: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
};

Paragaph.defaultProps = {
  type: "span",
  src: "http://localhost:8080/",
  color: "TEXT",
  fontSize: "13px",
};
