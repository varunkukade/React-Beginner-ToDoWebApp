import axios from "axios";
import React, { Component } from "react";

import Button from "../../Button/Button";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ImportExportIcon from "@material-ui/icons/ImportExport";

import classes from "./Table.css";

class table extends Component {
  state = {
    tasks: [],
    priorityClicked: false,
    createdOnClicked: false,
    dueByClicked: false,
    toggle: "",
  };
  componentDidMount() {
    this.loadTasks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchedFor) {
      this.loadSearchedTask(); //if user is searching call this function
    } else {
      this.loadTasks();
    }
  }

  DueByClickedFun = () => {
    console.log("hey");
    this.setState({ dueByClicked: !this.state.dueByClicked });
    //this.dueByLogic();
  };

  dueByLogic = () => {
    console.log("hiii");
    if (this.state.dueByClicked) {
      //this.loadTasksForDueByAsc();
    } else {
      //this.loadTasksForDueByDesc();
    }
  };

  createdOnClickedFun = () => {
    this.setState({ createdOnClicked: !this.state.createdOnClicked });
    this.createdOnlogic();
  };
  createdOnlogic = () => {
    if (this.state.createdOnClicked) {
      this.loadTasksForCreatedOnAsc();
    } else {
      this.loadTasksForCreatedOnDesc();
    }
  };

  loadTasksForCreatedOnAsc = async () => {
    const result = await axios.get(
      "http://localhost:3003/users?_sort=createdOn&_order=asc"
    );
    this.setState({ tasks: result.data });
  };
  loadTasksForCreatedOnDesc = async () => {
    const result = await axios.get(
      "http://localhost:3003/users?_sort=createdOn&_order=desc"
    );
    this.setState({ tasks: result.data });
  };

  priorityClickedFun = () => {
    this.setState({
      priorityClicked: !this.state.priorityClicked,
      toggle: "clicked",
    });
    this.loadTasks();
  };

  loadTasks = async () => {
    const result = await axios.get("http://localhost:3003/users");
    if (this.state.toggle === "") {
      this.setState({ tasks: result.data });
    } else if (!this.state.priorityClicked) {
      this.setState({
        tasks: this.sortByPriorityDesc(result.data),
      });
    } else if (this.state.priorityClicked) {
      this.setState({
        tasks: this.sortByPriorityAsc(result.data),
      });
    }
  };

  loadSearchedTask = async () => {
    const result = await axios.get(
      `http://localhost:3003/users?q=${this.props.searchedFor}` //get the result of searched data and render it to the table.
    );
    this.setState({ tasks: result.data });
  };

  sortByPriorityAsc = (tasks) => {
    const lowArray = [];
    const mediumArray = [];
    const highArray = [];
    //this will take array of objects.we  will traverse through that objects and will check priority of every object.
    tasks.forEach(function (task) {
      //now every task is an object we have to traverse inside each object.
      for (var property in task) {
        if (property === "priority") {
          if (task[property] === "Low") {
            lowArray.push(task);
          }
          if (task[property] === "Medium") {
            mediumArray.push(task);
          }
          if (task[property] === "High") {
            highArray.push(task);
          }
        }
      }
    });
    return lowArray.concat(mediumArray, highArray);
  };

  sortByPriorityDesc = (tasks) => {
    const lowArray = [];
    const mediumArray = [];
    const highArray = [];
    //this will take array of objects.we  will traverse through that objects and will check priority of every object.
    tasks.forEach(function (task) {
      //now every task is an object we have to traverse inside each object.
      for (var property in task) {
        if (property === "priority") {
          if (task[property] === "Low") {
            lowArray.push(task);
          }
          if (task[property] === "Medium") {
            mediumArray.push(task);
          }
          if (task[property] === "High") {
            highArray.push(task);
          }
        }
      }
    });
    return highArray.concat(mediumArray, lowArray);
  };

  //function for changing the respective task color.
  doneBtnClickedFun = (completedTaskId) => {
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
            updatedTasksElement[property] = !updatedTasksElement[property];
            updatedTasks[index] = updatedTasksElement;
            //now after updating certain task property ,update that task in the json server also so that we can access that updated task with pending set to false in the pending.js file.
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
            console.log(updatedTasksElement); //here we have tasks with pending set to false.
            //now as setState is called this table.js will be rerendered and will take value of pending as false in render and will convert specific task to pink
          }
        }
      }
    });
  };

  render() {
    let data = this.state.tasks.map((task, index) => (
      <tr>
        <th scope="row" bgcolor={`${task.pending ? "" : "#46B2E0"}`}>
          {task.summary}
        </th>

        <td bgcolor={`${task.pending ? "" : "#46B2E0"}`}>{task.priority}</td>
        <td bgcolor={`${task.pending ? "" : "#46B2E0"}`}>{task.createdOn}</td>
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
    ));

    if (this.state.tasks.length === 0) {
      data = <h2 style={{ margin: "30px 0 30px 30px" }}>No Tasks Added !</h2>;
    }

    return (
      <table class="table border shadow table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Summary</th>
            <th>
              Priority{" "}
              <span
                style={{ marginLeft: "15px" }}
                onClick={this.priorityClickedFun}
              >
                <ImportExportIcon
                  style={{
                    backgroundColor: "#0b7fd8",
                    color: "white",
                    borderRadius: "3px",
                    padding: "3px 1px",
                  }}
                />
              </span>
            </th>
            <th onClick={this.createdOnClickedFun}>
              Created On
              <span
                style={{ marginLeft: "15px" }}
                onClick={this.createdOnClickedFun}
              >
                <ImportExportIcon
                  style={{
                    backgroundColor: "#0b7fd8",
                    color: "white",
                    borderRadius: "3px",
                    padding: "3px 1px",
                  }}
                />
              </span>
            </th>
            <th onClick={this.DueByClickedFun}>Due By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    );
  }
}

export default table;
