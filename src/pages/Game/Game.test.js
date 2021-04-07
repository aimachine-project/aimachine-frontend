import React from "react";
import { render, screen } from "@testing-library/react";
import ReactRouter from "react-router";
import { shallow } from "enzyme";
import Game from "./index.js";

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

    render(<Game />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
