import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import invitesService from "../../services/invitesService";

const AcceptInvite = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accept = async () => {
      invitesService.setToken(token);
      try {
        await invitesService.acceptInvite(id);
        navigate("/teams");
      } catch (ex) {
        console.log(ex);
        setLoading(false);
      }
    };
    accept();
  }, [token]);

  if (loading) return <p>Please wait...</p>;

  return "Error";
};

export default AcceptInvite;
