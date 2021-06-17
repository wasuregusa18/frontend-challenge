import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllGames } from "./gamesSlice";
import { selectUser } from "../user/userSlice";
import { Link } from "react-router-dom";
import { List, Button, Row, Col, Spin, Divider } from "antd";
import "./GameSelector.css";

const name2url = (name: string): string =>
  name.replace(/ /gi, "-").toLowerCase();

export function GameSelector() {
  const { status, error, info: userInfo } = useAppSelector(selectUser);
  const games = useAppSelector(selectAllGames);
  let games2 = [
    { name: "hello" },
    { name: "COD" },
    { name: "morning" },
    { name: "hello" },
    { name: "COD" },
    { name: "morning" },
  ];

  const userLoading = status === "loading" || status === "new";

  return (
    <div className="selector-container">
      <h3 className="welcome-title">
        Hello {userLoading ? "..." : userInfo?.name}
      </h3>
      <Divider className="selector-divider" />
      <h4 className="games-header">Games</h4>
      <br />
      <Row justify="center" gutter={[16, 16]} className="games-list">
        {games.length ? (
          games.map((game) => (
            <Col
              key={game.id}
              style={{ textAlign: "center", paddingLeft: "0px" }}
              xl={6}
              md={8}
              lg={8}
              xs={12}
            >
              <Link to={`game/${name2url(game.name)}/`}>
                <Button shape="round" size="large" className="game-button">
                  {game.name}
                </Button>
              </Link>
            </Col>
          ))
        ) : (
          <Spin size="large" />
        )}
      </Row>
    </div>
  );
}
