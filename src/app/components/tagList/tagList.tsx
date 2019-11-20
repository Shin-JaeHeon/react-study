import {observer} from "mobx-react";
import React from "react";
import TagListItem from "./tagListItem";
import * as style from './tagList.less';

interface Props {
  tagList: ReadonlyArray<string>;
}


@observer
export default class TagList extends React.Component<Props> {
  render() {
    return (
      <div className={style.tags}>
        {this.props.tagList.map((tag, i) => (
          <TagListItem tag={tag} key={i}/>
        ))}
      </div>
    );
  }
}
