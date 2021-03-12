import React from "react";

function Home() {
  return (
    <div>
      <h1>home page!</h1>
      <p>this is where we&apos;ll have our games to choose</p>
      <a href="/game">
        <div>
          <h2>game name</h2>
          <p>currently playing: 50 people!</p>
        </div>
      </a>
    </div>
  );
}

export default Home;
