import React, { useEffect } from "react";
import DashboardStructure from "../../components/dashboardStructure/dashboardStructure";
import TasksContent from "../../components/contents/tasksContent/tasksContent";

const Tasks = () => {
  useEffect(() => {
    document.title = "Notify - Tasks";
  }, []);
  return <DashboardStructure content={<TasksContent />} />;
};

export default Tasks;
