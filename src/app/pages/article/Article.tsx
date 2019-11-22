import React from 'react';
import * as style from './article.less';
import {observer} from 'mobx-react';
import {Link, Redirect} from 'react-router-dom';
import Profile from "../../components/profile/profile";
import TagList from "../../components/tagList/tagList";
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

  render() {
    if (this.vm.isDeleted) {
      return <Redirect to={`/`}/>
    }
    return (
      <div className={style.articleContainer}>
        <div className={style.header}>
          <div className={style.inner}>
            <h1>{this.vm.article.title}</h1>
            <div className={style.profile}>
              <Profile username={this.vm.article.username} date={this.vm.article.date} image={this.vm.article.userImage}/>
              <Link to={`/editor/${this.vm.article.id}`}>
                <button className={style.editorButton}>Edit Article</button>
              </Link>
              <button className={style.deleteButton} onClick={this.deleteHandler}>Delete Article</button>
            </div>
          </div>
        </div>
        <div className={style.article}>
          <div className={style.inner}>
            <article>{this.vm.article.article}</article>
            <TagList tagList={this.vm.article.tags}/>
            <hr/>
          </div>
        </div>
      </div>
    )
  }
}
