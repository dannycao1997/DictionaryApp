//import './style.css';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#defineform');
    const resultsContainer = document.getElementById('results-container');

    if (!form || !resultsContainer) {
        console.error("Form or results container not found in the DOM.");
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const wordInput = form.querySelector('input[name="defineword"]');
        const word = wordInput.value.trim();

        if (!word) {
            resultsContainer.innerHTML = `<p>Please enter a word to define.</p>`;
            return;
        }

        resultsContainer.innerHTML = `<p>Loading...</p>`;

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error(`No definition found for "${word}"`);
            }
            const data = await response.json();
            displayDefinitions(data);
        } catch (error) {
            console.error('Error fetching the definition:', error);
            resultsContainer.innerHTML = `<p>An error occurred while fetching the definition. Please try again later.</p>`;
        }
    });

    function displayDefinitions(definitions) {
        if (!definitions.length) {
            resultsContainer.innerHTML = `<p>No definitions found.</p>`;
            return;
        }

        resultsContainer.innerHTML = '';
        definitions.forEach((definition) => {
            const phoneticsHtml = definition.phonetics.map(p =>
                `<span>${p.text} ${p.audio ? `<a href="https:${p.audio}" target="_blank"></a>` : ''}</span>`
            ).join(', ');

            const meaningsHtml = definition.meanings.map(meaning =>
                `<div><h4>${meaning.partOfSpeech}</h4><ul>` +
                meaning.definitions.map(def => `<li>${def.definition}</li>`).join('') +
                `</ul></div>`
            ).join('');

            resultsContainer.innerHTML += `<h3>${definition.word} ${phoneticsHtml}</h3>${meaningsHtml}`;
        });
    }
});
