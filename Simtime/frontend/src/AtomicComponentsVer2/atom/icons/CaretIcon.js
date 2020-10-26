// caret-up
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faCaretUp as solid} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CaretIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
CaretIcon.propTypes = {
  };
CaretIcon.defaultProps = {
  };