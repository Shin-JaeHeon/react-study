import React from 'react';
import * as style from './creator.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import {Redirect} from 'react-router-dom';
import TagList from "../../components/editTagList/tagList";
import CreatorVM from "./creatorVM";
import {inputChanged} from '../../libs/lib';

@observer
export default class Creator extends React.Component {
    readonly vm = CreatorVM.instance;
    readonly handler = () => this.vm.publish();
    readonly changed = inputChanged(this.vm.article);
    readonly tagRemoved = i => () => this.vm.removeTag(i);
    readonly entered = event => {
        if (event.key === 'Enter') {
            this.vm.addTag(event.target.value);
            event.target.value = '';
        }
    };

    componentDidMount() {
        this.vm.init();
    }

    render() {
        const {changed, handler, tagRemoved} = this;
        const {redirectID, article} = this.vm;
        if (redirectID !== '' && redirectID) {
            return <Redirect to={`article/${redirectID}`}/>
        }
        return (
            <div className={style.editorContainer}>
                <div className={style.customForm}>
                    <TextInput placeholder="Title" onChange={changed} name="title"/>
                    <TextInput placeholder="What's this article about?" onChange={changed} name="description"/>
                    <textarea className={style.customTextArea} placeholder="Write your article (in markdown)"
                              name="body"
                              onChange={changed}/>
                    <TextInput placeholder="Enter tags" onKeyDown={this.entered}/>
                    <div className={style.tagsContainer}>
                        <TagList tagList={article.tagList} handler={tagRemoved}/>
                    </div>
                    <Button handler={handler}>Publish Article</Button>
                </div>
            </div>
        )
    }
}