import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Table from "../NoneTables/Table/Table";
import PendingTable from "../NoneTables/PendingTable/PendingTable";
import CompletedTable from "../NoneTables/CompletedTable/CompletedTable";
import PriorityTable from "../PriorityTables/PriorityTable/PriorityTable";
import PriorityPendingTable from "../PriorityTables/PriorityPendingTable/PriorityPendingTable";
import CreatedOnPendingOnTable from "../CreatedOnTable/CreatedOnPendingOnTable";

class tabs extends Component {
  state = {
    selectedTab: "All ",
  };

  componentDidMount() {
    this.setState({ selectedTab: "All" }); //first time selected tab will go as "All" to createdOn table
  }

  //groupBy contains None or Priority or Pending On or Created On .
  render() {
    const props = {
      editBtnClickedFun: this.props.editBtnClickedFun,
      plusBtnClicked: this.props.plusBtnClicked,
      viewBtnClickedFun: this.props.viewBtnClickedFun,
      deleteBtnClickedFun: this.props.deleteBtnClickedFun,
      searchedFor: this.props.searchedFor,
    };
    let allTabTable = null;
    let pendingTabTable = null;
    if (this.props.groupBy === "None") {
      //if user select none render simple table and simple pending table
      allTabTable = <Table {...props} />;
      pendingTabTable = <PendingTable {...props} />;
    }

    if (this.props.groupBy === "Priority") {
      //if user selects priority then render table grouped by priority
      allTabTable = <PriorityTable {...props} />;
      pendingTabTable = <PriorityPendingTable {...props} />;
    }

    if (this.props.groupBy === "Created On") {
      //if user selects created on then render table grouped by created on
      allTabTable = (
        <CreatedOnPendingOnTable
          {...props}
          groupBy={this.props.groupBy}
          selectedTab={this.state.selectedTab}
        />
      );
      pendingTabTable = (
        <CreatedOnPendingOnTable
          {...props}
          selectedTab={this.state.selectedTab}
          groupBy={this.props.groupBy}
        />
      );
    }

    if (this.props.groupBy === "Pending On") {
      //if user selects Pending On then render table grouped by Pending On
      allTabTable = (
        <CreatedOnPendingOnTable
          {...props}
          groupBy={this.props.groupBy}
          selectedTab={this.state.selectedTab}
        />
      );
      pendingTabTable = (
        <CreatedOnPendingOnTable
          {...props}
          selectedTab={this.state.selectedTab}
          groupBy={this.props.groupBy}
        />
      );
    }

    return (
      <Tabs
        defaultActiveKey="All"
        id="uncontrolled-tab-example"
        onSelect={(selectedTab) => {
          this.setState({ selectedTab: selectedTab }); //this will render the tab component again.
        }}
      >
        <Tab eventKey="All" title="All">
          {allTabTable}
        </Tab>
        <Tab eventKey="Pending" title="Pending">
          {pendingTabTable}
        </Tab>
        <Tab eventKey="Completed" title="Completed">
          <CompletedTable {...props} />
        </Tab>
      </Tabs>
    );
  }
}

//connect tabs component to redux store
const mapStateToProps = (state) => {
  return {
    groupBy: state.groupBy,
    searchedFor: state.searchedFor,
  };
};

export default connect(mapStateToProps)(tabs);
