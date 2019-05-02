import React from "react";
import { shallow } from "enzyme";
import InputField from "./input-field.js";

describe("Input field", () => {
  describe("default state", () => {
    const wrapper = shallow(<InputField />);

    test("renders input field with an empty string value", () => {
      expect(wrapper.find("input").props().value).toEqual("");
    });

    test("renders input with required set to false", () => {
      expect(wrapper.find("input").props().required).toBeFalsy();
    });

    test("renders without label element", () => {
      expect(wrapper.exists("label")).toBeFalsy()
    });

    test("renders without validation messages", () => {
      expect(wrapper.exists("input-field__validation-message")).toBeFalsy();
    });
  });
});
