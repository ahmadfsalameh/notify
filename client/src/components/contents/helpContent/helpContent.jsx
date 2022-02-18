import React from "react";
import { FaLink } from "react-icons/fa";
import configs from "../../../config";

import "./helpContent.css";

const HelpContent = () => {
  return (
    <section className="help">
      <div className="help-container">
        <h3>
          <span>
            <FaLink />
          </span>
          How to connect your application?
        </h3>
        <p>
          It's really easy to connect to your application, Just get you app api
          key and insert it in the code bellow then paste the code inside any
          page you want to track in your application.
        </p>
        <pre>
          {`<script>
  window.onerror = function (msg, url, lineNo, columnNo, err) {
    fetch("${configs.apiEndpoint}/api/bugs", {
      method: "POST",
      body: JSON.stringify({
        apiKey: "YOUR_API_KEY",
        bug: {
          message: msg,
          error: JSON.stringify(err.stack),
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  };
</script>`}
        </pre>
      </div>
    </section>
  );
};

export default HelpContent;
