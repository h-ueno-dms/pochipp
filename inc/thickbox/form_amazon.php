<?php
/**
 * Amazon商品検索フォーム
 */
$can_use_amazon_search = apply_filters(
	'pochipp_can_use_amazon_search',
	\POCHIPP::get_setting( 'amazon_access_key' ) && \POCHIPP::get_setting( 'amazon_secret_key' )
);

if ( ! $can_use_amazon_search ) {
	$pochipp_setting_url = admin_url( 'edit.php?post_type=pochipps&page=pochipp_settings&tab=amazon' );
	echo '<a href="' . esc_url( $pochipp_setting_url ) . '">ポチップ設定ページ</a>から、Amazon APIの「アクセスキー」と「シークレットキー」の設定を行ってください。';
	return;
}

/*
<div class="pchpp-tb__selectbox">
	<select id="search_index" name="search_index">
		<?php foreach ( \POCHIPP::$amazon_indexs as $key => $val ) : ?>
			<option value="<?=esc_attr( $key )?>"><?=esc_html( $val )?></option>
		<?php endforeach; ?>
	</select>
</div>
*/

echo $common_parts; // phpcs:ignore
