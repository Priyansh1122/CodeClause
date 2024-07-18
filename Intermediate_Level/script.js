// script.js

// Replace 'YOUR_API_KEY' with your actual API key from the translation service
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

document.addEventListener('DOMContentLoaded', () => {
    populateLanguageOptions();
});

function populateLanguageOptions() {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        // Add more languages as needed
    ];

    const sourceLangSelect = document.getElementById('sourceLang');
    const targetLangSelect = document.getElementById('targetLang');

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.text = lang.name;
        sourceLangSelect.add(option.cloneNode(true));
        targetLangSelect.add(option.cloneNode(true));
    });
}

function translateText() {
    const sourceText = document.getElementById('sourceText').value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    const url = `${API_URL}?q=${encodeURIComponent(sourceText)}&source=${sourceLang}&target=${targetLang}&key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('translatedText').value = translatedText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function startSpeechRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = document.getElementById('sourceLang').value;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        document.getElementById('sourceText').value = speechResult;
    };

    recognition.start();
}

function speakText() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = document.getElementById('translatedText').value;
    msg.lang = document.getElementById('targetLang').value;
    window.speechSynthesis.speak(msg);
}
