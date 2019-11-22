import React from 'react';
import * as style from './editor.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
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
  readonly changed = event => this.vm[event.target.name] = event.target.value;
  readonly entered = event => {
    if (event.key === 'Enter') {
      this.vm.addTag(event.target.value);
      event.target.value = '';
    }
  };

  componentDidMount() {
    this.vm.clearRedirectID();
    this.vm.load(this.props.match.params.id);
  }

  render() {
    const {changed} = this;
    if (this.vm.redirectID !== '') {
      return <Redirect to={`/article/${this.vm.redirectID}`}/>
    }
    return (
      <div className={style.editorContainer}>
        <div className={style.customForm}>
          <TextInput placeholder="Title" onChange={changed} name="title" value={this.vm.title}/>
          <TextInput placeholder="What's this article about?" onChange={changed} name="description"
                     value={this.vm.description}/>
          <textarea className={style.customTextArea} placeholder="Write your article (in markdown)"
                    onChange={changed} name="body" value={this.vm.body}/>
          <TextInput placeholder="Enter tags" onKeyDown={this.entered}/>
          <div className={style.tagsContainer}>
            <TagList tagList={this.vm.tagList} vm={this.vm}/>
          </div>
          <Button handler={this.handler}>Publish Article</Button>
        </div>
      </div>
    )
  }
}