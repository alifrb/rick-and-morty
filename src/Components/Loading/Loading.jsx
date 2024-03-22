import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container d-flex justify-content-center">
      <div className="loading-spinner"></div>
    </div>
  );
}
