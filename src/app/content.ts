import "../manifest.json"
import "../styles/content.scss"
import { html, render } from 'lit-html';

console.log("hoge")

const sayHello = (name: String) => {
    return html`<h1>Hello, ${name}!!</h1>`;
} 

// render(sayHello('ofuton'), document.body);
