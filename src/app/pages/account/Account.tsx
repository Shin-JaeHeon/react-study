import * as style from "./account.less";
import React from "react";
import {observer} from "mobx-react";
import AccountVM from "./accountVM";
import FeedList from "../../gadgets/feedList/FeedList";
import TopUI from "../../gadgets/topUI/TopUI";
import PageList from "../../gadgets/pageList/PageList";

interface Props {
    match: {
        params: {
            username: string;
        }
    };
}

@observer
export default class Account extends React.Component<Props> {
    readonly vm = AccountVM.instance;

    topPageClicked = page => () => this.vm.topPage = page;
    pageClicked = (page: number) => this.vm.selectedPage = page;
    likeClicked = (i: number) => this.vm.updateLike(i);

    username = this.props.match.params.username;

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
                    <div>
                        <img src={userData.image} alt=""/>
                        <h2>{userData.username}</h2>
                    </div>
                </div>
                <section>
                    <div className={style.feedContainer}>
                        <TopUI topPageList={topPageList} selectedPage={topPage}
                               handler={this.topPageClicked}/>
                        <FeedList articleList={articleList} handler={this.likeClicked}/>
                        <PageList pageList={pageList} handler={this.pageClicked}/>
                    </div>
                </section>
            </div>
        );
    }
}
