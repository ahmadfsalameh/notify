import React, { useState, useEffect, useContext, memo } from "react";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import appsService from "../../../services/appsService";
import DashboardLoader from "../../dashboardLoader/dashboardLoader";
import AppElement from "./appElement/appElement";
import NoApps from "./noApps/noApps";
import Button from "../../common/button/button";
import { BiPlus } from "react-icons/bi";
import CreateAppForm from "./createAppForm/createAppForm";

import "./appsContent.css";

const AppsContent = () => {
  const { token } = useContext(UserContext);
  const setPopup = useContext(PopupContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appsService.setToken(token);

    if (!token) return;

    const fetchApps = async () => {
      try {
        const { data } = await appsService.getAppsWithBugs();
        setApps(data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchApps();
  }, [token]);

  if (loading) return <DashboardLoader />;
  return (
    <>
      {apps.length ? (
        <section className="apps">
          <div className="apps-header">
            <p>
              You have {apps.length} app{apps.length > 1 ? "s" : " only"}
            </p>
            <Button
              label={<BiPlus />}
              className="btn-action btn-icon"
              onClick={() =>
                setPopup([
                  <CreateAppForm
                    apps={apps}
                    setApps={setApps}
                    setPopup={setPopup}
                  />,
                  "Create New App",
                ])
              }
            />
          </div>
          <div className="apps-grid">
            {apps.map((app) => (
              <AppElement
                key={app._id}
                app={app}
                apps={apps}
                setApps={setApps}
              />
            ))}
          </div>
        </section>
      ) : (
        <NoApps apps={apps} setApps={setApps} />
      )}
    </>
  );
};

export default memo(AppsContent);
