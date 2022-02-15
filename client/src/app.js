import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import { UserContext } from "./context/userContext";
import Dashboard from "./layouts/dashboard";
import Apps from "./layouts/apps";
import Issues from "./layouts/issues";
import Teams from "./layouts/teams";
import Tasks from "./layouts/tasks";
import Settings from "./layouts/settings/settings";
import Invites from "./layouts/invites";
import AcceptInvite from "./components/acceptInvite/acceptInvite";
import auth from "./services/authService";
import userService from "./services/userService";

const App = () => {
  const [token, setToken] = useState(() => auth.getToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      userService.setToken(token);
      const user = await userService.getCurrentUser();
      setUser(user);
    };
    if (token) getUser(token);
    else setUser(null);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, user, setToken, setUser }}>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/apps" element={<ProtectedRoute element={<Apps />} />} />
        <Route
          path="/issues"
          element={<ProtectedRoute element={<Issues />} />}
        />
        <Route path="/teams" element={<ProtectedRoute element={<Teams />} />} />
        <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<Settings />} />}
        />
        <Route path="/invites/:id" element={<Invites />} />
        <Route
          path="/invites/accept/:id"
          element={<ProtectedRoute element={<AcceptInvite />} />}
        />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
