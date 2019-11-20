import React from 'react';
import './button.less';
import {observer} from 'mobx-react';

interface Props {
  handler: (event) => void;
}

@observer
export default class Button extends React.Component<Props> {
  render() {
    return (
      <button onClick={this.props.handler}>
        {this.props.children}
      </button>
    )
  }
}