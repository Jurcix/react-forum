import React, {Component} from "react";
import "./input-field.scss";
import { CSS_CLASSES, INPUT_TYPE } from "./constants";

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInputFieldFocused: false,
      value: this._getInitialValue(props.value, props.type)
    };
  }

  _getInitialValue(providedValue, inputType) {
    let value = providedValue;

    if(typeof providedValue === "undefined") {
      value = "";
    }    
    if(inputType !== INPUT_TYPE.NUMBER && typeof providedValue === "number") {
      value = providedValue.toString();
    } 
    if(inputType === INPUT_TYPE.NUMBER && typeof providedValue !== "number") {
      value = "";
    }    
    return value;
  }

  _getFieldType(providedType) {
    let type = INPUT_TYPE.TEXT;

    if(providedType === INPUT_TYPE.NUMBER) {
      type = providedType;
    }
    if(providedType === INPUT_TYPE.PASSWORD) {
      type = providedType
    }

    return type;
  }

  _handleChange(event) {
    this.setState({ value: event.target.value })
    event.stopPropagation();
  }

  _handleFocus(event) {
    this.setState({ isInputFieldFocused: true });
    event.stopPropagation();
  }

  _handleBlur(event) {
    this.setState({ isInputFieldFocused: false });
    event.stopPropagation();
  }

  _getLabelClassName() {
    let className = CSS_CLASSES.LABEL;
    if (this.state.value || this.state.isInputFieldFocused) {
      className = `${className} ${CSS_CLASSES.LABEL_RAISED}`

      if (this.state.isInputFieldFocused) {
        className = `${className} ${CSS_CLASSES.LABEL_FOCUSED}`;
      }
    } else {
      className = `${className} ${CSS_CLASSES.LABEL_LOWERED}`;
    }

    return className;
  }

  render() {
    const {
      id,
      type,
      required,
      label,
      validationMessages = [],
    } = this.props;

    return (
      <div className={CSS_CLASSES.INPUT_WRAPPER}>
        {label && <label className={this._getLabelClassName()} htmlFor={id}> {label} </label>}
        <input
          id={id}
          className={CSS_CLASSES.FIELD}
          type={this._getFieldType(type)}
          required={required}
          value={this.state.value}
          onChange={(event) => this._handleChange(event)}
          onFocus={(event) => this._handleFocus(event)}
          onBlur={(event) => this._handleBlur(event)}
        />
        {validationMessages.length > 0 &&
          validationMessages.map(
            (message, key) => (
              <p className={CSS_CLASSES.VALIDATION_MESSAGE} key={key}> {message} </p>
            )
          )
        }
      </div>
    )
  }
}

export default InputField;
