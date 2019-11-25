import React from 'react';
import * as style from './article.less';
import {observer} from 'mobx-react';
import {Link, Redirect} from 'react-router-dom';
import Profile from "../../gadgets/profile/profile";
import TagList from "../../gadgets/tagList/tagList";
import ArticleVM from "./articleVM";

interface Props {
    match: any;
}

@observer
export default class Article extends React.Component<Props> {
    readonly vm = ArticleVM.instance;

    deleteHandler = () => {
        this.vm.delete();
    };

    componentDidMount() {
        this.vm.load(this.props.match.params.id);
    }

    componentDidUpdate() {
        this.vm.load(this.props.match.params.id);
    }

    render() {
        const {isDeleted, article} = this.vm;
        if (isDeleted) {
            return <Redirect to={`/`}/>
        }
        return (
            <div className={style.articleContainer}>
                <div className={style.header}>
                    <div className={style.inner}>
                        <h1>{article.title}</h1>
                        <div className={style.profile}>
                            <Profile username={article.username} date={article.date} image={article.userImage}/>
                            <Link to={`/editor/${article.id}`}>
                                <button className={style.editorButton}>Edit Article</button>
                            </Link>
                            <button className={style.deleteButton} onClick={this.deleteHandler}>Delete Article</button>
                        </div>
                    </div>
                </div>

                <div className={style.article}>
                    <div className={style.inner}>
                        <article>{article.body}</article>
                        <TagList tagList={article.tagList}/>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }
}
