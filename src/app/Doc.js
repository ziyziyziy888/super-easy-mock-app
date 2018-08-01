import React, { Component } from 'react';
import { Tooltip, Icon, message } from 'antd';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';


// 这个组件的 filePath 有一个特殊的地方，_可能会被外部修改
export default class Doc extends Component {
  state = {
    content: '',
    defaultContent: '',
    truePath: '',
    loadSuccess: false
  }

  componentDidMount() {
    this.reloadFile(this.props.filePath);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filePath !== this.props.filePath) {
      this.reloadFile(nextProps.filePath);
    }
  }

  reloadFile(filePath) {
    let paths = filePath.split('/');
    let name = paths.pop();
    paths = paths.join('/') + '/';
    let newName = name[0] === '_' ? name.slice(1) : '_' + name;

    fs.readFile(paths + name, 'utf8', (err, data) => {
      if (err) {
        fs.readFile(paths + newName, 'utf8', (err, data) => {
          if (err) {
            this.setState({
              loadSuccess: false
            })
            return;
          }
          this.setState({
            defaultContent: data,
            content: data,
            truePath: paths + newName,
            loadSuccess: true
          });
        });
        return;
      }
      this.setState({
        defaultContent: data,
        content: data,
        truePath: paths + name,
        loadSuccess: true
      });
    });
  }

  handleChange = (newVal) => {
    this.setState({
      content: newVal
    });
  }

  handleSave = () => {
    fs.writeFile(this.state.truePath, this.state.content, (err) => {
      if (!err) {
        message.success('保存成功');
        this.setState({
          defaultContent: this.state.content
        });
      } else {
        message.error(err);
      }
    });
  }

  render() {
    const { content, defaultContent, loadSuccess } = this.state;
    const { filePath } = this.props;

    return (
      <div style={styles.outerContainer}>
        <h2>{filePath}</h2>

        {loadSuccess && (
          <AceEditor
            mode="json"
            theme="github"
            onChange={this.handleChange}
            name="hualalala"
            editorProps={{$blockScrolling: true}}
            value={content}
            style={{width: '100%'}}
          />
        )}

        {content !== defaultContent && (
          <div style={styles.iconContainer} onClick={this.handleSave}>
            <Tooltip placement="left" title="点击保存修改">
              <Icon type="hdd" />
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  outerContainer: {
    position: 'relative'
  },
  iconContainer: {
    position: 'absolute',
    cursor: 'pointer',
    right: 20,
    bottom: 20,
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    width: 36, height: 36, lineHeight: '36px', textAlign: 'center',
    borderRadius: '100%'
  }
}
