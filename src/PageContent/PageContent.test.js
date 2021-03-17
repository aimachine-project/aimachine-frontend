import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home.js";
import Game from "../pages/Game.js";
import PageNotFound from "../pages/PageNotFound";

jest.mock("../pages/Home");
jest.mock("../pages/Game");
jest.mock("../pages/PageNotFound");

describe("Check proper content loading", () => {
  test("Should load Home component on default route", () => {
    Home.mockImplementation(() => <div>HomeMock</div>);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("HomeMock")).toBeInTheDocument();
  });

  test("Should load Game component on game route", () => {
    Game.mockImplementation(() => <div>GameMock</div>);

    render(
      <MemoryRouter initialEntries={["/game/gameName"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("GameMock")).toBeInTheDocument();
  });

  test("Should load PageNotFound component on random route", () => {
    PageNotFound.mockImplementation(() => <div>PageNotFoundMock</div>);

    render(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("PageNotFoundMock")).toBeInTheDocument();
  });
});
