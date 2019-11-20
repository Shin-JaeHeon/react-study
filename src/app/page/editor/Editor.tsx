import React from 'react';
import * as style from './editor.less';
import {observer} from 'mobx-react';
import TextInput from "../../widget/input/text-input";
import Button from "../../widget/input/button";
import {Redirect} from 'react-router-dom';
import TagList from "../../components/editTagList/tagList";
import EditorVM from "./editorVM";

interface Props {
  match: any;
}

@observer
export default class Editor extends React.Component<Props> {
  readonly vm = EditorVM.instance;
  readonly handler = () => this.vm.update();
  readonly changed = name => event => this.vm[name] = event.target.value;
  readonly entered = event => {
    if (event.key === 'Enter') {
      this.vm.addTag(event.target.value);
      event.target.value = '';
    }
  };

  componentDidMount() {
    this.vm.clearRedirectID();
    this.vm.id = this.props.match.params.id;
    this.vm.load();
  }

  render() {
    if (this.vm.redirectID !== '') {
      return <Redirect to={`/article/${this.vm.redirectID}`}/>
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <TextInput placeholder="Title" onChange={this.changed('title')} value={this.vm.title}/>
          <TextInput placeholder="What's this article about?" onChange={this.changed('description')}
                     value={this.vm.description}/>
          <textarea className={style.customTextArea} placeholder="Write your article (in markdown)"
                    onChange={this.changed('body')} value={this.vm.body}/>
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