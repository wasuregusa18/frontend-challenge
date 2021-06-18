import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectAllGames } from "../gamesSliceSelectors";
import { selectUser } from "../../user/userSlice";
import { Link } from "react-router-dom";
import { Button, Row, Col, Spin, Divider } from "antd";
import "./GameSelector.css";
import { useTitle } from "../hooks/useTitle";

export function GameSelector() {
  const { status, info: userInfo } = useAppSelector(selectUser);
  const games = useAppSelector(selectAllGames);
  const userLoading = status === "loading" || status === "new";
  useTitle("Games");

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
              <Link to={`game/${game.urlId}/`}>
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
