import React, { Component } from 'react';
import { Input, Tooltip, Icon, message } from 'antd';
const { TextArea } = Input;


export default class Doc extends Component {
  state = {
    content: '',
    defaultContent: '',
    loadSuccess: false
  }

  componentDidMount() {
    this.reloadFile(this.props.filePath);
  }

  componentWillReceiveProps(nextProps) {
    this.reloadFile(nextProps.filePath);
  }

  reloadFile(filePath) {
    fs.readFile(filePath,'utf8', (err, data) => {
      if (err) {
        this.setState({
          loadSuccess: false
        });
        return;
      }
      this.setState({
        defaultContent: data,
        content: data,
        loadSuccess: true
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleSave = () => {
    fs.writeFile(this.props.filePath, this.state.content, (err) => {
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
          <TextArea
            rows={22}
            value={content}
            onChange={this.handleChange}
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
