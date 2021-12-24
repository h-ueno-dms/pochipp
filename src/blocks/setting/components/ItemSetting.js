/**
 * @WordPress dependencies
 */
// import { memo } from '@wordpress/element';
// import { useSelect } from '@wordpress/data';
import { applyFilters, hasFilter } from '@wordpress/hooks';
import { TextControl, CheckboxControl, RadioControl, BaseControl } from '@wordpress/components';

/**
 * 設定項目
 */
const btnLayoutsPC = [
	{ value: '', label: 'ポチップ設定のまま' },
	{ value: 'fit', label: '自動フィット' },
	{ value: 'text', label: 'テキストに応じる' },
	{ value: '3', label: '3列幅' },
	{ value: '2', label: '2列幅' },
];
const btnLayoutsSP = [
	{ value: '', label: 'ポチップ設定のまま' },
	{ value: '1', label: '1列幅' },
	{ value: '2', label: '2列幅' },
];

/**
 * ItemPreview
 */
export default ({ postTitle, parsedMeta, updateMetadata, customImgUrl }) => {
	// ポチップ設定データ
	const pchppVars = window.pchppVars || {};

	// タイトル更新用関数
	const { editPost } = wp.data.dispatch('core/editor');

	const ExSettting = () => {
		if (!hasFilter('pochipp.exSetting', 'pochipp-pro')) {
			return (
				<p style={{ fontSize: '13px' }}>
					<a href='https://pochipp.com/pochipp-pro/' target='_blank' rel='noreferrer'>
						Pochipp Pro
					</a>
					を導入すると、メディアライブラリ内から商品画像を設定できるようになります。
				</p>
			);
		}

		// {...{ customImgUrl, parsedMeta, updateMetadata }}
		const args = { customImgUrl, parsedMeta, updateMetadata };

		return applyFilters('pochipp.exSetting', null, args);
	};

	return (
		<>
			<TextControl
				label='検索キーワード'
				value={parsedMeta.keywords}
				onChange={(val) => {
					updateMetadata('keywords', val);
				}}
			/>
			<TextControl
				label='商品タイトル'
				value={postTitle}
				onChange={(newTitle) => {
					editPost({ title: newTitle });
					// setItemTitle(newTitle);
				}}
			/>
			<TextControl
				label='タイトル下に表示するテキスト'
				value={parsedMeta.info}
				onChange={(val) => {
					updateMetadata('info', val);
				}}
			/>
			<BaseControl>
				<BaseControl.VisualLabel>カスタムボタン1</BaseControl.VisualLabel>
				<div className='__customBtn'>
					<span>テキスト</span>
					<input
						type='text'
						value={parsedMeta.custom_btn_text}
						onChange={(e) => {
							updateMetadata('custom_btn_text', e.target.value);
						}}
					/>
				</div>
				<div className='__customBtn -url'>
					<span>リンク先</span>
					<input
						type='text'
						value={parsedMeta.custom_btn_url}
						onChange={(e) => {
							updateMetadata('custom_btn_url', e.target.value);
						}}
					/>
				</div>
			</BaseControl>
			<BaseControl>
				<BaseControl.VisualLabel>カスタムボタン2</BaseControl.VisualLabel>
				<div className='__customBtn'>
					<span>テキスト</span>
					<input
						type='text'
						value={parsedMeta.custom_btn_text_2}
						onChange={(e) => {
							updateMetadata('custom_btn_text_2', e.target.value);
						}}
					/>
				</div>
				<div className='__customBtn -url'>
					<span>リンク先</span>
					<input
						type='text'
						value={parsedMeta.custom_btn_url_2}
						onChange={(e) => {
							updateMetadata('custom_btn_url_2', e.target.value);
						}}
					/>
				</div>
			</BaseControl>
			<RadioControl
				className='-radio'
				label='ボタン幅（PC）'
				selected={parsedMeta.btnLayoutPC || ''}
				options={btnLayoutsPC}
				onChange={(val) => {
					updateMetadata('btnLayoutPC', val);
				}}
			/>
			<RadioControl
				className='-radio'
				label='ボタン幅（SP）'
				selected={parsedMeta.btnLayoutSP || ''}
				options={btnLayoutsSP}
				onChange={(val) => {
					updateMetadata('btnLayoutSP', val);
				}}
			/>
			<BaseControl>
				<BaseControl.VisualLabel>情報の表示</BaseControl.VisualLabel>
				{pchppVars.displayPrice === 'off' ? (
					<CheckboxControl
						label='価格情報を表示する'
						checked={parsedMeta.showPrice}
						onChange={(checked) => {
							updateMetadata('showPrice', checked);
						}}
					/>
				) : (
					<CheckboxControl
						label='価格情報を隠す'
						checked={parsedMeta.hidePrice}
						onChange={(checked) => {
							updateMetadata('hidePrice', checked);
						}}
					/>
				)}
			</BaseControl>
			<div className='components-base-control -custom-image'>
				<div className='components-base-control__field'>
					<div className='components-base-control__label'>商品カスタム画像</div>
					<ExSettting />
				</div>
			</div>
		</>
	);
};
