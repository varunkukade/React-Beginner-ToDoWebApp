import axios from "axios";
import React, { Component } from "react";

import Component1 from "./SubComponents/Component1.js";

class createdOnTable extends Component {
  state = {
    tasks: [],
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.searchedFor) {
      this.loadSearchedTask();
    } else {
      this.loadTasks();
    }
  }

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks = async () => {
    const result = await axios.get("http://localhost:3003/users");
    console.log(result);
    this.setState({ tasks: result.data });
  };

  loadSearchedTask = async () => {
    const result = await axios.get(
      `http://localhost:3003/users?q=${this.props.searchedFor}`
    );
    this.setState({ tasks: result.data });
  };

  doneBtnClickedFun = (completedTaskId) => {
    console.log("in this fun");
    this.state.tasks.forEach((task, index) => {
      if (task.id === completedTaskId) {
        for (var property in task) {
          if (property === "pending") {
            const updatedTasks = [...this.state.tasks];
            const updatedTasksElement = { ...updatedTasks[index] };
            updatedTasksElement[property] = !updatedTasksElement[property];
            updatedTasks[index] = updatedTasksElement;
            axios({
              method: "put",
              url: `http://localhost:3003/users/${task.id}`,
              data: updatedTasksElement,
            })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error.data);
              });

            this.setState({ tasks: updatedTasks });
            console.log(updatedTasksElement);
          }
        }
      }
    });
  };

  render() {
    let uniqueDatesArray = [];
    let uniquePendingDatesArray = [];
    let data = this.state.tasks.forEach((currTask, index) => {
      for (var property in currTask) {
        if (property === "createdOn") {
          uniqueDatesArray.push(currTask[property]);
        }
        if (property === "dueDate") {
          uniquePendingDatesArray.push(currTask[property]);
        }
      }
    });

    const UniqueDates = uniqueDatesArray.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );
    const UniquePendingDates = uniquePendingDatesArray.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    const propsNeeded = {
      UniquePendingDates: UniquePendingDates,
      UniqueDates: UniqueDates,
      tasks: this.state.tasks,
      editBtnClickedFun: this.props.editBtnClickedFun,
      plusBtnClicked: this.props.plusBtnClicked,
      viewBtnClickedFun: this.props.viewBtnClickedFun,
      deleteBtnClickedFun: this.props.deleteBtnClickedFun,
      groupBy: this.props.groupBy,
      selectedTab: this.props.selectedTab,
    };

    return (
      <table class="table table-hover table-bordered border shadow">
        <thead>
          <tr>
            <th scope="col">Summary</th>
            <th scope="col">Priority</th>
            <th scope="col">Created on</th>
            <th scope="col"> Due By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <Component1
            {...propsNeeded}
            doneBtnClickedFun={(completedTaskId) =>
              this.doneBtnClickedFun(completedTaskId)
            }
          />
        </tbody>
      </table>
    );
  }
}

export default createdOnTable;
