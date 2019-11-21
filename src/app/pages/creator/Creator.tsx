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
  readonly vm = CreatorVM.instance;
  readonly handler = () => this.vm.publish();
  readonly changed = name => event => this.vm[name] = event.target.value;
  readonly entered = event => {
    if (event.key === 'Enter') {
      this.vm.addTag(event.target.value);
      event.target.value = '';
    }
  };

  componentDidMount() {
    this.vm.clearRedirectID();
  }

  render() {
    if (this.vm.redirectID !== '' && this.vm.redirectID) {
      return <Redirect to={`article/${this.vm.redirectID}`}/>
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
            <TagList tagList={this.vm.tagList} store={this.vm}/>
          </div>
          <Button handler={this.handler}>Publish Article</Button>
        </div>
      </div>
    )
  }
}