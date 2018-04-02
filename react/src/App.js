import React, {Component} from 'react';
import {Grid, Input, Button, Segment, Table, Header} from 'semantic-ui-react';
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
      showLoading: false,
      sitemapAvailable: false,
      tableData: [],
      sitemapUrl: '',
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
      fetch('/sitemap', {
        method: 'POST',
        body: JSON.stringify({url: this.state.url}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
        .then((res) => res.json())
        .then((json) => {
          this.hideLoading();
          this.setState({
            sitemapAvailable: true,
            tableData: json.sites,
            sitemapUrl: json.url,
          });
        }, (error) => {
          console.error(error);
          this.hideLoading();
          this.setState({
            error
          })
        })
    } else {
      this.hideLoading();
      this.setState({
        validationError: true,
      });
    }
  }

  updateUrl(e) {
    this.setState({
      url: `http://${e.target.value}`
    })
  }

  render() {
    return (
      <Grid columns={1} container={true} stackable={true}>
        <Grid.Row>
          <Grid.Column>
            <Segment stacked style={css.inputContainer}>
              <Header as='h1'>sitemap.xml viewer</Header>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="urlInput">
                  Please type a URL
                  <Input label='http://' name={"urlInput"} placeholder='Enter URL' style={css.input} focus
                         onChange={(e) => this.updateUrl(e)} error={this.state.validationError}
                         loading={this.state.showLoading}/>
                </label>
                {this.state.validationError && <InputError></InputError>}
                <Button content="Show 'Em" primary style={css.buttonMargin} type={"submit"}/>
              </form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        {this.state.sitemapAvailable && <Grid.Row><Grid.Column><Header as='h3'>{this.state.sitemapUrl}</Header></Grid.Column></Grid.Row>}
        {this.state.sitemapAvailable && <Grid.Row stretched><Grid.Column stretched><SiteMapTable data={this.state.tableData} /></Grid.Column></Grid.Row>}
      </Grid>
    );
  }
}

function InputError() {
  return (
    <div style={css.inputError}>
      <p>Please type a valid <a href="https://en.wikipedia.org/wiki/Hostname">hostname</a></p>
    </div>
  );
}

class SiteMapTable extends Component {
  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Index</Table.HeaderCell>
            <Table.HeaderCell>URL</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <SiteMapTableBody data={this.props.data} />
      </Table>
    );
  }
}

class SiteMapTableBody extends Component {
  render() {
    let cells = this.props.data.map((link, count) => {
      count += 1;
      return (
        <Table.Row key={count}>
          <Table.Cell>{count}</Table.Cell>
          <Table.Cell><a href={link} target={"_blank"}>{link}</a></Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Table.Body>
        { cells }
      </Table.Body>
    );
  }
}

export default App;
