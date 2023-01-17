import { LitElement, html, css } from '../../lit-core.min.js';
import '../flipCard/index.js';
import { fetchData, pickWord } from './wordStuff.js';

export class QuizRoot extends LitElement {
    static properties = {
        settings: { type: Array },
    };

    _data = null;
    _wordData = ['', [], '', ''];
    _isRandom = false;
    _isSolution = true;
    _incorrectAnswers = [];
    
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: hsl(160, 41%, 55%);
        }
    `;

    constructor() {
        super();
        this._updateWord();
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keyup', this._handleKeyboardPress.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('keyup', this._handleKeyboardPress.bind(this));
        super.disconnectedCallback();
    }

    render() {
        const [english, germanArticles, germanStem, germanPlural] = this._wordData;

        return html`
            <flip-card
                ?showingAnswer=${this._isSolution}
                english=${english}
                .germanArticles=${germanArticles}
                germanStem=${germanStem}
                germanPlural=${germanPlural}
                .selectAnswer=${this._submitAnswer.bind(this)}
            />
        `;
    }

    _handleKeyboardPress(event) {
        if(event.code === 'Space') {
            this._updateWord();
        }
        else if(event.code.startsWith('Digit') && !this._isSolution) {
            const answerIndex = parseInt(event.key) - 1;
            this._submitAnswer(answerIndex);
        }
    }
    
    _submitAnswer(answeredIndex) {
        const articles = this._wordData[1].map(x => x.toLowerCase());
        const availableArticles = ['der', 'die', 'das'];
        const correctAnswer = articles.includes(availableArticles[answeredIndex]);
        if(correctAnswer) {
            console.log('Correct!')
        }
        else {
            console.log('Wrong!')
            this._incorrectAnswers.push(this._wordData);
        }
        this._updateWord();
    }

    async _updateWord() {
        if(this._isSolution) {
            if(this._data === null) {
                let data = await fetchData();
                if(this.settings.has('limit-from') && this.settings.has('limit-to')) {
                    const from = parseInt(this.settings.get('limit-from'));
                    const to = parseInt(this.settings.get('limit-to'));
                    data = data.slice(from, to);
                }
                this._data = data;
            }
            this._wordData = pickWord(this._data, this.settings.get('word-order') === 'rand');
        }
        this._isSolution = !this._isSolution;
        this.requestUpdate();
    }
}

customElements.define('quiz-root', QuizRoot);