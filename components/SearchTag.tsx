import React from "react";
import Select from "react-select";
import { ValueType } from "react-select/lib/types";
import * as Styles from "react-select/lib/styles";

Styles.defaultStyles;

const options: any = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export class SearchTags extends React.Component<
  {},
  { selectedOption: ValueType<string> | null }
> {
  state = {
    selectedOption: null
  };
  handleChange = (selectedOption: ValueType<string>) => {
    injectGlobalStyles;
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
