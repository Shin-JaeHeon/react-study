import {observer} from "mobx-react";
import React from "react";
import TagListItem from "./tagListItem";
import * as style from './tagList.less';

interface Props {
    tagList: Array<string>;
    handler: (i) => (event) => void;
}


@observer
export default class TagList extends React.Component<Props> {
    render() {
        const { tagList, handler} = this.props;
        return (
            <div className={style.tags}>
                {tagList.map((tag, i) => (
                    <TagListItem tag={tag} key={i} handler={handler(i)}/>
                ))}
            </div>
        );
    }
}
