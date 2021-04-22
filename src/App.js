import React, { Component } from "react";
import classes from "./App.css";
import Aux from "./hoc/Auxilliary";

import "bootstrap/dist/css/bootstrap.min.css";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import Modal from "./UI/Modal/Modal";
import Tabs from "./UI/Tabs/Tabs";

import GroupbySearch from "./GroupbySearch/GroupbySearch";
import TaskSummary from "./ModalTaskSummaries/TaskSummary/TaskSummary";
import EditTaskSummary from "./ModalTaskSummaries/EditTaskSummary/EditTaskSummary";

class App extends Component {
  state = {
    plusBtnClicked: false,
    editBtnClicked: false,
    viewBtnClicked: false,
    taskId: null,
    deleteBtnClicked: false,
  };

  backDropClickedFun = () => {
    //when backdrop or cancel button is clicked ,hide the modal .This applies to all the modals for plusBtn,editBtn,ViewBtn, DeleteBtn.

    if (this.state.plusBtnClicked) {
      this.setState({ plusBtnClicked: false, taskId: null });
    }

    if (this.state.editBtnClicked) {
      this.setState({ editBtnClicked: false, taskId: null });
    }
    if (this.state.viewBtnClicked) {
      this.setState({ viewBtnClicked: false, taskId: null });
    }
    if (this.state.deleteBtnClicked) {
      this.setState({ deleteBtnClicked: false, taskId: null });
    }
  };

  //show the modal when any of the edit,view plus or delete button is clicked.
  plusBtnClickedFun = () => {
    this.setState({ plusBtnClicked: true });
  };

  editBtnClickedFun = (id) => {
    this.setState({ plusBtnClicked: true, editBtnClicked: true, taskId: id });
  };

  viewBtnClickedFun = (id) => {
    this.setState({ plusBtnClicked: true, viewBtnClicked: true, taskId: id });
  };

  deleteBtnClickedFun = (id) => {
    this.setState({ plusBtnClicked: true, deleteBtnClicked: true, taskId: id });
  };

  //this is the main code for rerendering table
  handler = () => {
    console.log("i am in hadler function which is used to hide the modal ");
    this.setState({
      plusBtnClicked: false,
    });
  };

  render() {
    let summary = null;
    //show different summaries based on what user has cicked on.

    if (this.state.plusBtnClicked) {
      summary = (
        <TaskSummary
          cancelBtnClickedFun={this.backDropClickedFun}
          action={this.handler}
        />
      );
    }
    if (this.state.editBtnClicked) {
      summary = (
        <EditTaskSummary
          cancelBtnClickedFun={this.backDropClickedFun}
          action={this.handler}
          taskId={this.state.taskId}
        />
      );
    }
    if (this.state.viewBtnClicked) {
      //viewTaskSummary and editTaskSummary and deleteTaskSummary is almost similar.hence only one component for all of them.
      summary = (
        <EditTaskSummary
          taskId={this.state.taskId}
          viewBtnClicked={this.state.viewBtnClicked}
        />
      );
    }
    if (this.state.deleteBtnClicked) {
      summary = (
        <EditTaskSummary
          taskId={this.state.taskId}
          cancelBtnClickedFun={this.backDropClickedFun}
          action={this.handler}
          deleteBtnClicked={this.state.deleteBtnClicked}
        />
      );
    }

    return (
      <Aux>
        <section className={classes.App}>
          <div className={classes.Header}>
            <h1 style={{ fontWeight: "700" }}>ToDo App</h1>
            <div
              className={classes.PlusSymbol}
              onClick={this.plusBtnClickedFun}
            >
              <AddOutlinedIcon />
            </div>
          </div>
          <GroupbySearch />
          <Modal
            show={this.state.plusBtnClicked} //show model after clicking plus button
            backDropClickedFun={this.backDropClickedFun} //hide model after clicking backdrop
          >
            {summary}
          </Modal>
          <Tabs
            editBtnClickedFun={(id) => this.editBtnClickedFun(id)} //this are 3 tabs i.e All,Pending,Completed
            viewBtnClickedFun={(id) => this.viewBtnClickedFun(id)}
            deleteBtnClickedFun={(id) => this.deleteBtnClickedFun(id)}
          />
        </section>
      </Aux>
    );
  }
}

export default App;
