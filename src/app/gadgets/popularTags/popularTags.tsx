import React from "react";
import {observer} from "mobx-react";
import TagListItem from '../tagList/tagListItem';
import * as style from './populartags.less';

interface Props {
    list: ReadonlyArray<string>;
    handler: (tag: string) => () => void;
}

@observer
export default class PopularTags extends React.Component<Props> {
    render() {
        const {handler, list} = this.props;
        return (
            <div className={style.tags}>
                <h4>Popular Tags</h4>
                {list.map((tag, i) => (
                    <TagListItem tag={tag} key={i} onClick={handler(tag)}/>
                ))}
            </div>
        );
    }
}