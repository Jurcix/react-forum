import React from "react";
import { shallow } from "enzyme";
import InputField from "./input-field.js";
import { CSS_CLASSES } from "./constants.js";

describe("Input field", () => {  
  it("mounts component", () => {
    const wrapper = shallow(<InputField />);
    expect(wrapper).toBeTruthy();
  });

  it("is not focused", () => {
    const wrapper = shallow(<InputField />);
    expect(wrapper.state().isInputFieldFocused).toEqual(false);
  })

  describe("props are set correctly", () => {
    function testInputFieldProps(givenData, expectedResults) {
      const wrapper = shallow(
        <InputField
          id={givenData.id}
          className={CSS_CLASSES.FIELD}
          type={givenData.type}
          required={givenData.required}
          value={givenData.value}
          />
        );
  
      expect(wrapper.find("input").props()).toMatchObject(expectedResults);
    };

    const testCases = [
      {
        description: "when default values are used",
        givenData: {
          id: undefined,
          type: undefined,
          required: undefined,
          value: undefined,
        },
        expectedResults: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "",
        }
      },
      {
        description: "when type is not given but value is given",
        givenData: {
          id: undefined,
          type: undefined,
          required: undefined,
          value: "test text",
        },
        expectedResults: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "test text",
        }
      },
      {
        description: "when unknown type is given",
        givenData: {
          id: undefined,
          type: "random",
          required: undefined,
          value: undefined,
        },
        expectedResults: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "",
        }
      },
      {
        description: "when type is text and value is string",
        givenData: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "This is Test string #123!",
        },
        expectedResults: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "This is Test string #123!",
        }
      },
      {
        description: "when type is text and value is number",
        givenData: {
          id: undefined,
          type: "text",
          required: undefined,
          value: 123,
        },
        expectedResults: {
          id: undefined,
          type: "text",
          required: undefined,
          value: "123",
        }
      },
      {
        description: "when type is number and value is number",
        givenData: {
          id: undefined,
          type: "number",
          required: undefined,
          value: 123,
        },
        expectedResults: {
          id: undefined,
          type: "number",
          required: undefined,
          value: 123,
        }
      },
      {
        description: "when type is number and value is string",
        givenData: {
          id: undefined,
          type: "number",
          required: undefined,
          value: "123",
        },
        expectedResults: {
          id: undefined,
          type: "number",
          required: undefined,
          value: "",
        }
      },
      {
        description: "when type is password and value is string",
        givenData: {
          id: undefined,
          type: "password",
          required: undefined,
          value: "thisIsPassword",
        },
        expectedResults: {
          id: undefined,
          type: "password",
          required: undefined,
          value: "thisIsPassword",
        }
      },
      {
        description: "when id is given",
        givenData: {
          id: "testId123",
          type: undefined,
          required: undefined,
          value: undefined,
        },
        expectedResults: {
          id: "testId123",
          type: "text",
          required: undefined,
          value: "",
        }
      },
      {
        description: "when required is true",
        givenData: {
          id: "",
          type: undefined,
          required: true,
          value: undefined,
        },
        expectedResults: {
          id: "",
          type: "text",
          required: true,
          value: "",
        }
      },
      {
        description: "when required is false",
        givenData: {
          id: "",
          type: undefined,
          required: false,
          value: undefined,
        },
        expectedResults: {
          id: "",
          type: "text",
          required: false,
          value: "",
        }
      }
    ]

    testCases.forEach(testCase => {
      it(testCase.description, () => {
        testInputFieldProps(testCase.givenData, testCase.expectedResults);
      });
    });
  });

  describe("validation messages", () => {
    it("are rendered when provided only one", () => {
      const testValidationMessages = ["validation message"];
      const wrapper = shallow(<InputField validationMessages={testValidationMessages} />);

      expect(wrapper.exists(`.${CSS_CLASSES.VALIDATION_MESSAGE}`)).toBeTruthy();
      expect(wrapper.find(`.${CSS_CLASSES.VALIDATION_MESSAGE}`).text().trim()).toBe(testValidationMessages[0]);
    });
    it("are rendered when provided when provided multiple", () => {
      const testValidationMessages = ["validation message", "validation message 2", "validation message 3"];
      const wrapper = shallow(<InputField validationMessages={testValidationMessages} />);

      expect(wrapper.exists(`.${CSS_CLASSES.VALIDATION_MESSAGE}`)).toBeTruthy();
      expect(wrapper.find(`.${CSS_CLASSES.VALIDATION_MESSAGE}`).length).toBe(3);
    });
    it("are not rendered when not provided", () => {
      const wrapper = shallow(<InputField />);

      expect(wrapper.exists(`.${CSS_CLASSES.VALIDATION_MESSAGE}`)).toBeFalsy();
    });
  });

  describe("label", () => {
    it("is rendered when provided", () => {
      const testLabel = "this is label";
      const wrapper = shallow(<InputField label={testLabel} />);

      expect(wrapper.exists("label")).toBeTruthy();
      expect(wrapper.find("label").text().trim()).toBe(testLabel);
    });
    it("is not rendered when not provided", () => {
      const wrapper = shallow(<InputField />);

      expect(wrapper.exists("label")).toBeFalsy();
    });
    it("has label lowered class applied when field is empty", () => {
      const testLabel = "this is label";
      const expectedLabel = CSS_CLASSES.LABEL_LOWERED;
      const wrapper = shallow(<InputField label={testLabel} />);
      const resultLabel = wrapper.find("label").prop("className");

      expect(resultLabel).toMatch(expectedLabel);
    });
    it("has label raised class applied when field is not empty", () => {
      const testLabel = "this is label";
      const testValue = "this is value"
      const expectedLabel =  CSS_CLASSES.LABEL_RAISED;
      const wrapper = shallow(<InputField label={testLabel} value={testValue} />);
      const resultLabel = wrapper.find("label").prop("className");

      expect(resultLabel).toMatch(expectedLabel);
    });
    it("has label focused and raised classes applied when field is focused", () => {
      const testLabel = "this is label";
      const expectedLabelRaised = CSS_CLASSES.LABEL_RAISED;
      const expectedLabelFocused = CSS_CLASSES.LABEL_FOCUSED;
      const wrapper = shallow(<InputField label={testLabel} />);
      const mockEvent = {
        stopPropagation: () => {}
      };
      
      wrapper.find("input").simulate("focus", mockEvent);
      const resultLabel = wrapper.find("label").prop("className");

      expect(resultLabel).toMatch(expectedLabelRaised);
      expect(resultLabel).toMatch(expectedLabelFocused);
    });
  });

  it("onChange event changes state.value", () => {
    const wrapper = shallow(<InputField />);
    const mockEvent = {
      target: { value: "test text"},
      stopPropagation: () => {}
    };

    wrapper.find("input").simulate("change", mockEvent);
    
    expect(wrapper.state().value).toBe(mockEvent.target.value);
  });

  it("onFocus event sets state.isInputFieldFocused to true", () => {
    const wrapper = shallow(<InputField />);
    const mockEvent = {
      stopPropagation: () => {}
    };

    wrapper.find("input").simulate("focus", mockEvent);

    expect(wrapper.state().isInputFieldFocused).toBe(true);
  });

  it("onBlur event sets state.isInputFieldFocused to false", () => {
    const wrapper = shallow(<InputField />);
    const mockEvent = {
      stopPropagation: () => {}
    };

    wrapper.find("input").simulate("focus", mockEvent);
    wrapper.find("input").simulate("blur", mockEvent);

    expect(wrapper.state().isInputFieldFocused).toBe(false);      
  });
});
