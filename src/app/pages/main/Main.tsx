import * as style from "./main.less";
import React from "react";
import PageList from "../../components/pageList/PageList";
import PopularTagList from "./view/popularTagList/PopularTagList";
import {observer} from "mobx-react";
import FeedList from "../../components/feedList/FeedList";
import MainVM from "./mainVM";
import TopUI from "../../components/topUI/TopUI";

@observer
export default class Main extends React.Component {
  readonly vm = MainVM.instance;
  tagClicked = tag => () => this.vm.clickedTag = tag;
  topPageClicked = page => () => {
    if (page === 0) this.vm.clickedTag = '';
    this.vm.topPage = page;
  };
  pageClicked = page =>this.vm.page = page;
  likeClicked = (i: number) => this.vm.updateLike(i);

  componentDidMount() {
    this.vm.init();
  }

  render() {
    const {topPage, articleList, popularTagList, pageList, topPageList} = this.vm;
    return (
      <main>
        <div className={style.front}>
          <div>
            <h1>conduit</h1>
            <div className={style.slogan}>A place to share your knowledge.</div>
          </div>
        </div>
        <section>
          <div className={style.feedContainer}>
            <TopUI topPageList={topPageList}
                   selectedPage={topPage}
                   handler={this.topPageClicked}
            />
            <FeedList articleList={articleList} handler={this.likeClicked}/>
          </div>
          <PopularTagList tagList={popularTagList} handler={this.tagClicked}/>
        </section>
        <footer>
         <PageList pageList={pageList} handler={this.pageClicked}/>
        </footer>
      </main>
    );
  }
}
