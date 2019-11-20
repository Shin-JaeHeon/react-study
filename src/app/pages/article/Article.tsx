import React from 'react';
import * as style from './article.less';
import {observer} from 'mobx-react';
import {Link, Redirect} from 'react-router-dom';
import Profile from "./views/profile/profile";
import TagList from "../../components/tagList/tagList";
import ArticleVM from "./articleVM";

interface Props {
  match: any;
}

@observer
export default class Article extends React.Component<Props> {
  readonly store = ArticleVM.instance;

  deleteHandler = () => {
    this.store.delete();
  };

  componentDidMount() {
    this.store.load(this.props.match.params.id);
  }

  render() {
    if (this.store.isDeleted) {
      return <Redirect to={`/`}/>
    }
    return (
      <div className={style.articleContainer}>
        <div className={style.header}>
          <div className={style.inner}>
            <h1>{this.store.article.title}</h1>
            <div className={style.profile}>
              <Profile username={this.store.article.username} date={this.store.article.date} image={this.store.article.userImage}/>
              <Link to={`/editor/${this.store.article.id}`}>
                <button className={style.editorButton}>Edit Article</button>
              </Link>
              <button className={style.deleteButton} onClick={this.deleteHandler}>Delete Article</button>
            </div>
          </div>
        </div>
        <div className={style.article}>
          <div className={style.inner}>
            <article>{this.store.article.article}</article>
            <TagList tagList={this.store.article.tags}/>
            <hr/>
          </div>
        </div>
      </div>
    )
  }
}
