import React from "react";
import Navbar from "./index";
import { shallow } from "enzyme";
import { BiHome, BiUser } from "react-icons/bi";

describe("Navbar testing", () => {
  test("Navbar contains link to home", () => {
    const wrapper = shallow(<Navbar />);
    const link = wrapper.find("a").filterWhere((n) => n.contains("Home"));
    expect(link.contains("Home")).toBeTruthy();
    expect(link.props().href).toBe("/");
    expect(link.containsMatchingElement(<BiHome />)).toBeTruthy();
  });
});
