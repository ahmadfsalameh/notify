import React, { useState, useEffect, useContext, memo } from "react";
import { UserContext } from "../../../context/userContext";
import { PopupContext } from "../../../context/popupContext";
import appsService from "../../../services/appsService";
import DashboardLoader from "../../dashboardLoader/dashboardLoader";
import AppElement from "./appElement/appElement";
import NoApps from "./noApps/noApps";
import Button from "../../common/button/button";
import { BiPlus } from "react-icons/bi";

import "./appsContent.css";
import CreateAppForm from "./createAppForm/createAppForm";

const AppsContent = () => {
  const { token } = useContext(UserContext);
  const setPopup = useContext(PopupContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState({ apps: true, delete: {} });

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
      setLoading({ ...loading, apps: false });
    };

    fetchApps();
  }, [token]);

  const handleDelete = async (appId) => {
    setLoading({ ...loading, delete: { [appId]: true } });
    try {
      await appsService.deleteApp(appId);
      setLoading({ ...loading, delete: false });
      setApps(apps.filter((app) => app._id != appId));
    } catch (ex) {
      setLoading({ ...loading, delete: {} });
    }
  };

  if (loading.apps) return <DashboardLoader />;
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
                loading={loading.delete[app._id]}
                onDelete={handleDelete}
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
