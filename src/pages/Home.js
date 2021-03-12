import React from "react";

function Home() {
  return (
    <div>
      <h1>home page!</h1>
      <p>this is where we&apos;ll have our games to choose</p>
      <div className="m-10">
        <div>
          <a href="/game" className="border-2 p-2 m-6 bg-gray-400">
            <span className="text-2xl">Game Name</span>
          </a>
        </div>
        <span className="text-xs">currently playing: 50 people!</span>
      </div>
    </div>
  );
}

export default Home;
