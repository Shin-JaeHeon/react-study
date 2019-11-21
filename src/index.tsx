import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './app/App';

ReactDOM.render(<App/>, document.getElementById('root'));
//@ts-ignore
console.$ = console.error;
//@ts-ignore
console.error = msg => console.$(`@==(^o^)@  Error Created!!  @(^o^)==@
${msg}`);