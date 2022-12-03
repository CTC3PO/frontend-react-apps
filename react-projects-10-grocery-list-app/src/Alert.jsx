import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  //useEffect to invoke removeAlert after 3 seconds
  useEffect(() => {
    //set timeout to remove alert after 3 seconds
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  //return alert message, depends on type: either success or danger
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
