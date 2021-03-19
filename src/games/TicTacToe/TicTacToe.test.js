import React from "react";
import TicTacToe from "./index.js";
import { shallow } from "enzyme";
import socketIOClient from "socket.io-client";
import MockedSocket from "socket.io-mock";

jest.mock("socket.io-client");

describe("TicTacToe Board", () => {
  //   const wrapper = shallow(<TicTacToe board={Array(9).fill(null)} />);
  let socket;
  let wrapper;

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
    wrapper = shallow(<TicTacToe />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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
