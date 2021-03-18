import React from "react";
import Board from "./Board";
import { shallow } from "enzyme";

describe("TicTacToe Board", () => {
  const wrapper = shallow(<Board />);

  test("Should contain 9 Squares ", () => {
    // console.log(wrapper.debug());
    expect(wrapper.find("Square").length).toBe(9);
  });

  test("Should have the initial state squares of empty array", () => {
    expect(wrapper.state().squares).toEqual(Array(9).fill(null));
  });

  test("Should change state.squares after function chooseSquare", () => {
    // render;
    wrapper.find("Square").first().props().onClick();
    expect(wrapper.state().squares).toEqual([
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
  });

  test("Should change state.xIsNext after clicking square", () => {
    expect(wrapper.state().xIsNext).toBeFalsy();
    wrapper.find("Square").last().props().onClick();
    expect(wrapper.state().xIsNext).toBeTruthy();
  });
});
