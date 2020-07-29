import "babel-polyfill";
import React, { Fragment, useState, createRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { searchUsers } from "../../../../actions/account";
// component
import { MAIN_COLOR } from "../../../Colors";
import SelectBoxRef from "../../../A-Atomics/Filter/SelectBoxRef";
import Search from "../../../B-Molecules/Filter/Search";
import ResultTable from "../ResultTable";

const SearchWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px ${MAIN_COLOR};
`;

const StyledSelectBox = styled(SelectBoxRef)``;

const StyledSearch = styled(Search)`
  margin-left: 5px;
`;

const ResultWrap = styled.div`
  width: 100%;
`;
const Result = styled(ResultTable)``;
const Groups = styled(ResultTable)``;

function SearchBar(props) {
  const {
    search,
    searchUsers,
    height,
    width,
    newFriends,
    friends,
    candidates,
    options,
    dafaultOption,
    desc,
    searchHandler,
  } = props;

  const selectRef = createRef();
  const searchRef = createRef();

  const handleOptionChange = (option) => {
    props.handleOptionChange(option);
    searchRef.current.focus();
  };

  return (
    <SearchWrap {...props}>
      <StyledSelectBox
        options={options}
        defaultOption={dafaultOption}
        width="102px"
        ref={selectRef}
        handleOptionChange={handleOptionChange}
      />

      <StyledSearch
        width="auto"
        desc={desc}
        height="25px"
        ref={searchRef}
        searchHandler={searchHandler}
        onlyEnter={newFriends ? true : false}
      />
    </SearchWrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  friends: state.friends.friends,
});
// export default SearchBars;
export default connect(mapStateToProps, { searchUsers })(SearchBar);

SearchBar.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  setResult: PropTypes.func,
};

SearchBar.defaultProps = {
  height: "40px",
  width: "320px",
  setResult: (res) => {
    console.log("SearchBar - Default setResult : ", res);
  },
};
