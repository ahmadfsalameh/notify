import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import IssuesTab from "../issuesTab/issuesTab";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderBugs } from "../../../../utils/reorderBugs";
import bugsService from "../../../../services/bugsService";
import filterBugsOnApps from "../../../../utils/filterBugsOnApps";
import text from "../../../../constants/text.json";

import "./issuesGrid.css";

const IssuesGrid = ({ bugs, filterApp, isTask = false, setPopup }) => {
  const { token } = useContext(UserContext);
  const [bugsMap, setBugsMap] = useState({});

  const filter = (bug) => {
    return filterBugsOnApps(bug, filterApp);
  };

  useEffect(() => {
    setBugsMap({
      unassigned: bugs.filter(
        (bug) => bug.status === "unassigned" && filter(bug)
      ),
      open: bugs.filter((bug) => bug.status === "open" && filter(bug)),
      underDevelopment: bugs.filter(
        (bug) => bug.status === "underdevelopment" && filter(bug)
      ),
      closed: bugs.filter((bug) => bug.status === "closed" && filter(bug)),
    });
  }, [bugs, filterApp]);

  const changeBugStatusAndIndex = async (destination, index, bugId) => {
    bugsService.setToken(token);
    try {
      const data = {
        status: destination.toLowerCase(),
        index,
      };
      await bugsService.changeBugStatusAndIndex(bugId, data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    changeBugStatusAndIndex(
      destination.droppableId,
      destination.index,
      bugsMap[source.droppableId][source.index]._id
    );

    setBugsMap(reorderBugs(bugsMap, source, destination));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={isTask ? "issues-grid issues-grid-three" : "issues-grid"}>
        {Object.entries(bugsMap).map(([k, v]) => {
          if (k === "unassigned" && isTask) return;
          return (
            <IssuesTab
              key={k}
              label={text.issues.status[k]}
              type={k}
              bugs={v}
              isTask={isTask}
              setPopup={setPopup}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default IssuesGrid;
