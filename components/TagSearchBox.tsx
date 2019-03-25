import Autosuggest, {
  ChangeEvent,
  InputProps,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams
} from "react-autosuggest";
import "./TagSearchBox.scss";
import * as React from "react";

export interface TagOption {
  name: string;
  jobs: number;
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: TagOption) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion: TagOption) => (
  <div>{suggestion.name}</div>
);

export interface TagSearchBoxProps {
  initialValue: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onSelectTag: (tag: string) => void;
}

export class TagSearchBox extends React.Component<TagSearchBoxProps,
  { value: string; suggestions: TagOption[] }> {
  constructor(props: TagSearchBoxProps) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: props.initialValue || "",
      suggestions: []
    };
  }

  onChange = (_event: React.FormEvent<any>, { newValue }: ChangeEvent) => {
    this.setState({
      value: newValue
    });
    // if (newValue) {
    //   this.props.onSelectTag(newValue);
    // }
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

  onBlur = (): void => {
    console.log(this.state.value);
    console.log(this.state.suggestions);
    if (
      this.state.suggestions.filter(
        x => x.name.toLowerCase() === this.state.value.toLowerCase()
      ).length === 0
    ) {
      this.setState({
        value: this.state.suggestions.length
          ? this.state.suggestions[0].name
          : ""
      });
    }
  };

  onSuggestionSelected = (
    _event: React.FormEvent,
    data: SuggestionSelectedEventData<TagOption>
  ) => {
    this.props.onSelectTag(data.suggestion.name);
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps: InputProps<TagOption> = {
      placeholder: "Search tags. Ex: reactjs",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
      className: "input is-medium"
    };

    // Finally, render it!
    return (
      <div className="tag-search-box">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          onSuggestionSelected={this.onSuggestionSelected}
        />
      </div>
    );
  }
}
