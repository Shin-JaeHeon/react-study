import * as React from "react";
import * as style from './TopUI.less';

interface Props {
    topPageList: ReadonlyArray<string>;
    selectedPage: number;
    handler: (page: number) => void;
}

export default class TopUI extends React.Component<Props> {

    render() {
        return (
            <div className={style.topUI}>
                {this.props.topPageList.map((name, i) =>
                    <div className={style.item}
                         data-selected={i === this.props.selectedPage}
                         onClick={() => this.props.handler(i)}
                         key={i}>{name}</div>
                )}
                <div className={style.empty}/>
            </div>
        );
    }
}
