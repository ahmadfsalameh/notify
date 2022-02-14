import React, { useContext } from "react";
import { BugsContext } from "../../../../../context/bugsContext";
import Button from "../../../../common/button/button";
import dateFromObjectId from "../../../../../utils/dateFromObjectId";
import TimeAgo from "timeago-react";
import AssignIssue from "../../assignIssue/assignIssue";
import text from "../../../../../constants/text.json";

import "./issue.css";

const { details, assign } = text.issues;

const Issue = ({ bug, isTask, setPopup }) => {
  const { bugs, setBugs } = useContext(BugsContext);
  const { _id, message, assignee, error } = bug;
  return (
    <div
      className={
        isTask ? "issue-container issue-container-move" : "issue-container"
      }
    >
      <div className="issue-title">
        <p>{message}</p>
      </div>
      <div className="issue-details">
        <table>
          <tbody>
            {error && (
              <tr>
                <th>{details.error.label}</th>
                <td>
                  <Button label={details.error.action} className="btn-action" />
                </td>
              </tr>
            )}
            {isTask || (
              <tr>
                <th>{details.assignee.label}</th>
                <td>
                  {assignee ? (
                    assignee.name
                  ) : (
                    <Button
                      label={details.assignee.action}
                      className="btn-action"
                      onClick={() =>
                        setPopup([
                          <AssignIssue
                            bugs={bugs}
                            bug={bug}
                            setBugs={setBugs}
                            setPopup={setPopup}
                          />,
                          assign.label,
                        ])
                      }
                    />
                  )}
                </td>
              </tr>
            )}
            <tr>
              <th>{details.reported}</th>
              <td>
                <TimeAgo datetime={dateFromObjectId(_id)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issue;
