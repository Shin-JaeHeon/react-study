import React from "react";
import {observer} from "mobx-react";
import * as style from './profile.less';

interface Props {
  username:string;
  date:string;
  image:string;
}
@observer
export default class Profile extends React.Component<Props> {
  render() {
    const {image, username, date} = this.props;
    return (
      <div className={style.profile}>
        <div className={style.image}>
          <img src={image} alt=""/>
        </div>
        <div className={style.info}>
          <div className={style.author}>{username}</div>
          <div className={style.date}>{date}</div>
        </div>
      </div>
    )
  }
}