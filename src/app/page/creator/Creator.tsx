import React from 'react';
import * as style from './creator.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import {Redirect} from 'react-router-dom';
import TagList from "../../components/editTagList/tagList";
import CreatorVM from "./creatorVM";

@observer
export default class Creator extends React.Component {
  readonly store = CreatorVM.instance;
  readonly handler = () => this.store.publish();
  readonly changed = name => event => this.store[name] = event.target.value;
  readonly entered = event => {
    if (event.key === 'Enter') {
      this.store.addTag(event.target.value);
      event.target.value = '';
    }
  };

  componentDidMount() {
    this.store.clearRedirectID();
  }

  render() {
    if (this.store.redirectID !== '') {
      return <Redirect to={`article/${this.store.redirectID}`}/>
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <TextInput placeholder="Title" onChange={this.changed('title')}/>
          <TextInput placeholder="What's this article about?" onChange={this.changed('description')}/>
          <textarea className={style.customTextArea} placeholder="Write your article (in markdown)"
                    onChange={this.changed('body')}/>
          <TextInput placeholder="Enter tags" onKeyDown={this.entered}/>
          <div className={style.tagsContainer}>
            <TagList tagList={this.store.tagList} store={this.store}/>
          </div>
          <Button handler={this.handler}>Publish Article</Button>
        </div>
      </div>
    )
  }
}