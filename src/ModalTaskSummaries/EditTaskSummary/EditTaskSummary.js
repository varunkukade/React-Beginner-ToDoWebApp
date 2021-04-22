import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import classes from "./EditTaskSummary.css";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";
import Button from "../../UI/Button/Button";

class editTaskSummary extends Component {
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
        value: "",
      },
      pending: {
        value: true,
      },
    },
    loading: false,
  };

  updateDataHandler = () => {
    const taskData = {};
    for (let taskDetailsElement in this.state.taskDetails) {
      taskData[taskDetailsElement] = this.state.taskDetails[
        taskDetailsElement
      ].value;
    }
    this.setState({ loading: true });
    this.postData(taskData);
  };

  postData = async (taskData) => {
    await axios({
      method: "put",
      url: `http://localhost:3003/users/${this.props.taskId}`, //here we got the id as props of the task on which user clicked to edit.
      data: taskData,
    })
      .then((response) => {
        this.setState({ loading: false });
        this.props.action(); //again close the modal.
      })
      .catch((error) => {
        console.error(error.data);
        this.props.action();
      });
  };

  //will be invoked by edit button click as we want to get the taskSummary in our modal for that respective task.This will fetch the data of task from json server with matching id and will put it in our state taskDetails.hence we will able to see data of the task as soon as we press edit on respective task.

  componentDidMount() {
    this.loadTask();
  }

  loadTask = () => {
    axios
      .get(`http://localhost:3003/users/${this.props.taskId}`)
      .then((response) => {
        const currTask = response.data;
        this.updateTasks(
          currTask.summary,
          currTask.description,
          currTask.priority,
          currTask.dueDate,
          currTask.createdOn
        );
      });
  };

  //putting task data from json server to our taskDetails state.
  updateTasks = (summary, description, priority, dueDate, createdOn) => {
    for (var inputIdentifier in this.state.taskDetails) {
      const updatedTaskDetails = { ...this.state.taskDetails };
      const updatedTaskDetailsElement = {
        ...updatedTaskDetails[inputIdentifier],
      };
      switch (inputIdentifier) {
        case "summary":
          updatedTaskDetailsElement.value = summary;
          break;
        case "description":
          updatedTaskDetailsElement.value = description;
          break;
        case "priority":
          updatedTaskDetailsElement.value = priority;
          break;
        case "dueDate":
          updatedTaskDetailsElement.value = dueDate;
          break;
        case "createdOn":
          updatedTaskDetailsElement.value = createdOn;
          break;
        default:
          updatedTaskDetailsElement.value = updatedTaskDetailsElement.value;
      }
      updatedTaskDetails[inputIdentifier] = updatedTaskDetailsElement;
      this.setState({ taskDetails: updatedTaskDetails });
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedTaskDetails = { ...this.state.taskDetails };
    const updatedTaskDetailsElement = {
      ...updatedTaskDetails[inputIdentifier],
    };
    updatedTaskDetailsElement.value = event.target.value;
    updatedTaskDetails[inputIdentifier] = updatedTaskDetailsElement;
    this.setState({ taskDetails: updatedTaskDetails });
  };

  deleteDataHandler = async () => {
    //now we want to get id .
    //then we will need to go to that json server and get the object of that id.
    await axios.delete(`http://localhost:3003/users/${this.props.taskId}`);
    this.props.action();
  };

  render() {
    let buttons = (
      <div className={classes.CancelAndSaveBtn}>
        <Button btnType="Cancel" btnClicked={this.props.cancelBtnClickedFun}>
          Cancel
        </Button>
        <Button btnType="Save" btnClicked={this.updateDataHandler}>
          Update
        </Button>
      </div>
    );
    if (this.props.deleteBtnClicked) {
      buttons = (
        <div className={classes.YesAndNoButton}>
          <p>Do you want to delete this task ?</p>
          <Button
            btnType="Delete"
            extraButtonType="Yes"
            btnClicked={this.deleteDataHandler}
          >
            Yes
          </Button>
          <Button
            btnType="View"
            extraButtonType="No"
            btnClicked={this.props.cancelBtnClickedFun}
          >
            No
          </Button>
        </div>
      );
    }

    if (this.props.viewBtnClicked) {
      buttons = null;
    }

    let task = (
      <Aux>
        <p className={classes.EditTask}>Edit Task</p>
        <hr size="1" width="100%" color="grey" />
        <p>Summary</p>
        <input
          disabled={this.props.viewBtnClicked || this.props.deleteBtnClicked}
          type="text"
          placeholder="Summary"
          value={this.state.taskDetails["summary"].value}
          className={classes.Summary}
          onChange={(event) => this.inputChangedHandler(event, "summary")}
        />
        <p>Description</p>
        <textarea
          disabled={this.props.viewBtnClicked || this.props.deleteBtnClicked}
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
              disabled={
                this.props.viewBtnClicked || this.props.deleteBtnClicked
              }
              type="date"
              placeholder="Due Date"
              value={this.state.taskDetails["dueDate"].value}
              onChange={(event) => this.inputChangedHandler(event, "dueDate")}
            />
          </div>
          <div>
            <p>Priority</p>
            <select
              disabled={
                this.props.viewBtnClicked || this.props.deleteBtnClicked
              }
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
        {buttons}
      </Aux>
    );
    if (this.state.loading) {
      task = <Spinner />;
    }

    return task;
  }
}

export default editTaskSummary;
