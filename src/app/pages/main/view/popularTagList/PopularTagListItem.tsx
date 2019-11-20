import {observer} from "mobx-react";
import React from "react";
import * as style from './popularTagList.less';

interface Props {
  tag: string;
  handler: ()=> void;
}

@observer
export default class PopularTagListItem extends React.Component<Props> {
  render() {
    return (<div className={style.tag} onClick={this.props.handler}>{this.props.tag}</div>);
  }
}
