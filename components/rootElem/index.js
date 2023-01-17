import { LitElement, html, css } from '../../lit-core.min.js';
import '../quizRoot/index.js';
import '../landingPage/index.js';

export class RootElem extends LitElement {
    _landing = true;
    _settings = null;
    
    static properties = {};

    static styles = css`
        :host {
            height: 100%;
            width: 100%;
        }
    `;

    constructor() {
        super();
    }

    onLandingPageSubmit = entries => {
        this._settings = entries;
        this._landing = false;
        this.requestUpdate();
    }

    render() {
        if(this._landing) {
            const submitCallback = this.onLandingPageSubmit.bind(this);
            return html`<landing-page .submitSettings=${submitCallback}></landing-page>`;
        }
        else {
            return html`<quiz-root .settings=${this._settings}></quiz-root>`;
        }
    }
}

customElements.define('root-elem', RootElem);