import {observer} from "mobx-react";
import React from "react";
import * as style from './tagList.less';

interface Props {
  tag: string;
  handler: (event) => void;
}

@observer
export default class TagListItem extends React.Component<Props> {

  render() {
    return (
      <div className={style.tag}>
        <span className={style.remove} onClick={this.props.handler}>×</span>
        {this.props.tag}
      </div>);
  }
}
