import * as React from "react";
import FeedCard from "./FeedCard";
import {observer} from "mobx-react";
import Article from "../../models/articleModel";

interface Props {
    articleList: Array<Article>,
    handler: (i: number) => void,
}

@observer
export default class FeedList extends React.Component<Props> {
    render() {
        return (
            <div className="feeds">
                {this.props.articleList.map((article, i) => (
                    <FeedCard
                        key={i}
                        article={article}
                        i={i}
                        handler={this.props.handler}
                    />
                ))}
            </div>
        );
    }
}