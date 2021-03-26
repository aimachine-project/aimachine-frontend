import React from "react";
import "./style.scss";
import GameCard from "./GameCard";
import PageTitle from "../components/PageTitle";

function Home() {
  return (
    <>
      <PageTitle title="Home Page!" />
      <div className="content">
        <MainContent />
        <SideInfo />
      </div>
    </>
  );
}

function MainContent() {
  return (
    <div className="main-content">
      <p>
        Welcome to the<span>(maybe some day)</span> best place for casual games
        on the Internet!
      </p>
      <p>
        Pick your favourite from<span>(not so)</span> many games:
      </p>
      <GameCard title="Tic Tac Toe" route="/game/tictactoe" players="40" />
    </div>
  );
}

function SideInfo() {
  return (
    <div className="side-info">
      <h3>What is this project?</h3>
      <p>It&apos;s something that we are still figuring out!</p>
      <p>
        We are hoping to create a hub for casual (and maybe not so casual) games
        that everyone knows and loves and give players a chance to compete with
        either their friends or strangers. Or if their up for a challenge with a
        skilled AI!
      </p>
    </div>
  );
}

export default Home;
