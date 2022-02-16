import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import Group from "../../common/group/group";
import InfoGroup from "../../common/infoGroup/infoGroup";
import bugsService from "../../../services/bugsService";
import appsService from "../../../services/appsService";

import "./dashboardContent.css";
import { useEffect } from "react";
import { useState } from "react";
import DashboardLoader from "../../dashboardLoader/dashboardLoader";

const DashboardContent = () => {
  const { token } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    bugsService.setToken(token);
    appsService.setToken(token);
    const getTasks = async () => {
      const { data } = await bugsService.getTasks();
      setTasks(data);
      setLoading1(false);
    };
    const getAppsBugs = async () => {
      const { data } = await appsService.getAppsWithBugs();
      data.forEach((app) => {
        setBugs([...bugs, ...app.bugs]);
      });
      setLoading2(false);
    };
    getTasks();
    getAppsBugs();
  }, []);

  const closedTasks = tasks.filter((task) => task.status === "closed");
  const closedBugs = bugs.filter((bug) => bug.status === "closed");

  if (loading1 || loading2) return <DashboardLoader />;

  return (
    <section className="dashboard">
      <Group
        label="Your Performance"
        content={
          <div className="row">
            <InfoGroup label="Tasks received" content={tasks.length} />
            <InfoGroup
              label="Tasks closed"
              waves={true}
              content={closedTasks.length}
            />
          </div>
        }
      />
      <Group
        label="Your Apps Performance"
        content={
          <div className="row">
            <InfoGroup label="Issues received" content={bugs.length} />
            <InfoGroup
              label="Issues closed"
              waves={true}
              content={closedBugs.length}
            />
          </div>
        }
      />
    </section>
  );
};

export default DashboardContent;
