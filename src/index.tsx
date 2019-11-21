import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './app/App';

ReactDOM.render(<App/>, document.getElementById('root'));
//@ts-ignore
console.$ = console.error;
//@ts-ignore
console.error = msg => console.$(`
 _____                              _____                     _              _    _  _ 
|  ___|                            /  __ \\                   | |            | |  | || |
| |__   _ __  _ __   ___   _ __    | /  \\/ _ __   ___   __ _ | |_   ___   __| |  | || |
|  __| | '__|| '__| / _ \\ | '__|   | |    | '__| / _ \\ / _\` || __| / _ \\ / _\` |  | || |
| |___ | |   | |   | (_) || |      | \\__/\\| |   |  __/| (_| || |_ |  __/| (_| |  |_||_|
\\____/ |_|   |_|    \\___/ |_|       \\____/|_|    \\___| \\__,_| \\__| \\___| \\__,_|  (_)(_)

${msg}`);