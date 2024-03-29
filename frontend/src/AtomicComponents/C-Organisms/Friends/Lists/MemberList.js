import React, { useCallback, useEffect, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Table from "../../../B-Molecules/Table/Table";
import TableRow from "../../../A-Atomics/Table/TableRow";
import Paragraph from "../../../A-Atomics/Font/Paragraph";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";
import { deleteMember } from "../../../../redux/actions/groups";
import { addToGroup } from "../../../../redux/actions/friends"

const buttonMargin = 10;
const buttonsWidth = 160 + 8; //"삭제"-26px, "수신차단" or 차단-52 , bittonMargin * 버튼수 => 26 +104 + 30
const buttonDefaultSize = 13 * 4 + 2; //4글자기준

const Wrap = styled.div`
  height: ${(props) => props.height};
  width: 100%;
`;

const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

const Buttons = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ButtonWrap = styled.div`
  ${(props) => (props.width ? "width: " + props.width : "")};
`;

const TextButton = styled(Paragraph)`
  margin-left: ${buttonMargin}px;
  cursor: pointer;
`;

function MemberList(props) {
  const { selectedGroupMembers } = props;
  // console.log('selectedGroupMembers', selectedGroupMembers)

  // const selectedGroupMembers = selectedGroupMembers.reduce(
  //   (acc, item) => [
  //     ...acc,
  //     {
  //       friendId: item.id,
  //       username: item.username,
  //       profile_image: item.profile_image,
  //     },
  //   ],
  //   []
  // );

  const renderButton = useCallback((fn) => {
    return (
      <ButtonWrap>
        <TextButton
          color={"ST_RED"}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            fn();
          }}
        >
          삭제
        </TextButton>
      </ButtonWrap>
    );
  }, []);

  const renderRows = (friends = []) => {
    // console.log('friends', friends)
    return friends.map((data, index) => {
      return (
        <TableRow rowNum={index} key={data.FGmapId}>
          <UserCard
            username={data.friend.username}
            imageSize="32px"
            url={data.friend.profile_image}
          ></UserCard>
          <Buttons>
            {renderButton(() => {
              props.deleteMember(data.FGmapId);
            })}
          </Buttons>
        </TableRow>
      );
    });
  };

  return <Fragment>{renderRows(selectedGroupMembers)}</Fragment>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMember: (id) => dispatch(deleteMember(id)),
    addToGroup: (data) => dispatch(addToGroup(data)),
  };
};
// export default AddGroup;
export default connect(null, mapDispatchToProps)(MemberList);

MemberList.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  selectedGroupMembers: PropTypes.array,
};

MemberList.defaultProps = {
  title: "Table Title",
  headers: null,
  selectedGroupMembers: [{ id: 0, friendId: 0, username: "", profile_image: "" }],
};
