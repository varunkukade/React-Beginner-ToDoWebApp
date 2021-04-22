import axios from "axios";
import React, { Component } from "react";
import Button from "../../Button/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import classes from "./CompletedTable.css";

class completedTable extends Component {
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

  //function for changing the respective task color.
  reOpenBtnClickedFun = (completedTaskId) => {
    //now we want to take that id and change the color of perticular row in the table with the matching id.
    //hence we will have to compare that id
    //here now after done button clicked we sent id .now we got the id of completed task. we will access the tasks and get the pending value of respective task and will chnage that pending state to false.hence if pending state is false then for that respective task rendering pink color will be there in bg.
    this.state.tasks.forEach((task, index) => {
      if (task.id === completedTaskId) {
        //now traverse through the respective task object and change the state of pending property to false.
        for (var property in task) {
          if (property === "pending") {
            //now change pending value to false.
            //now immutably change the state means take array into another element.
            const updatedTasks = [...this.state.tasks];
            const updatedTasksElement = { ...updatedTasks[index] };
            updatedTasksElement[property] = true;
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
            //now as setState is called this table.js will be rerendered and will take value of pending as false in render and will convert specific task to pink
          }
        }
      }
    });
  };

  render() {
    let data = this.state.tasks.map((task, index) => {
      if (task.pending !== true) {
        //if task is not pending i.e if it is completed then only render that task in completed tab , else dont render
        return (
          <tr>
            <th scope="row">{task.summary}</th>

            <td>{task.priority}</td>
            <td>{task.createdOn}</td>
            <td>{task.dueDate}</td>
            <td className={classes.AllButtons}>
              <Button
                btnType="View"
                btnClicked={() => this.props.viewBtnClickedFun(task.id)}
              >
                <VisibilityOutlinedIcon />
              </Button>

              <Button
                btnType="Delete"
                btnClicked={() => this.props.deleteBtnClickedFun(task.id)}
              >
                <DeleteOutlineIcon />
              </Button>
              <Button
                btnType="Cancel"
                btnClicked={() => this.reOpenBtnClickedFun(task.id)}
              >
                Re-Open
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
      <table class="table  table-hover table-bordered border shadow">
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

export default completedTable;
