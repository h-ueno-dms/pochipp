/* eslint @wordpress/no-global-event-listener: 0 */
window.addEventListener('load', function () {
	if (!window.fetch) return;

	updatePochippData();
});

const updatePochippData = async () => {
	const pochippBoxs = document.querySelectorAll('.pochipp-box[data-auto-update]');

	// 要素が存在しないときはそのままreturn
	if (pochippBoxs.length === 0) {
		return;
	}

	const { ajaxUrl, ajaxNonce } = window.pchppVars;
	const params = new URLSearchParams();
	params.append('action', 'auto_update');
	params.append('nonce', ajaxNonce);
	params.append(
		'pids',
		Array.from(pochippBoxs)
			.map((elem) => elem.getAttribute('data-id'))
			.join(',')
	);

	const res = await fetch(ajaxUrl, {
		method: 'POST',
		cache: 'no-cache',
		body: params,
	}).then((response) => {
		if (response.ok) {
			// console.log などで一回 response.json() 確認で使うと、responseJSONでbodyがlockされるので注意
			// console.log(response.json());
			return response.json();
		}
		throw new TypeError('Failed ajax!');
	});

	if (res.result) {
		console.log('Pochipp auto update:', JSON.parse(res.result));
	}
};
