import axios from "axios";
import React, { Component } from "react";
import Button from "../../Button/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import classes from "./PendingTable.css";

class pendingTable extends Component {
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
    this.setState({ tasks: result.data });
  };

  loadSearchedTask = async () => {
    const result = await axios.get(
      `http://localhost:3003/users?q=${this.props.searchedFor}`
    );
    console.log(result.data, "hhiiii");
    this.setState({ tasks: result.data });
  };

  doneBtnClickedFun = (completedTaskId) => {
    this.state.tasks.forEach((task, index) => {
      if (task.id === completedTaskId) {
        for (var property in task) {
          if (property === "pending") {
            const updatedTasks = [...this.state.tasks];
            const updatedTasksElement = { ...updatedTasks[index] };
            updatedTasksElement[property] = false;
            updatedTasks[index] = updatedTasksElement;
            this.setState({ tasks: updatedTasks });
          }
        }
      }
    });
  };

  render() {
    let data = this.state.tasks.map((task, index) => {
      if (task.pending) {
        //if task is pending then only render that task in pending tab ,else dont render
        return (
          <tr>
            <th scope="row" bgcolor={`${task.pending ? "" : "#46B2E0"}`}>
              {task.summary}
            </th>

            <td bgcolor={`${task.pending ? "" : "#46B2E0"}`}>
              {task.priority}
            </td>
            <td bgcolor={`${task.pending ? "" : "#46B2E0"}`}>
              {task.createdOn}
            </td>
            <td bgcolor={`${task.pending ? "" : "#46B2E0"}`}>{task.dueDate}</td>
            <td className={classes.AllButtons}>
              <Button
                btnType="View"
                btnClicked={() => this.props.viewBtnClickedFun(task.id)}
              >
                <VisibilityOutlinedIcon />
              </Button>
              <Button
                btnType="Edit"
                btnClicked={() => this.props.editBtnClickedFun(task.id)}
              >
                <EditOutlinedIcon />
              </Button>
              <Button
                btnType="Delete"
                btnClicked={() => this.props.deleteBtnClickedFun(task.id)}
              >
                <DeleteOutlineIcon />
              </Button>
              <Button
                btnType="Cancel"
                btnClicked={() => this.doneBtnClickedFun(task.id)}
              >
                {task.pending ? "Done" : "Re-Open"}
              </Button>
            </td>
          </tr>
        );
      }
    });

    if (this.state.tasks.length === 0) {
      data = <h2 style={{ margin: "30px 0 30px 30px" }}>No Tasks Added !</h2>;
    }

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
        <tbody>{data}</tbody>
      </table>
    );
  }
}

export default pendingTable;
