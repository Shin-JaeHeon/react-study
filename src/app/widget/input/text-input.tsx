import React from 'react';
import './text-input.less';
import {observer} from 'mobx-react';

interface Props {
  placeholder: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (event) => void;
  onKeyDown?: (event) => void;
}

@observer
export default class TextInput extends React.Component<Props> {
  static defaultProps = {
    type: 'text',
    name: '',
  };

  render() {
    return (<input
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    )
  }
}