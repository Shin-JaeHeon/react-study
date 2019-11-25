import React from "react";
import {observer} from "mobx-react";
import PageListItem from "./PageListItem";
import * as style from './pageList.less';

interface Props {
    pageList: ReadonlyArray<number>;
    handler: (page: number) => void;
}

@observer
export default class PageList extends React.Component<Props> {

    render() {
        const {pageList, handler} = this.props;
        return (
            <footer>
                <div className={style.list}>
                    {pageList.map(page =>
                        <PageListItem page={page} key={page} handler={handler}/>
                    )}
                </div>
            </footer>
        );
    }
}