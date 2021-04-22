import axios from "axios";
import React, { Component } from "react";
import Button from "../../Button/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import classes from "./PriorityTable.css";

class priorityTable extends Component {
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

  //function for changing the respective task color.
  doneBtnClickedFun = (completedTaskId) => {
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
    let lowArray = []; //lowArray contains all the objects with low Priority
    let MediumArray = []; //MediumArray contains all the objects with Medium priority
    let HighArray = []; //HighArray contains all the objects with High priority

    let data = this.state.tasks.forEach((task, index) => {
      if (task.priority === "Low") {
        lowArray.push(task);
      }
      if (task.priority === "Medium") {
        MediumArray.push(task);
      }
      if (task.priority === "High") {
        HighArray.push(task);
      }
    });

    const lowData = lowArray.map((lowTask, index) => (
      <tr>
        <th scope="row" bgcolor={`${lowTask.pending ? "" : "#46B2E0"}`}>
          {lowTask.summary}
        </th>
        <td bgcolor={`${lowTask.pending ? "" : "#46B2E0"}`}>
          {lowTask.priority}
        </td>
        <td bgcolor={`${lowTask.pending ? "" : "#46B2E0"}`}>
          {lowTask.createdOn}
        </td>
        <td bgcolor={`${lowTask.pending ? "" : "#46B2E0"}`}>
          {lowTask.dueDate}
        </td>
        <td className={classes.StyleForActions}>
          <Button
            btnType="View"
            btnClicked={() => this.props.viewBtnClickedFun(lowTask.id)}
          >
            <VisibilityOutlinedIcon />
          </Button>
          <Button
            btnType="Edit"
            btnClicked={() => this.props.editBtnClickedFun(lowTask.id)}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            btnType="Delete"
            btnClicked={() => this.props.deleteBtnClickedFun(lowTask.id)}
          >
            <DeleteOutlineIcon />
          </Button>
          <Button
            btnType="Cancel"
            btnClicked={() => this.doneBtnClickedFun(lowTask.id)}
          >
            {lowTask.pending ? "Done" : "Re-Open"}
          </Button>
        </td>
      </tr>
    ));

    const mediumData = MediumArray.map((mediumTask, index) => (
      <tr>
        <th scope="row" bgcolor={`${mediumTask.pending ? "" : "#46B2E0"}`}>
          {mediumTask.summary}
        </th>
        <td bgcolor={`${mediumTask.pending ? "" : "#46B2E0"}`}>
          {mediumTask.priority}
        </td>
        <td bgcolor={`${mediumTask.pending ? "" : "#46B2E0"}`}>
          {mediumTask.createdOn}
        </td>
        <td bgcolor={`${mediumTask.pending ? "" : "#46B2E0"}`}>
          {mediumTask.dueDate}
        </td>
        <td className={classes.StyleForActions}>
          <Button
            btnType="View"
            btnClicked={() => this.props.viewBtnClickedFun(mediumTask.id)}
          >
            <VisibilityOutlinedIcon />
          </Button>
          <Button
            btnType="Edit"
            btnClicked={() => this.props.editBtnClickedFun(mediumTask.id)}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            btnType="Delete"
            btnClicked={() => this.props.deleteBtnClickedFun(mediumTask.id)}
          >
            <DeleteOutlineIcon />
          </Button>
          <Button
            btnType="Cancel"
            btnClicked={() => this.doneBtnClickedFun(mediumTask.id)}
          >
            {mediumTask.pending ? "Done" : "Re-Open"}
          </Button>
        </td>
      </tr>
    ));

    const highData = HighArray.map((highTask, index) => (
      <tr>
        <th scope="row" bgcolor={`${highTask.pending ? "" : "#46B2E0"}`}>
          {highTask.summary}
        </th>
        <td bgcolor={`${highTask.pending ? "" : "#46B2E0"}`}>
          {highTask.priority}
        </td>
        <td bgcolor={`${highTask.pending ? "" : "#46B2E0"}`}>
          {highTask.createdOn}
        </td>
        <td bgcolor={`${highTask.pending ? "" : "#46B2E0"}`}>
          {highTask.dueDate}
        </td>
        <td className={classes.StyleForActions}>
          <Button
            btnType="View"
            btnClicked={() => this.props.viewBtnClickedFun(highTask.id)}
          >
            <VisibilityOutlinedIcon />
          </Button>
          <Button
            btnType="Edit"
            btnClicked={() => this.props.editBtnClickedFun(highTask.id)}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            btnType="Delete"
            btnClicked={() => this.props.deleteBtnClickedFun(highTask.id)}
          >
            <DeleteOutlineIcon />
          </Button>
          <Button
            btnType="Cancel"
            btnClicked={() => this.doneBtnClickedFun(highTask.id)}
          >
            {highTask.pending ? "Done" : "Re-Open"}
          </Button>
        </td>
      </tr>
    ));

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
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1">
              <p className={classes.LowMediumHigh}>Low</p>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
          {lowData}
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1">
              <p className={classes.LowMediumHigh}>Medium</p>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
          {mediumData}
          <tr>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
            <td rowspan="1">
              <p className={classes.LowMediumHigh}>High</p>
            </td>
            <td rowspan="1"></td>
            <td rowspan="1"></td>
          </tr>
          {highData}
        </tbody>
      </table>
    );
  }
}

export default priorityTable;
