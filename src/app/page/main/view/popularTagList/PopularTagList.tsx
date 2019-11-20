import {observer} from "mobx-react";
import React from "react";
import PopularTagListItem from "./PopularTagListItem";
import * as style from './popularTagList.less';

interface Props {
  tagList: ReadonlyArray<string>,
  handler: (tag) => () => void,
}

@observer
export default class PopularTagList extends React.Component<Props> {
  render() {
    return (
      <div className={style.tags}>
        <div className={style.title}>Popular Tags</div>
        {this.props.tagList.map((tag, i) => (
          <PopularTagListItem tag={tag} key={i} handler={this.props.handler(tag)}/>
        ))}
      </div>
    );
  }
}
