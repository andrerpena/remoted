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
  count: number;
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: TagOption) => suggestion.name;

export interface TagSearchBoxProps {
  initialValue: string;
  getTags: (text: string) => Promise<Array<TagOption>>;
  onSelectTag: (tag: string) => void;
}

export interface TextSearchBoxProps {
  value: string;
  selectedSuggestion: string;
  suggestions: TagOption[];
}

// Important behavior:
// When you click a suggestion, clear suggestions happens but no onBlur
// When you click out, the onBlur happens but no suggestion selection
export class TagSearchBox extends React.Component<
  TagSearchBoxProps,
  TextSearchBoxProps
> {
  constructor(props: TagSearchBoxProps) {
    super(props);

    this.state = {
      value: props.initialValue || "",
      selectedSuggestion: "",
      suggestions: []
    };
  }

  onChange = (_event: React.FormEvent<any>, { newValue }: ChangeEvent) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = async ({
    value
  }: SuggestionsFetchRequestedParams) => {
    const { getTags } = this.props;

    const suggestions = await getTags(value.toLowerCase());
    this.setState({
      suggestions: processTags(suggestions, value.toLowerCase())
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onBlur = (): void => {
    if (this.state.value !== this.state.selectedSuggestion) {
      // In this case, the selection is invalid because this.state.value !== this.state.selectedSuggestion
      // Hence I need to either fix the selection if possible or clear it
      if (
        this.state.suggestions.filter(
          x => x.name.toLowerCase() === this.state.value.toLowerCase()
        ).length === 0
      ) {
        const tag = this.state.suggestions.length
          ? this.state.suggestions[0].name
          : "";
        this.setState({ value: tag, selectedSuggestion: tag });
        this.props.onSelectTag(tag);
      }
    }
  };

  onSuggestionSelected = (
    _event: React.FormEvent,
    data: SuggestionSelectedEventData<TagOption>
  ) => {
    this.setState({ selectedSuggestion: data.suggestion.name });
    this.props.onSelectTag(data.suggestion.name);
  };

  render() {
    const { onSelectTag } = this.props;
    const { value, suggestions } = this.state;

    const inputProps: InputProps<TagOption> = {
      placeholder: "Search tags. Ex: reactjs",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
      className: "input is-medium"
    };

    const renderInputComponent = (inputProps: InputProps<TagOption>) => (
      <div className="field has-addons">
        <div className="control is-expanded">
          <input {...inputProps as any} />
        </div>
        <div className="control">
          <a
            className="button is-medium"
            onClick={() => (value ? onSelectTag(value) : null)}
          >
            {" "}
            <i className="fas fa-search" />{" "}
          </a>
        </div>
      </div>
    );

    const renderSuggestion = (suggestion: TagOption) => (
      <div>
        <span className="tag-name">{suggestion.name}</span>
        <span className="tag-count">{suggestion.count} active jobs</span>
      </div>
    );

    // Finally, render it!
    return (
      <div className="tag-search-box">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          onSuggestionSelected={this.onSuggestionSelected}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
        />
      </div>
    );
  }
}

export function processTags(
  options: TagOption[],
  currentText: string
): TagOption[] {
  try {
    if (!options || !options.length) {
      return [];
    }

    const result = [];
    const exactMatch = options.filter(
      i => i.name.toLowerCase() === currentText.toLowerCase()
    );
    if (exactMatch.length) {
      result.push(exactMatch[0]);
    }
    return [
      ...result,
      ...options.filter(t => t.name.toLowerCase() !== currentText.toLowerCase())
    ].slice(0, 5);
  } catch {
    return options;
  }
}
