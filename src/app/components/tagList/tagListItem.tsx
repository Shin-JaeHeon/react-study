import {observer} from "mobx-react";
import React from "react";
import * as style from './tagList.less';

interface Props {
  tag: string;
  onClick?: (event) => void;
}

@observer
export default class TagListItem extends React.Component<Props> {
  render() {
    const {tag, onClick} = this.props;
    return (<div className={style.tag} onClick={onClick}>{tag}</div>);
  }
}