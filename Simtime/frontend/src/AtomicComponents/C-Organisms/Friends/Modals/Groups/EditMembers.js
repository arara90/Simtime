import React, { useState, Fragment, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { deleteMemebers } from "../../../../../actions/groups";

import { MAIN_COLOR } from "../../../../Colors";
import BasicModal from "../../../../B-Molecules/Modal/BasicModal";
import TabTable from "../../../../B-Molecules/Table/TabTable";
import ImageUser from "../../../../A-Atomics/ImageUser";
import Image from "../../../../A-Atomics/Image";
import Header from "../../../../A-Atomics/Font/Header";
import MemberList from "../../Lists/MemberList";
import AddMembers from "./AddMembers";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Group = styled.div`
  width: 100%;
  height: 25%;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GroupImage = styled(ImageUser)`
  position: relative;
  height: 60px;
  width: 60px;
  margin-bottom: 10px;
  border-radius: 10px 10px 10px 10px;
`;

const AddImage = styled(Image)`
  position: absolute;
  height: 20px;
  width: 20px;
  bottom: -5px;
  right: -5px;
  border-radius: 10px 10px 10px 10px;
`;

const GroupName = styled(Header)`
  position: initial;
  height: 20px;
  width: auto;
  text-align: center;
`;

const Table = styled(TabTable)`
  height: 75%;
`;

function EditMembers(props) {
  const buttons = [
    { content: "Members", urk: null },
    {
      content: "Add",
      url:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/add-yellow.png",
    },
  ];

  const [tab, setTab] = useState(buttons[0].content);

  // const friends = props.selectedGroup.members.reduce(
  //   (acc, item) => [
  //     ...acc,
  //     {
  //       id: item.RGmapId,
  //       relationshipId: item.relationship.id, //relationshipid
  //       friendId: item.relationship.friend.id,
  //       username: item.relationship.friend.username,
  //       profile_image: item.relationship.friend.profile_image,
  //     },
  //   ],
  //   []
  // );

  return (
    <BasicModal title="Edit Group">
      <Wrap className="EditMembersWrap">
        <Group>
          <GroupImage
            height="60px"
            width="60px"
            url={
              "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/group_basic.png"
            }
          >
            {/* // urk={props.selectedGroup.group.profile_image}> */}
            <AddImage
              src={
                "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/add-yellow.png"
              }
            />
          </GroupImage>
          {/* <GroupName type="h3">{props.selectedGroup.group.groupname}</GroupName> */}
          <GroupName>helo</GroupName>
        </Group>
        <Table
          button={tab != "Members"}
          buttons={buttons}
          changeHandler={(tab) => setTab(tab)}
        >
          {/* {tab == "Members" ? <MemberList datas={friends} /> : <AddMembers />} */}
          <AddMembers />
        </Table>
      </Wrap>
    </BasicModal>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  // selectedGroup: state.groups.selectedGroup,
});

export default connect(mapStateToProps, { deleteMemebers })(EditMembers);
