import React, { useContext } from "react";
import { BugsContext } from "../../../../../context/bugsContext";
import Button from "../../../../common/button/button";
import dateFromObjectId from "../../../../../utils/dateFromObjectId";
import TimeAgo from "timeago-react";
import AssignIssue from "../../assignIssue/assignIssue";

import "./issue.css";

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
                <th>Error</th>
                <td>
                  <Button label="View" className="btn-action" />
                </td>
              </tr>
            )}
            {isTask || (
              <tr>
                <th>Assignee</th>
                <td>
                  {assignee ? (
                    assignee.name
                  ) : (
                    <Button
                      label="Assign"
                      className="btn-action"
                      onClick={() =>
                        setPopup([
                          <AssignIssue
                            bugs={bugs}
                            bugId={_id}
                            setBugs={setBugs}
                            setPopup={setPopup}
                          />,
                          "Create new issue",
                        ])
                      }
                    />
                  )}
                </td>
              </tr>
            )}
            <tr>
              <th>Reported</th>
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
