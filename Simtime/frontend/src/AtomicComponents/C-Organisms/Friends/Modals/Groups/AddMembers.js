import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ColoredButton from "../../../../A-Atomics/Button/ColoredButton";
import SelectedItem from "../../../../A-Atomics/Filter/SelectedItem";
import Paragraph from "../../../../A-Atomics/Font/Paragraph";
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";
import ResultTable from "../../ResultTable";

import { MAIN_COLOR } from "../../../../Colors";
import { addToGroup } from "../../../../../actions/groups";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchWrap = styled.div`
  width: 100%;
`;

const ResultWrap = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;
const Result = styled(ResultTable)``;

const Button = styled(ColoredButton)`
  margin-bottom: 5px;
`;

const MyItem = styled(SelectedItem)`
  height: 20px;
  white-space: nowrap;
`;

function AddMembers(props) {
  const { friends, selectedGroup } = props;

  const groupMembers = selectedGroup.members.reduce((acc, member) => ({...acc,[member.relationship.id]: member.relationship.id,}),{});
  const nonMembers = friends.filter((friend) => !groupMembers[friend.id]);  //검색대상-현재 그룹에 속하지 않은 친구들
  console.log('group members ' + groupMembers)
  //검색결과
  const [candidates, setCandidates] = useState([
    ...new Set(
      nonMembers.map((friend) => {
        return { ...friend.friend, id: friend.id };
      })
    ),
  ]);
  // const [nonMembers, setNonMembers] = useState([
  //   ...new Set(
  //     anonMembers.map((friend) => {
  //       return { ...friend.friend, id: friend.id };
  //     })
  //   ),
  // ]) 
  const [selectedFriends, setSelectedFriends] = useState([]);

  const clickEvent = async (e) => {
    e.preventDefault();
    var groupId = props.selectedGroup.group.id;
    try {
      var payload = selectedFriends.map((friendId) => {
        return { relationship: friendId, group: groupId };
      });
      var res = await props.addToGroup(payload)
      var newCandidates = candidates.filter((candidate) => !selectedFriends.includes(candidate.id))
      console.log('newCandidates', newCandidates)
      setCandidates(newCandidates);   

    } catch (err) {
      console.log("addToGroupError", err);
    }
  };

  return (
    <Wrap>
      <SearchWrap>
        <SearchBar
          search={setCandidates}
          candidates={candidates}
        />
      </SearchWrap>
      <ResultWrap>
        <Result
          multiple
          datas={candidates}
          width="100%"
          rowNum={5}
          selectHandler={setSelectedFriends}
        />
      </ResultWrap>

      <Button onClick={(e) => clickEvent(e)}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedGroup: state.groups.selectedGroup,
  friends: state.friends.friends,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
