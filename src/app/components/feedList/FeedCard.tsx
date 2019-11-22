import * as style from "./feedCard.less";
import React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import FeedCardTag from "./FeedCardTag";
import Article from "../../models/articleModel";

interface Props {
  article: Article,
  handler: (i: number) => void,
  i: number,
}

@observer
class FeedCard extends React.Component<Props> {
  updateLike = () => this.props.handler(this.props.i);

  render() {
    const {id, username, userImage, date, favoritesCount, title, description, tagList, isFavorite} = this.props.article;
    return (
      <div className={style.FeedCard}>
        <div className={style.top}>
          <div className={style.profile}>
            <div className={style.image}>
              <Link to={'/@' + username}>
                <img src={userImage} alt=""/>
              </Link>
            </div>
            <div className={style.info}>
              <Link to={'/@' + username}>
                <div className={style.author}>{username}</div>
              </Link>
              <div className={style.date}>{date}</div>
            </div>
          </div>
          <button className={style.like} onClick={this.updateLike} data-liked={isFavorite}>
            <span className={style.count}>❤ {favoritesCount}</span>
          </button>
        </div>
        <Link to={`/article/${id}`}>
          <article>
            <div className={style.title}>{title}</div>
            <div className={style.text}>{description}</div>
          </article>
          <div className={style.bottom}>
            <div>Read more...</div>
            <div className={style.tags}>
              {tagList.map((tag, i) => (
                <FeedCardTag tag={tag} key={i}/>
              ))}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default FeedCard;
