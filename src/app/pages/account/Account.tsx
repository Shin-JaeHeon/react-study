import * as style from "./account.less";
import React from "react";
import {observer} from "mobx-react";
import AccountVM from "./accountVM";
import FeedList from "../../gadgets/feedList/FeedList";
import TopUI from "../../gadgets/topUI/TopUI";
import PageList from "../../gadgets/pageList/PageList";
import {RouteComponentProps} from "react-router-dom";

type Props = RouteComponentProps<{
    username: string;
}>

@observer
export default class Account extends React.Component<Props> {
    readonly vm = AccountVM.instance;

    readonly handleClickLike = (index: number) => {
        this.vm.updateLike(index)
    };

    readonly handleClickPage = (page: number) => {
        this.vm.selectPage(page);
    };

    readonly handleClickTopPage = (page: number) => {
        this.vm.selectTopPage(page);
    };

    componentDidMount() {
        this.vm.username = this.username;
    }

    componentDidUpdate() {
        if (this.vm.username !== this.username) {
            this.vm.username = this.username;
        }
    }

    render() {
        const {userData, topPage, articleList, pageList, topPageList} = this.vm;
        return (
            <div>
                <div className={style.front}>
                    <img src={userData.image} alt=""/>
                    <h2>{userData.username}</h2>
                </div>
                <section>
                    <div className={style.feedContainer}>
                        <TopUI topPageList={topPageList} selectedPage={topPage} handler={this.handleClickTopPage}/>
                        <FeedList articleList={articleList} handler={this.handleClickLike}/>
                        <PageList pageList={pageList} handler={this.handleClickPage}/>
                    </div>
                </section>
            </div>
        );
    }

    get username() {
        return this.props.match.params.username;
    }
}
