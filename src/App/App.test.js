import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./index.js";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Game Name/i);
  expect(linkElement).toBeInTheDocument();
});
