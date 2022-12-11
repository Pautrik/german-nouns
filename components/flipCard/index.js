import { LitElement, html, css } from '/lit-core.min.js';
import { extractArticle } from '../rootElem/wordStuff.js';

const articles = [
    { color: 'lightblue', text: 'Der' },
    { color: 'pink', text: 'Die' },
    { color: 'lightgray', text: 'Das' }
];

export class FlipCard extends LitElement {
    static properties = {
        english: { type: String },
        germanSingular: { type: String },
        germanPlural: { type: String },
        showingAnswer: { type: Boolean },
        selectAnswer: {}
    };

    static styles = css`
        :host {
            background-color: white;
            height: 65vmin;
            width: 90vmin;
            --mobile-german-font: 1;
            --desktop-german-font: 1;
        }
    
        :host, .german-words {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .german-words {
            flex: 2;
        }

        .spacer {
            flex: 1;
        }

        .thin-spacer {
            flex: 0.75;
        }

        .word {
            text-align: center;
            display: flex;
            align-items: center;
            flex: 1;
            font-size: calc(5rem * var(--desktop-german-font));
        }
        
        .word .art {
            white-space: pre;
        }

        .word .art.hid {
            visibility: hidden;
        }

        .extra-info {
            display: flex;
            justify-content: center;
            font-weight: 300;
            font-size: calc(4rem * var(--desktop-german-font));
        }

        .extra-info span {
            flex: 1;
            white-space: pre;
        }

        .english {
            text-align: end;
            flex: 1;
            align-items: end;
        }

        .german-plural {
            font-weight: 200;
        }

        .article-btns {
            display: flex;
            align-items: center;
        }
        
        .article-btns button {
            font-size: 3rem;
            margin: 15px 11px;
            border: transparent;
            font-weight: 300;
            border-radius: 11px;
            padding: 0px 12px 10px;
            white-space: pre;
        }

        .article-btns button span {
            vertical-align: middle;
        }

        .btn-index {
            font-size: calc(0.65rem * 3);
        }

        @media (orientation: portrait) and (max-width: 700px) {
            :host {
                height: 80vh;
            }

            .word {
                font-size: calc(4rem * var(--mobile-german-font));
            }

            .article-btns button {
                font-size: calc(0.8 * 3rem);
            }

            .extra-info {
                font-size: calc(3rem * var(--mobile-german-font));
            }

            .btn-index {
                display: none;
            }
        }
    `;

    constructor() {
        super();
        this.english = 'benglish';
        this.germanSingular = 'die burmanSingular';
        this.germanPlural = 'burmanPlural';
        this.showingAnswer = false;
    }

    render() {
        const [article, stem] = extractArticle(this.germanSingular);
        const hidClass = this.showingAnswer ? '' : 'hid';
        const mobileGermanFontSize =
            this.germanSingular.length >= 10 
            ? -13/260 * this.germanSingular.length + 37/26
            : 1;
        const desktopGermanFontSize = this.germanSingular.length >= 19
            ? -1/20 * this.germanSingular.length + 9.75/5
            : 1;
        const dynamicFontStyling = html`
            <style>
                .german-words { 
                    --mobile-german-font: ${mobileGermanFontSize};
                    --desktop-german-font: ${desktopGermanFontSize}
                }
            </style>
        `;

        console.log({mobileGermanFontSize});

        let englishElem = '', pluralElem = '';
        if(this.showingAnswer) {
            englishElem = html`&#127468&#127463 <span> ${this.english}</span>`;
            pluralElem = html`<span class="german-plural">${this.germanPlural}</span>`;
        }

        return html`
            ${dynamicFontStyling}
            <div class="thin-spacer"></div>
            <div class="extra-info english spacer">${englishElem}</div>
            <div class="german-words">
                <div class="word spacer">
                    <span class="art ${hidClass}">${article} </span><span>${stem}</span>
                </div>
                <div class="extra-info spacer">${pluralElem}</div>
            </div>
            <div class="article-btns spacer">
                ${articles.map((article, index) => html`
                    <button @click="${() => this.selectAnswer(index)}" style="background-color: ${article.color}"><span>${article.text} </span><span class="btn-index">(${index + 1})</span></button>
                `)}
            </div>
        `;
    }
}

customElements.define('flip-card', FlipCard);