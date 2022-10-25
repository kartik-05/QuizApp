import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <CircularProgress />
    </div>
  );
}

export default Loading;
