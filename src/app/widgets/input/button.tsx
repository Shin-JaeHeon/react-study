import React from 'react';
import * as style from './button.less';
import {observer} from 'mobx-react';

interface Props {
  handler: (event) => void;
}

@observer
export default class Button extends React.Component<Props> {
  render() {
    return (
      <button onClick={this.props.handler} className={style.customButton}>
        {this.props.children}
      </button>
    )
  }
}