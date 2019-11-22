import {observer} from "mobx-react";
import React from "react";
import TagListItem from "./tagListItem";
import * as style from './tagList.less';

interface Props {
  vm: {
    tagList
  };
  tagList: ReadonlyArray<string>;
}


@observer
export default class TagList extends React.Component<Props> {
  handler = i => () => {
    this.props.vm.tagList =
      this.props.vm.tagList.reduce((prev, now, index) => index !== i ? [...prev, now] : prev, []);
  };

  render() {
    return (
      <div className={style.tags}>
        {this.props.tagList.map((tag, i) => (
          <TagListItem tag={tag} key={i} handler={this.handler(i)}/>
        ))}
      </div>
    );
  }
}
