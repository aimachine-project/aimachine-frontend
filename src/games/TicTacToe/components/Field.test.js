import React from "react";
import Field from "./Field";
import { shallow } from "enzyme";

describe("Field testing", () => {
  test("Should contain button with passed value", () => {
    const wrapper = shallow(<Field value="test" />);
    expect(wrapper.containsMatchingElement(<button>test</button>)).toBeTruthy();
  });
});
