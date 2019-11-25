import React from "react";
import * as style from "./feedCard.less";

interface Props {
    tag: string;
}

export default class FeedCardTag extends React.Component<Props> {
    render() {
        const {tag} = this.props;
        return <div className={style.tag}>{tag}</div>;
    }
}
