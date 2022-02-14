import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/userContext";
import Select from "react-select";
import IssuesGrid from "../issuesContent/issuesGrid/issuesGrid";
import bugsService from "../../../services/bugsService";
import filterBugsOnApps from "../../../utils/filterBugsOnApps";

import "./tasksContent.css";

const TasksContent = () => {
  const { user, token } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [filterApp, setFilterApp] = useState(null);

  const options = [{ value: null, label: "All Apps" }];

  tasks.forEach((task) => {
    const { _id, name } = task.app;
    const option = { value: _id, label: name };
    if (!options.find((o) => o.value === _id)) options.push(option);
  });

  useEffect(() => {
    bugsService.setToken(token);

    const getTasks = async () => {
      try {
        const { data } = await bugsService.getTasks();
        setTasks(data);
      } catch (ex) {}
    };

    getTasks();
  }, [token]);

  const filteredTasks = filterBugsOnApps(tasks, filterApp);

  return (
    <section className="tasks">
      <div className="tasks-header">
        <div className="select-box">
          <label>Showing issues for</label>
          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(value) => setFilterApp(value)}
          />
        </div>
      </div>
      <IssuesGrid bugs={filteredTasks} isTask={true} />
    </section>
  );
};

export default TasksContent;
