import React from "react";
import ReactRouter from "react-router";
import { shallow } from "enzyme";
import Game from "./Game.js";

describe("Check proper content loading", () => {
  test("Should render TicTacToe for url with params /tictactoe", () => {
    jest
      .spyOn(ReactRouter, "useParams")
      .mockReturnValue({ gameName: "tictactoe" });

    const wrapper = shallow(<Game />);

    expect(wrapper.find("TicTacToe")).toBeTruthy();
  });

  test("Should render error for params other than /tictactoe", () => {
    jest
      .spyOn(ReactRouter, "useParams")
      .mockReturnValue({ gameName: "random" });

    const wrapper = shallow(<Game />);

    expect(wrapper.contains("Error")).toBeTruthy();
    expect(wrapper.find("TicTacToe").length).toBe(0);
  });
});