import React from "react";
import {observer} from "mobx-react";
import * as style from './pageList.less';
import mainVM from "../../pages/main/mainVM";

interface Props {
    page: number;
    handler: (page: number) => void;
}

@observer
export default class PageListItem extends React.Component<Props> {
    readonly vm = mainVM.instance;
    onClick = () => this.props.handler(this.props.page);

    render() {
        const {props, onClick, selected} = this;
        return (
            <button className={style.item} onClick={onClick} data-selected={selected}>{props.page + 1}</button>
        );
    }

    get selected() {
        return this.vm.page === this.props.page;
    }
}
