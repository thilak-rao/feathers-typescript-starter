import React, { Component } from 'react';
import { Grid, Input, Button, Segment } from 'semantic-ui-react';
import './App.css';
import isURL from 'is-url';

const theme = {
  error: "#9f3a38"
};

const globalStyle = {
  margin: '14px'
};

const css = {
  input: {
    width: '100%'
  },
  inputContainer: {
    marginTop: '50px'
  },
  buttonMargin: {
    marginTop: globalStyle.margin
  },
  inputError: {
    color: theme.error
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      validationError: false,
      showLoading: false
    }
  }

  showLoading() {
    this.setState({
      showLoading: true,
    });
  }

  hideLoading() {
    this.setState({
      showLoading: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.showLoading();
    if (isURL(this.state.url)) {
      this.setState({
        validationError: false,
      });

    } else {
      this.setState({
        validationError: true,
      });
    }
    this.hideLoading();
  }

  updateUrl(e) {
    this.setState({
      url: `http://${e.target.value}`
    })
  }

  render() {
    return (
      <Grid columns={2} verticalAlign={'middle'} container={true} stackable={true} centered>
        <Grid.Row>
          <Grid.Column>
            <Segment stacked style={css.inputContainer}>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="urlInput">
                  Please type a URL
                  <Input label='http://' name={"urlInput"} placeholder='Enter URL' style={css.input} focus
                         onChange={(e) => this.updateUrl(e)} error={this.state.validationError}
                         loading={this.state.showLoading} />
                </label>
                {this.state.validationError && <InputError></InputError>}
                <Button content='Visualize' primary style={css.buttonMargin} type={"submit"}/>
              </form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function InputError(){
  return (
    <div style={css.inputError}>
      <p>Please type a valid <a href="https://en.wikipedia.org/wiki/Hostname">hostname</a></p>
    </div>
  );
}

export default App;
