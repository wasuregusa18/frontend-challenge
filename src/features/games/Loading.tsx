import React from "react";
import { Spin } from "antd";
import "./Loading.css";

export function Loading() {
  return (
    <div title="Loading Page" className="loading-container">
      <Spin size="large" />
    </div>
  );
}
