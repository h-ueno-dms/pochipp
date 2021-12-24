/* eslint @wordpress/no-global-event-listener: 0 */
window.addEventListener('load', function () {
	const moshimoElem = document.querySelector('.pchpp-setting__div.moshimo');

	!!moshimoElem && validateMoshimo();
});

const validateMoshimo = () => {
	const selectorList = {
		amazon: '.pchpp-setting__dl.-amazon > dd input',
		rakuten: '.pchpp-setting__dl.-rakuten > dd input',
		yahoo: '.pchpp-setting__dl.-yahoo > dd input',
	}

	Object.values(selectorList).forEach(selector => {
		document.querySelector(selector).addEventListener('input', event => {
			const strCountLimit = 7;
			const expectedType = 'number';
			const value = event.target.value;

			const errors = [
				overWordCount(value, strCountLimit),
				invalidType(value, expectedType),
			];
			const message = errors.find(error => error !== '') || '';

			// ここに表示する処理
			outputError(event.target.closest('dd'), message);
		});
	});
};

const outputError = (element, message) => {
	const color = message !== '' ? '#d63638' : '';
	element.querySelector('input').style.borderColor = color;
	element.querySelector('.errMessage').textContent = message;
};

const overWordCount = (target, limit) => {
	return target.length > limit ? `入力可能な文字数は${limit}文字までです。` : '';
};

const invalidType = (target, type) => {
	if (type === 'number') {
		const matches = target.match(/^[0-9]*$/)
		return matches === null || target !== matches[0] ? '入力可能な文字は数値のみです。' : '';
	}

	return '';
};