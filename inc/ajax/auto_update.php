<?php
namespace POCHIPP;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * 価格の自動更新
 */
add_action( 'wp_ajax_auto_update', '\POCHIPP\auto_update' );
add_action( 'wp_ajax_nopriv_auto_update', '\POCHIPP\auto_update' );
function auto_update() {

	if ( ! \POCHIPP\check_ajax_nonce() ) {
		wp_die( json_encode( [
			'error' => 'nonce error',
		] ) );
	};

	$pidStr = \POCHIPP::get_sanitized_data( $_POST, 'pids', 'text', '' );
	$pids   = explode(',', $pidStr);

	$resuts = [];
	foreach ($pids as $pid) {
		$metadata = get_post_meta( $pid, \POCHIPP::META_SLUG, true );
		$metadata = json_decode( $metadata, true ) ?: [];
		$itemcode = \POCHIPP::get_itemcode_from_metadata( $metadata );

		// 商品データ取得
		$datas = \POCHIPP::get_item_data( $metadata['searched_at'], $itemcode );

		// 何かエラーがあれば -> 取り扱いなくなったかどうかの判定を記録する？
		if ( isset( $datas['error'] ) ) {
			$resuts[$pid] = [
				'error' => $datas['error'],
			];
			continue;
		};

		// 更新
		$new_metadata = array_merge( $metadata, $datas[0] );
		$updated = update_post_meta( $pid, \POCHIPP::META_SLUG, json_encode( $new_metadata, JSON_UNESCAPED_UNICODE ) );

		$resuts[$pid] = [
			'updated' => $updated,
		];

	}
	
	wp_die( json_encode( [
		'result' => json_encode( $resuts, JSON_UNESCAPED_UNICODE ),
	] ) );
}
