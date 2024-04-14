// Import stylesheets
/*import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform');


form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  return false; // prevent reload
}; */

form.onsubmit = async (event) => {
event.preventDefault();
  const word = (new FormData(form)).get('defineword') as string;
  resultsContainer.innerHTML = `<p>Loading...</p>`;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      resultsContainer.innerHTML = `<p>No definition found for "${word}". Please try another word.</p>`;
      return;
    }
    const data: WordDefinition[] = await response.json();
    resultsContainer.innerHTML = ''; // Clear previous content or loading message
    displayDefinitions(data);
  } catch (error) {
    console.error('Error fetching the definition:', error);
    resultsContainer.innerHTML = `<p>There was an error fetching the definition. Please try again later.</p>`;
  }
};


interface Phonetic {
  text: string;
  audio?: string;
}

interface DefinitionDetail {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: DefinitionDetail[];
}

interface WordDefinition {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}


// Function to display word definitions and related data
function displayDefinitions(definitions: WordDefinition[]): void {
  if (definitions.length === 0) {
    resultsContainer.innerHTML = `<p>No definitions found.</p>`;
    return;
  }

  definitions.forEach((definition) => {
    const phonetics = definition.phonetics.map(p =>
      `<span>${p.text} ${p.audio ? `<a href="https:${p.audio}" target="_blank">Listen</a>` : ''}</span>`
    ).join(', ');

    const origin = definition.origin ? `<p><strong>Origin:</strong> ${definition.origin}</p>` : '';

    const meaningsHtml = definition.meanings.map(meaning =>
      `<div>
        <h4>${meaning.partOfSpeech}</h4>
        ${meaning.definitions.map(def =>
          `<p><strong>Definition:</strong> ${def.definition}
            ${def.example ? `<br><strong>Example:</strong> ${def.example}` : ''}
            ${def.synonyms.length > 0 ? `<br><strong>Synonyms:</strong> ${def.synonyms.join(', ')}` : ''}
            ${def.antonyms.length > 0 ? `<br><strong>Antonyms:</strong> ${def.antonyms.join(', ')}` : ''}
          </p>`
        ).join('')}
      </div>`
    ).join('');

    resultsContainer.innerHTML += `
      <h3>${definition.word} ${phonetics}</h3>
      ${origin}
      ${meaningsHtml}
    `;
  });
}

