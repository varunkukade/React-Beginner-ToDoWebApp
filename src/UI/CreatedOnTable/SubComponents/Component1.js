import React from "react";
import Component2forAllTab from "./Component2forAllTab";
import Component2forPendingTab from "./Component2forPendingTab";
import classes from "../CreatedOnPendingOnTable.css";

const component1 = (props) => {
  const propsToBePassed = {
    tasks: props.tasks,
    editBtnClickedFun: props.editBtnClickedFun,
    plusBtnClicked: props.plusBtnClicked,
    viewBtnClickedFun: props.viewBtnClickedFun,
    deleteBtnClickedFun: props.deleteBtnClickedFun,
    groupBy: props.groupBy,
  };
  const createdOn = props.UniqueDates.map((Date, Outindex) => {
    return (
      <React.Fragment>
        <tr>
          <td rowspan="1"></td>
          <td rowspan="1"></td>
          <td rowspan="1">
            <p className={classes.Date}>{Date}</p>
          </td>
          <td rowspan="1"></td>
          <td rowspan="1"></td>
        </tr>
        {props.selectedTab === "All" ? (
          <Component2forAllTab
            {...propsToBePassed}
            Date={Date}
            doneBtnClickedFun={(completedTaskId) =>
              props.doneBtnClickedFun(completedTaskId)
            }
          />
        ) : (
          <Component2forPendingTab
            {...propsToBePassed}
            Date={Date}
            doneBtnClickedFun={(completedTaskId) =>
              props.doneBtnClickedFun(completedTaskId)
            }
          />
        )}
      </React.Fragment>
    );
  });

  const pendingOn = props.UniquePendingDates.map((Date, Outindex) => {
    return (
      <React.Fragment>
        <tr>
          <td rowspan="1"></td>
          <td rowspan="1"></td>
          <td rowspan="1">
            <p className={classes.Date}>{Date}</p>
          </td>
          <td rowspan="1"></td>
          <td rowspan="1"></td>
        </tr>
        {props.selectedTab === "All" ? (
          <Component2forAllTab
            {...propsToBePassed}
            Date={Date}
            doneBtnClickedFun={(completedTaskId) =>
              props.doneBtnClickedFun(completedTaskId)
            }
          />
        ) : (
          <Component2forPendingTab
            {...propsToBePassed}
            Date={Date}
            doneBtnClickedFun={(completedTaskId) =>
              props.doneBtnClickedFun(completedTaskId)
            }
          />
        )}
      </React.Fragment>
    );
  });
  return props.groupBy === "Created On" ? createdOn : pendingOn;
};

export default component1;
