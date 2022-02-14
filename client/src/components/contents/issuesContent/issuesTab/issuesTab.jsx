import React from "react";
import Issue from "./Issue/issue";
import { Droppable, Draggable } from "react-beautiful-dnd";

import "./issuesTab.css";

const IssuesTab = ({ bugs, label, isTask, setPopup }) => {
  return (
    <div className={"issues-tab"} data-type={label}>
      <h6>{label}</h6>
      <Droppable
        droppableId={label}
        direction="vertical"
        isCombineEnabled={false}
        className="droppable-container"
      >
        {(dropProvided) => (
          <div
            className="issues-container"
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
          >
            {bugs.length
              ? bugs.map((bug, index) => {
                  return (
                    <Draggable
                      key={bug._id}
                      index={index}
                      draggableId={bug._id}
                      isDragDisabled={!isTask}
                    >
                      {(dragProvided) => (
                        <div
                          {...dragProvided.dragHandleProps}
                          {...dragProvided.draggableProps}
                          ref={dragProvided.innerRef}
                        >
                          <Issue
                            bug={bug}
                            isTask={isTask}
                            setPopup={setPopup}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })
              : null}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default IssuesTab;
