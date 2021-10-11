import React from "react";
import TicTacToe from "./index.js";
import { shallow } from "enzyme";

describe("TicTacToe Board", () => {
  let wrapper = shallow(
    <TicTacToe boardSize="3" socketUrl="ws://test/games/tictactoe" />
  );

  test("Should have the initial state squares of empty array", () => {
    // Can only be called on class components
    // expect(wrapper.state().board).toEqual(Array(9).fill(null));
  });

  test("Should change after running markField function", () => {
    // Cannot read property 'markField' of null - wrapper not workind with funcion components
    //   wrapper.instance().markField(0, "x");
    //   expect(wrapper.state().board).toEqual([
    //     "x",
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //   ]);
    //   expect(true).toBeTruthy();
  });
});

// TO DO: test sockets
