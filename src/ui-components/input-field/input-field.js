import React, {Component} from "react";
import "./input-field.scss";

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInputFieldFocused: false,
      value: props.value || ''
    };
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
    let className = "empty-field";
    if (this.state.value) {
      className = "non-empty-field"
    }
    if (this.state.isInputFieldFocused) {
      className = "focused"
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
      <div className="input-field">
        <label className={this._getLabelClassName()} htmlFor={id}> {label} </label>
        <input
          id={id}
          type={type}
          required={required}
          onChange={(event) => this._handleChange(event)}
          onFocus={(event) => this._handleFocus(event)}
          onBlur={(event) => this._handleBlur(event)}
          value={this.state.value}
        />
        {validationMessages.length > 0 &&
          validationMessages.map(
            (message, key) => (
                <p className="input-field__validation-message" key={key}> {message} </p>
            )
          )
        }
      </div>
    )
  }
}

export default InputField;
