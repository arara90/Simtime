import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

// import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import CheckIcon from "../../atom/icons/CheckIcon"
import SolidButton from "../../atom/buttons/SolidButton"
import BorderButton from "../../atom/buttons/BorderButton"

import ImageUser from "../../atom/ImageUser"
import Tag from "../../atom/fonts/Tag"
import * as Colors from "../../Colors"

const palette = Colors.Palette;

const Wrap = styled.li`
    position: relative;
    width:100%;
    list-style-type : none;
`;

const Colored = styled(SolidButton)`
  border-radius: 0px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  font-size: 0.9em;
  line-height: 1.15em;
  padding: 1px 2px;
`

const Bordered = styled(BorderButton)`
  border-radius: 0px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  font-size: 0.9em;
  border-width: thin;

  line-height: 1.15em;
  padding: 0 2px;

  &:hover {
    // background-color: ${({color}) => Colors["MAIN_COLOR_LIGHT"]};
  }
`
// const Checked = styled(CheckIcon)`
//     position: absolute;
//     top: 50%;
//     right: 50%;
//     border-radius: 50%;
//     z-index: 99;
//     color: ${Colors["MAIN_COLOR"]}

//   `

const Checked = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 0;
  right: 0;

  z-index: 9;
  background-color: white;

  border: solid 5px ${Colors["ST_GREEN"]};
  border-top: solid 5px ${Colors["ST_WHITE"]};
  border-right: solid 5px ${Colors["ST_WHITE"]};
  `

const Host = styled(ImageUser)`
  width: 1.7em;
  height: 1.7em;
`

const Content = styled.div`
  flex: 1;
  min-width: 0px;
  margin-left: 4px;
  text-align: left;
`

const Title = styled.strong`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledTag = styled(Tag)`
  display: block;
  font-size: 0.8em;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  
`

function CalendarEventLabel(props) {
  const {solid, attendance, fontColor, color, name, time, location, tags, host} = props;
  const Button = solid ? Colored: Bordered ; 
  return (
      <Wrap {...props}>
        {attendance? <Checked className='check'/> : null}
        <Button fontColor={solid? fontColor: color} color={color}> 
          <Host url={host.profile_image} />
          <Content>
            <Title>{name}</Title>
            <StyledTag color={solid ? fontColor : color+"_DARK"}>
              {tags? tags.map((tag)=> {return '#'+tag+" "}) : time + " " + location}
            </StyledTag>
            {/* <StyledTag color={solid ? fontColor : color+"_DARK"}>{time} {location}</StyledTag> */}
          </Content>
        </Button>
      </Wrap>
  )
}

export default CalendarEventLabel

CalendarEventLabel.propTypes = {
  solid: PropTypes.bool,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  join: PropTypes.bool,
  title: PropTypes.string,
  tags: PropTypes.array,
  time: PropTypes.string,
  location: PropTypes.string,
  host: PropTypes.object
  };
  
CalendarEventLabel.defaultProps = {
  solid: null,
  color: palette[Math.floor(Math.random() * palette.length)],
  fontColor: "ST_WHITE",
  join: false,
  title: "Chickenkkkkk",
  time: "00:00 AM",
  location: "",
  tags: [],
  host: {
    profile_image: "https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg",
    id: "arara90"
  }
};