import Autosuggest, {
  ChangeEvent,
  InputProps,
  SuggestionsFetchRequestedParams
} from "react-autosuggest";
import "./TagSearchBox.scss";
import * as React from "react";

export interface TahOption {
  name: string;
  jobs: number;
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: TahOption) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: TahOption) => (
  <div>{suggestion.name}</div>
);

export interface TagSearchBoxProps {
  getTags: (text: string) => Promise<Array<TahOption>>;
}

export class TagSearchBox extends React.Component<
  TagSearchBoxProps,
  { value: string; suggestions: TahOption[] }
> {
  constructor(props: TagSearchBoxProps) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (_event: React.FormEvent<any>, { newValue }: ChangeEvent) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({
    value
  }: SuggestionsFetchRequestedParams) => {
    const { getTags } = this.props;

    const suggestions = await getTags(value);
    this.setState({
      suggestions: suggestions
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onBlur = (
    _event: React.FormEvent<any>,
    _params?: Autosuggest.BlurEvent<TahOption>
  ): void => {
    console.log(this.state.value);
    console.log(this.state.suggestions);
    if (
      this.state.suggestions.filter(
        x => x.name.toLowerCase() === this.state.value.toLowerCase()
      ).length === 0
    ) {
      this.setState({
        value: ""
      });
    }
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps: InputProps<TahOption> = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
