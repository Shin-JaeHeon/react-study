import React from 'react';
import * as style from './creator.less';
import {observer} from 'mobx-react';
import TextInput from "../../widgets/input/text-input";
import Button from "../../widgets/input/button";
import {Redirect} from 'react-router-dom';
import TagList from "../../gadgets/editTagList/tagList";
import CreatorVM from "./creatorVM";
import {inputChanged} from '../../libs/lib';

@observer
export default class Creator extends React.Component {
    readonly vm = CreatorVM.instance;
    readonly handler = () => this.vm.publish();
    readonly changed = inputChanged(this.vm.article);
    readonly changed2 = inputChanged(this.vm);

    readonly tagRemoved = i => () => {
        this.vm.removeTag(i);
    };

    readonly entered = event => {
        if (event.key === 'Enter') {
            this.vm.addTag();
        }
    };

    componentDidMount() {
        this.vm.init();
    }

    render() {
        const {changed, changed2, handler, tagRemoved} = this;
        const {redirectID, article, currentTagValue} = this.vm;
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
                    <TextInput placeholder="Enter tags" onKeyDown={this.entered} onChange={changed2}
                               value={currentTagValue} name="currentTagValue"/>
                    <div className={style.tagsContainer}>
                        <TagList tagList={article.tagList} handler={tagRemoved}/>
                    </div>
                    <Button handler={handler}>Publish Article</Button>
                </div>
            </div>
        )
    }
}