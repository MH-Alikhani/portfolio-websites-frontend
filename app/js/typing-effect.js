export default function setTyper(element, words) {
	const LETTER_TYPE_DELAY = 110;
	const WORD_STAY_DELAY = 3000;
	const DIRECTION_FORWARDS = 0;
	const DIRECTION_BACKWARDS = 1;
	let direction = DIRECTION_FORWARDS;
	let wordIndex = 0;
	let letterIndex = 0;
	let wordTypeInterval;
  
	startTyping();

	function startTyping() {
		wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
	}

	function typeLetter() {
		const word = words[wordIndex];

		if (direction == DIRECTION_FORWARDS) {
			letterIndex++;

			if (letterIndex == word.length) {
				direction = DIRECTION_BACKWARDS;
				clearInterval(wordTypeInterval);
				setTimeout(startTyping, WORD_STAY_DELAY);
			}
		} else if (direction == DIRECTION_BACKWARDS) {
			letterIndex--;

			if (letterIndex == 0) {
				nextWord();
			}
		}

		const textToType = word.substring(0, letterIndex);

		element.textContent = textToType;
	}

	function nextWord() {
		letterIndex = 0;
		direction = DIRECTION_FORWARDS;
		wordIndex++;

		if (wordIndex == words.length) {
			wordIndex = 0;
		}
	}
}
