import React, { Component } from "react";
import axios from "axios";

import Aux from "../../hoc/Auxilliary";

import classes from "./TaskSummary.css";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button";

class taskSummary extends Component {
  state = {
    taskDetails: {
      summary: {
        value: "",
      },
      description: {
        value: "",
      },
      dueDate: {
        value: "",
      },
      priority: {
        value: "",
      },
      createdOn: {
        value:
          new Date().getDate() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getFullYear(),
      },
      pending: {
        value: true,
      },
    },
    loading: false,
  };

  saveDataHandler = () => {
    const taskData = {};
    for (let taskDetailsElement in this.state.taskDetails) {
      taskData[taskDetailsElement] = this.state.taskDetails[
        taskDetailsElement
      ].value;
    }
    console.log(taskData); //it is task object with format { summary:"", description:"".....}
    this.setState({ loading: true });
    this.postData(taskData);
  };

  postData = async (taskData) => {
    await axios({
      method: "post",
      url: "http://localhost:3003/users",
      data: taskData,
    })
      .then((response) => {
        this.setState({ loading: false });
        this.props.action(); //this function is defined in app.js which hides the modal after saving the data.
      })
      .catch((error) => {
        this.props.action();
      });
  };

  //used to set values of task as the user typed in modal.
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTaskDetails = { ...this.state.taskDetails };
    const updatedTaskDetailsElement = {
      ...updatedTaskDetails[inputIdentifier],
    };
    updatedTaskDetailsElement.value = event.target.value;
    updatedTaskDetails[inputIdentifier] = updatedTaskDetailsElement;
    this.setState({
      taskDetails: updatedTaskDetails,
    });
  };

  render() {
    let task = (
      <Aux>
        <p className={classes.EditTask}>Edit Task</p>
        <hr size="1" width="100%" color="grey" />
        <p>Summary</p>
        <input
          maxlength="140"
          type="text"
          placeholder="Summary"
          value={this.state.taskDetails["summary"].value}
          className={classes.Summary}
          onChange={(event) => this.inputChangedHandler(event, "summary")}
        />
        <p>Description</p>
        <textarea
          maxlength="500"
          name="description"
          rows="4"
          cols="54"
          value={this.state.taskDetails["description"].value}
          onChange={(event) => this.inputChangedHandler(event, "description")}
        ></textarea>
        <div className={classes.DuedateAndPriority}>
          <div>
            <p>Due Date</p>
            <input
              type="date"
              placeholder="Due Date"
              value={this.state.taskDetails["dueDate"].value}
              onChange={(event) => this.inputChangedHandler(event, "dueDate")}
            />
          </div>
          <div>
            <p>Priority</p>
            <select
              name="modalPriority"
              value={this.state.taskDetails["priority"].value}
              onChange={(event) => this.inputChangedHandler(event, "priority")}
            >
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <div className={classes.CancelAndSaveBtn}>
          <Button btnType="Cancel" btnClicked={this.props.cancelBtnClickedFun}>
            Cancel
          </Button>
          <Button btnType="Save" btnClicked={this.saveDataHandler}>
            Save
          </Button>
        </div>
      </Aux>
    );
    if (this.state.loading) {
      task = <Spinner />;
    }

    return task;
  }
}

export default taskSummary;
