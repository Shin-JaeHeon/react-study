import {observer} from "mobx-react";
import React from "react";
import * as style from './popularTagList.less';
import TagListItem from '../../../../components/tagList/tagListItem';

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
          <TagListItem tag={tag} key={i} onClick={this.props.handler(tag)}/>
        ))}
      </div>
    );
  }
}
