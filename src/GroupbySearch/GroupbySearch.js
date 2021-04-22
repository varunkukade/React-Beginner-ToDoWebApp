import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../Store/actions";

import classes from "./GroupbySearch.css";

const groupbySearch = (props) => {
  return (
    <div className={classes.GroupbySearch}>
      <div>
        <p>Group By</p>
        <select
          name="dropdown"
          className={classes.Groupby}
          onChange={(event) => props.changedFun(event.target.value)} //here event means what groupby is selected is passed to state in redux store.
        >
          <option value="None">None</option>
          <option value="Created On">Created On</option>
          <option value="Pending On">Pending On</option>
          <option value="Priority">Priority</option>
        </select>
      </div>
      <div style={{ width: "100%" }}>
        <p style={{ marginLeft: "50px" }}>Search</p>
        <input
          type="text"
          className={classes.SearchBar}
          placeholder="Search Tasks"
          onChange={(event) => props.searchedFun(event.target.value)} //here event i.e what user has searched is passed to state in redux;
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groupBy: state.groupBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changedFun: (event) =>
      dispatch({ type: actionTypes.CHANGED_FUN, event: event }),
    searchedFun: (event) =>
      dispatch({ type: actionTypes.SEARCHED_FUN, event: event }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(groupbySearch);
