import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Invite from "../../components/invite/invite";

const Invites = () => {
  const { id } = useParams();
  useEffect(() => {
    document.title = "Notify - Invitation";
  }, []);
  return <Invite id={id} />;
};

export default Invites;
