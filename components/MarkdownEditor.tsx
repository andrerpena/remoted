import * as React from "react";
import "react-mde/lib/styles/scss/react-mde-all.scss";
import * as Showdown from "showdown";
import ReactMde from "react-mde";

export interface MarkdownEditorState {
  tab: "write" | "preview";
}

export class MarkdownEditor extends React.Component<any, MarkdownEditorState> {
  converter: Showdown.Converter;

  handleValueChange = (value: string) => {
    const {
      input: { onChange }
    } = this.props;
    onChange(value);
  };

  handleTabChange = (tab: "write" | "preview") => {
    this.setState({ tab });
  };

  constructor(props: any) {
    super(props);
    this.state = {
      tab: "write"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  render() {
    const {
      input: { value }
    } = this.props;
    return (
      <ReactMde
        onChange={this.handleValueChange}
        onTabChange={this.handleTabChange}
        value={value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
        selectedTab={"write"}
      />
    );
  }
}
