import React from "react";
import TicTacToe from "./index.js";
import { shallow } from "enzyme";

describe("TicTacToe Board", () => {
  let wrapper = shallow(<TicTacToe />);

  test("Should have the initial state squares of empty array", () => {
    expect(wrapper.state().board).toEqual(Array(9).fill(null));
  });

  test("Should change after running markField function", () => {
    wrapper.instance().markField(0, "x");
    expect(wrapper.state().board).toEqual([
      "x",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    expect(true).toBeTruthy();
  });
});

// TO DO: test sockets
