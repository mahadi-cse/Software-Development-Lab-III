const trainInput = document.getElementById('train_input');
const fromSuggestionsElement = document.getElementById('train-suggestions');
const suggestionBox = document.querySelector('.autocomplete-suggestions');

let stationNames = [];
let fromSelectedIndex = -1;

trainInput.addEventListener('input', () => {
    const query = trainInput.value;
    if (query.length > 0) {
        fetchTrainNames(query, trainInput, fromSuggestionsElement);
    } else {
        fromSuggestionsElement.innerHTML = '';
        suggestionBox.style.display = 'none';
    }
});

function fetchTrainNames(query, inputElement, suggestionsElement) {
    const filteredNames = stationNames.filter(name => name.toLowerCase().includes(query.toLowerCase()));
    displaySuggestions(filteredNames, inputElement, suggestionsElement);
}

function displaySuggestions(suggestions, inputElement, suggestionsElement) {
    suggestionsElement.innerHTML = '';
    suggestions.forEach((item, index) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('autocomplete-suggestion');
        suggestionItem.textContent = item;
        suggestionItem.addEventListener('click', () => {
            inputElement.value = item;
            suggestionsElement.innerHTML = '';
        });
        suggestionsElement.appendChild(suggestionItem);

        suggestionItem.addEventListener('mouseenter', () => {
            fromSelectedIndex = index;
            updateHighlightedSuggestion(suggestionsElement, suggestions);
        });
    });

    if (suggestions.length > 0) {
        suggestionBox.style.display = 'block';
        updateHighlightedSuggestion(suggestionsElement, suggestions);
    } else {
        suggestionBox.style.display = 'none';
    }
}

function updateHighlightedSuggestion(suggestionsElement, suggestions) {
    const suggestionItems = suggestionsElement.querySelectorAll('.autocomplete-suggestion');
    suggestionItems.forEach((item, index) => {
        if (index === fromSelectedIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

trainInput.addEventListener('keydown', (e) => {
    if (suggestionBox.style.display === 'block') {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            fromSelectedIndex = Math.min(fromSelectedIndex + 1, fromSuggestionsElement.children.length - 1);
            updateHighlightedSuggestion(fromSuggestionsElement, stationNames);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            fromSelectedIndex = Math.max(fromSelectedIndex - 1, 0);
            updateHighlightedSuggestion(fromSuggestionsElement, stationNames);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (fromSelectedIndex >= 0) {
                trainInput.value = fromSuggestionsElement.children[fromSelectedIndex].textContent;
                fromSuggestionsElement.innerHTML = '';
                suggestionBox.style.display = 'none';
            }
        }
    }
});

fetch('/getTrainNames?query=')
    .then(response => response.json())
    .then(data => {
        stationNames = data;
    });