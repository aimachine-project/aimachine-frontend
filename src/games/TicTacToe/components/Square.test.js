import React from "react";
import Square from "./Square";
import { shallow } from "enzyme";

describe("Square testing", () => {
  test("Should contain button with passed value", () => {
    const wrapper = shallow(<Square value="test" />);
    expect(wrapper.containsMatchingElement(<button>test</button>)).toBeTruthy();
  });
});
