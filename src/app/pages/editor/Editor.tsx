import React from 'react';
import * as style from './editor.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import {Redirect} from 'react-router-dom';
import TagList from "../../gadgets/editTagList/tagList";
import EditorVM from "./editorVM";
import {inputChanged} from '../../libs/lib';

interface Props {
    match: any;
}

@observer
export default class Editor extends React.Component<Props> {
    readonly vm = EditorVM.instance;
    readonly handler = () => this.vm.update();
    readonly changed = inputChanged(this.vm);
    readonly tagRemoved = i => () => this.vm.removeTag(i);
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
        const {changed, tagRemoved, handler} = this;
        const {description, title, body, tagList} = this.vm.article;

        if (this.vm.redirectID !== '') {
            return <Redirect to={`/article/${this.vm.redirectID}`}/>
        }
        return (
            <div className={style.editorContainer}>
                <div className={style.customForm}>
                    <TextInput placeholder="Title" onChange={changed} name="title" value={title}/>
                    <TextInput placeholder="What's this article about?" onChange={changed} name="description"
                               value={description}/>
                    <textarea className={style.customTextArea} placeholder="Write your article (in markdown)"
                              onChange={changed} name="body" value={body}/>
                    <TextInput placeholder="Enter tags" onKeyDown={this.entered}/>
                    <div className={style.tagsContainer}>
                        <TagList tagList={tagList} handler={tagRemoved}/>
                    </div>
                    <Button handler={handler}>Publish Article</Button>
                </div>
            </div>
        )
    }
}