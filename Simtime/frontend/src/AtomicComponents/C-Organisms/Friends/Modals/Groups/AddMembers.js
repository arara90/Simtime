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
  const { friends, selectedGroup, members } = props;
  const [field, setField] = useState("Username");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const groupMembers = members.reduce(
    (acc, member) => ({
      ...acc,
      [member.relationship.id]: member.relationship.id,
    }),
    {}
  );

  var newCandts = friends.reduce((acc, friend) => {
    if (!groupMembers[friend.id])
      //friends.id는 relationshipId / friends.friend.id = accountId ..friends 리덕스명 변경 필요
      acc.push({ ...friend.friend, id: friend.id });
    return acc;
  }, []);

  //검색대상-현재 그룹에 속하지 않은 친구들 {id: 92, friend: {…}, subscribe: true, dispatch: true}
  const [candidates, setCandidates] = useState(newCandts);
  //키워드서치로 필터링된 친구들 -(검색결과 테이블에 보여질 목록)
  const [candidatesToDisplay, setCandidatesToDisplay] = useState([]);

  var fieldMap = {
    Username: "username",
    "E-mail": "email",
    Phone: "phone",
  };

  // useEffect(() => {
  //   console.log("useEffect setCandidatesToDisplay", candidates);
  //   // searchHandler(keyword);
  //   setCandidatesToDisplay(
  //     candidates.filter((candidate) => !selectedFriends.includes(candidate.id))
  //   );
  // }, [JSON.stringify(candidates)]);

  const handleOptionChange = (option) => {
    console.log(option);
    setField(option);
  };

  //필터링
  const searchHandler = (keyword) => {
    if (keyword.length == 0) {
      console.log("none");
      setCandidatesToDisplay(candidates);
    } else {
      //filtering
      console.log("filter전 candidate", candidates);
      var indexField = fieldMap[field];

      var filtered = candidates.reduce((acc, candidate) => {
        if (candidate[indexField].includes(keyword)) acc.push(candidate);
        return acc;
      }, []);

      console.log("filtered", filtered);

      setCandidatesToDisplay(filtered);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    var groupId = props.selectedGroup.group.id;

    try {
      //보낼 데이터 생성 { relationship: 95, group: 88 }
      var payload = selectedFriends.map((relationshipId) => {
        return { relationship: relationshipId, group: groupId };
      });

      //서버에 post 요청

      var res = await props.addToGroup(payload);
      setSelectedFriends([]);
      //candidates, candidatesToDisplay에 반영
      var newList = (prevList) => {
        return prevList.filter(
          (candidate) => !selectedFriends.includes(candidate.id)
        );
      };

      console.log("newList(candidates)", newList(candidates));
      setCandidates(newList(candidates));
    } catch (err) {
      console.log("addToGroupError", err);
    }
  };

  return (
    <Wrap>
      <SearchWrap>
        <SearchBar
          handleOptionChange={handleOptionChange}
          searchHandler={searchHandler}
          datas={candidates}
          options={Object.keys(fieldMap)}
          dafaultOption={field}
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

      <Button onClick={(e) => submitHandler(e)}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  members: state.groups.selectedGroup.members,
  selectedGroup: state.groups.selectedGroup,
  friends: state.friends.friends,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
