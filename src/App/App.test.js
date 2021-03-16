import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./index.js";

test("renders learn react link", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Game Name/i);
  expect(linkElement).toBeInTheDocument();
});
