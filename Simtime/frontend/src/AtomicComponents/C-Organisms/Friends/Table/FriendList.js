import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableRow from "../../../A-Atomics/Table/TableRow";
import Paragraph from "../../../A-Atomics/Font/Paragraph";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";
import ButtonWithImage from "../../../B-Molecules/Button/ButtonWithImage";

const buttonMargin = 10;
const buttonsWidth = 160 + 8; //"삭제"-26px, "수신차단" or 차단-52 , bittonMargin * 버튼수 => 26 +104 + 30
const buttonDefaultSize = 13 * 4 + 2; //4글자기준

const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

const Buttons = styled.div`
  width: ${buttonsWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ButtonWrap = styled.div`
  ${(props) => (props.width ? "width: " + props.width : "")};
`;

const TextButton = styled(Paragraph)`
  // border: solid 1px red;
  margin-left: ${buttonMargin}px;
  cursor: pointer;
`;

const StyledButtonWithImage = styled(ButtonWithImage)`
  // border: solid 1px red;
  margin-left: ${buttonMargin}px;
`;

function FriendList(props) {
  const renderButton = useCallback(
    (status, content = "차단", color = "TEXT_LINK") => {
      if (!status) {
        return (
          <ButtonWrap width={buttonDefaultSize + buttonMargin + 2 + "px"}>
            <StyledButtonWithImage
              width="auto"
              imgurl="https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/check.png"
              imgLocation="right"
            >
              차단
            </StyledButtonWithImage>
          </ButtonWrap>
        );
      } else {
        return (
              <ButtonWrap>
                <TextButton color={color} type="button">
                  {content}
                </TextButton>
              </ButtonWrap>
            );
      }

    },
    []
  );

  const renderRows = (friends = []) => {
    return friends.map((data, index) => {
      return (
        <TableRow rowNum={index} key={data.friend.username}>
          <UserCard
            username={data.friend.username}
            imageSize="32px"
            url={data.friend.profile_image}
          ></UserCard>
          <Buttons>
            {renderButton(!data.friend.subscribe, "수신차단")}
            {renderButton(!data.friend.dispatch, "발신차단")}
            {renderButton(1, "삭제", "TEXT_WARNING")}
          </Buttons>
        </TableRow>
      );
    });
  };

  return <div>{renderRows(props.datas)}</div>;
}

export default FriendList;

FriendList.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  datas: PropTypes.array,
};

FriendList.defaultProps = {
  title: "Table Title",
  headers: null,
  datas: [],
 
};