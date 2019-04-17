import * as React from "react";
import { Meta } from "../components/Meta";
import { NavBar } from "../components/NavBar";
import { Form, Field } from "react-final-form";
import { MarkdownEditor } from "../components/MarkdownEditor";
import { getTitleForHire } from "../lib/common/title";

export default class Hire extends React.Component<any> {
  onSubmit = (values: object) => {
    console.log(values);
  };

  render() {
    return (
      <div>
        <Meta title={getTitleForHire()} />
        <NavBar />
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="box-white">
                <div className="box-white-content">
                  <Form
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, pristine, invalid }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="field">
                          <label className="label">First Name</label>
                          <Field
                            className="input"
                            name="firstName"
                            component="input"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="field">
                          <Field
                            className="textarea"
                            name="description"
                            component={MarkdownEditor}
                          />
                        </div>

                        <button
                          className="button is-primary"
                          type="submit"
                          disabled={pristine || invalid}
                        >
                          Submit
                        </button>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    );
  }
}
