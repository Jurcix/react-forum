import React, { Component } from 'react';
import './App.css';

import InputField from "./ui-components/input-field/input-field"

class App extends Component {
  render() {
    return (
      <div>
        <InputField
          id="thisisid"
          type="text"
          placeholder="Placeholder"
          required={false}
          value="hello"
          label="Label"
          validationMessages={["this is validation message what happens if its a very super duper long validation message", "another message"]}
          handleChange={(event) => console.log(event.target.value)}
         />
      </div>
    );
  }
}

export default App;
