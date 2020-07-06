import React, { useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Table from "../../Table/Table";
import SelectTable from "../../Table/SelectTable";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";

const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

function ResultTable(props) {
  return (
    <Table
      title={props.title}
      titleColor={props.titleColor}
      width="100%"
      rowNum={props.rowNum}
    >
      <SelectTable></SelectTable>
    </Table>
  );
}

export default ResultTable;

ResultTable.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  rowNum: PropTypes.number,
  datas: PropTypes.array,
};

ResultTable.defaultProps = {
  title: "Table Title",
  titleColor: "MAIN_COLOR",
  rowNum: 3,
  // datas: null,
  datas: [
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/user-basic.png",
      username: "arara",
    },
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/user-basic.png",
      username: "arara90",
    },
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/add-yellow.png",
      username: "hello",
    },
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/arrow-down.png",
      username: "hey",
    },
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/user-basic.png",
      username: "parkh",
    },
    {
      profile_image:
        "https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/check-valid.png",
      username: "admin",
    },
  ],
};
