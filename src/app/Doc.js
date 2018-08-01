import React, { Component } from 'react';
import { Input, Affix, Button, Icon } from 'antd';
const { TextArea } = Input;


export default class Doc extends Component {
  state = {
    content: ''
  }

  componentDidMount() {
    fs.readFile(this.props.filePath,'utf8', (err, data) => {
      this.setState({
        content: data
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <TextArea
          rows={30}
          value={content}
          onChange={this.handleChange}
        />

        <Affix offsetBottom={20}>
          <Icon type="sync" />
          <Icon type="hdd" />
        </Affix>
      </div>
    )
  }
}
