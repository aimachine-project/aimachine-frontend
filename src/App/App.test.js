import React from "react";
import App from "./index.js";
import { shallow } from "enzyme";

describe("Test App component", () => {
  test("App contains PageContent", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("PageContent")).toBeTruthy();
  });

  test("App contains Navbar", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Navbar")).toBeTruthy();
  });
});
