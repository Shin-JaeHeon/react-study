import {observer} from "mobx-react";
import React from "react";
import * as style from './tagList.less';

interface Props {
  tag: string;
}

@observer
export default class TagListItem extends React.Component<Props> {
  render() {
    return (<div className={style.tag}>{this.props.tag}</div>);
  }
}