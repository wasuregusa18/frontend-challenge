import React from "react";
import { Button, Col, Row } from "antd";
import { Badge } from "@material-ui/core";
import "./double-trouble-intro.css";

const BLUE = "rgb(0,116,255)";
const RED = "rgb(255,0,0)";

export default function DoubleTrouble() {
  return (
    <div className="game-intro">
      <Row
        align="bottom"
        gutter={[0, 500]}
        justify="center"
        style={{ height: "10vh" }}
      >
        <Col style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "calc(50% - 25px)" }} />
            <span style={{ color: BLUE, width: "50px", fontSize: "x-large" }}>
              RED{" "}
            </span>
            <hr className="label-line" />
            <span className="explaination-text">Word is in blue color</span>
          </div>
        </Col>
      </Row>
      <Row style={{ height: "5vh" }} />
      <Row align="top" justify="center" gutter={50} style={{ height: "20vh" }}>
        <Col style={{ textAlign: "center" }}>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent="X"
            className="fail-badge"
          >
            <Button
              className="example-button"
              size="large"
              shape="round"
              style={{ color: BLUE }}
            >
              RED
            </Button>
          </Badge>
          <p className="explaination-text">WRONG ANSWER</p>
        </Col>
        <Col>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent="✓"
            className="success-badge"
          >
            <Button
              size="large"
              shape="round"
              className="example-button"
              style={{ color: RED }}
            >
              BLUE
            </Button>
          </Badge>
          <p className="explaination-text">RIGHT ANSWER</p>
        </Col>
      </Row>
    </div>
  );
}
