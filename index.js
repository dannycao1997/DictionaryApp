var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

//import './style.css';

const form = document.querySelector('#defineform');
const resultsContainer = document.querySelector('.bg-light .lead');
form.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(form);
    const word = formData.get('defineword');
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            resultsContainer.innerHTML = `<p>No definition found for "${word}".</p>`;
            return;
        }
        const data = yield response.json();
        displayDefinitions(data, word);
    }
    catch (error) {
        console.error('Error fetching the definition:', error);
        resultsContainer.innerHTML = `<p>An error occurred while fetching the definition.</p>`;
    }
});
function displayDefinitions(definitions, word) {
    resultsContainer.innerHTML = `<h2>Definitions of ${word}:</h2>`;
    definitions.forEach((entry) => {
        const meanings = entry.meanings.map((meaning) => `<li>${meaning.partOfSpeech}: ${meaning.definitions.map(def => def.definition).join('; ')}</li>`).join('');
        resultsContainer.innerHTML += `<ul>${meanings}</ul>`;
    });
}
//# sourceMappingURL=index.js.map