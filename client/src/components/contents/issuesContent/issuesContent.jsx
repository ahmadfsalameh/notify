import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import { BugsContext } from "../../../context/bugsContext";
import bugsService from "../../../services/bugsService";
import appsService from "../../../services/appsService";
import Select from "react-select";
import CreateIssueForm from "./createIssueForm/createIssueForm";
import Button from "../../common/button/button";
import { BiPlus } from "react-icons/bi";
import IssuesGrid from "./issuesGrid/issuesGrid";
import DashboardLoader from "../../dashboardLoader/dashboardLoader";

import "./issuesContent.css";

const IssuesContent = () => {
  const { token } = useContext(UserContext);
  const setPopup = useContext(PopupContext);
  const [bugs, setBugs] = useState([]);
  const [apps, setApps] = useState([]);
  const [filterApp, setFilterApp] = useState(null);
  const [loading, setLoading] = useState(true);

  let options = [{ value: null, label: "All Apps" }];

  if (apps.length) options = [{ value: null, label: "All Apps" }, ...apps];

  useEffect(() => {
    if (!token) return;
    appsService.setToken(token);
    bugsService.setToken(token);
    const getBugs = async () => {
      try {
        const { data } = await bugsService.getBugs();
        setBugs(data);
      } catch (ex) {}
    };
    const getApps = async () => {
      try {
        const { data } = await appsService.getApps();
        setApps([
          ...apps,
          ...data.map((a) => {
            return { value: a._id, apiKey: a.apiKey, label: a.name };
          }),
        ]);
      } catch (ex) {}
      setLoading(false);
    };
    getApps();
    getBugs();

    return () => {
      setApps({ value: null, label: "All Apps" });
    };
  }, [token]);

  if (loading) return <DashboardLoader />;

  return (
    <BugsContext.Provider value={{ bugs, setBugs }}>
      <section className="issues">
        <div className="issues-header">
          <div className="select-box">
            <label>Showing issues for</label>
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={(value) => setFilterApp(value)}
            />
          </div>
          <Button
            label={<BiPlus />}
            className="btn-action btn-icon"
            onClick={() =>
              setPopup([
                <CreateIssueForm
                  apps={apps}
                  bugs={bugs}
                  setBugs={setBugs}
                  setPopup={setPopup}
                />,
                "Create new issue",
              ])
            }
          />
        </div>
        <IssuesGrid bugs={bugs} filterApp={filterApp} setPopup={setPopup} />
      </section>
    </BugsContext.Provider>
  );
};

export default IssuesContent;
