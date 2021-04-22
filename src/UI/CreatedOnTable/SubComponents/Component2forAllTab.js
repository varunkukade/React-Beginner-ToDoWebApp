import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Button from "../../Button/Button.js";

const Component2forAllTab = (props) => {
  const createdOn = props.tasks.map((currTask, Inindex) => {
    if (currTask.createdOn === props.Date) {
      return (
        <tr>
          <th scope="row" bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.summary}
          </th>

          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.priority}
          </td>
          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.createdOn}
          </td>
          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.dueDate}
          </td>
          <td
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button
              btnType="View"
              btnClicked={() => props.viewBtnClickedFun(currTask.id)}
            >
              <VisibilityOutlinedIcon />
            </Button>
            <Button
              btnType="Edit"
              btnClicked={() => props.editBtnClickedFun(currTask.id)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              btnType="Delete"
              btnClicked={() => props.deleteBtnClickedFun(currTask.id)}
            >
              <DeleteOutlineIcon />
            </Button>
            <Button
              btnType="Cancel"
              btnClicked={() => props.doneBtnClickedFun(currTask.id)}
            >
              {currTask.pending ? "Done" : "Re-Open"}
            </Button>
          </td>
        </tr>
      );
    }
  });
  const pendingOn = props.tasks.map((currTask, Inindex) => {
    if (currTask.dueDate === props.Date) {
      return (
        <tr>
          <th scope="row" bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.summary}
          </th>

          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.priority}
          </td>
          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.createdOn}
          </td>
          <td bgcolor={`${currTask.pending ? "" : "#46B2E0"}`}>
            {currTask.dueDate}
          </td>
          <td
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button
              btnType="View"
              btnClicked={() => props.viewBtnClickedFun(currTask.id)}
            >
              <VisibilityOutlinedIcon />
            </Button>
            <Button
              btnType="Edit"
              btnClicked={() => props.editBtnClickedFun(currTask.id)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              btnType="Delete"
              btnClicked={() => props.deleteBtnClickedFun(currTask.id)}
            >
              <DeleteOutlineIcon />
            </Button>
            <Button
              btnType="Cancel"
              btnClicked={() => props.doneBtnClickedFun(currTask.id)}
            >
              {currTask.pending ? "Done" : "Re-Open"}
            </Button>
          </td>
        </tr>
      );
    }
  });
  return props.groupBy === "Created On" ? createdOn : pendingOn;
};

export default Component2forAllTab;
