import { LitElement, html, css } from '../../lit-core.min.js';

export class LandingPage extends LitElement {
    static properties = {
        submitSettings: {},
    };

    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: hsl(160, 41%, 55%);
        }

        form {
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 25px;
        }

        form > div {
            margin: 10px;
        }

        .disabled-range {
            color: gray;
        }
        
        input[type=submit] {
            font-size: 2rem;
            margin: 15px 11px;
            border: transparent;
            font-weight: 300;
            border-radius: 11px;
            padding: 0px 12px 10px;
            white-space: pre;
        }
    `;

    _disableRange = true;

    constructor() {
        super();
    }

    onSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        this.submitSettings(data);
        return false;
    }

    updateRangeSelector = event => {
        console.log('thing')
        this._disableRange = !event.target.checked;
        this.requestUpdate();
    }

    render() {
        const labelClasses = this._disableRange ? 'disabled-range' : '';

        return html`
            <form @submit=${this.onSubmit}>
                <div>Word order: <input type="radio" name="word-order" value="freq" required /><label>most common</label> <input type="radio" name="word-order" value="rand"/><label>random</label></div>
                <div><label>Limit to range</label> <input type="checkbox" name="limit-range" @change=${this.updateRangeSelector} /></div>
                <div>
                    <label for="from-selector" class=${labelClasses}>From </label><input id="from-selector" type="number" name="limit-from" value="0" ?disabled=${this._disableRange} />, <label for="to-selector" class=${labelClasses}>To </label><input id="to-selector" type="number" name="limit-to" value="200" ?disabled=${this._disableRange} />
                </div>
                <input type="submit" value="Start" />
            </form>
        `;
    }
}

customElements.define('landing-page', LandingPage);