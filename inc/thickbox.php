<?php
namespace POCHIPP;

if ( ! defined( 'ABSPATH' ) ) exit;


/**
 * media_upload_{$action} フックで iframe 読み込み
 */
add_action( 'media_upload_pochipp', function() {
	wp_enqueue_style( 'pochipp-iframe', POCHIPP_URL . 'dist/css/iframe.css', [], POCHIPP_VERSION );
	wp_enqueue_script( 'pochipp-iframe', POCHIPP_URL . 'dist/js/search.js', [ 'jquery' ], POCHIPP_VERSION, true );
	wp_iframe( '\POCHIPP\load_search_fom_iframe' );
} );


/**
 * 商品選択iframe
 */
function load_search_fom_iframe() {

	// タブはフックで定義
	add_filter( 'media_upload_tabs', '\POCHIPP\media_upload_tabs', 999 );

	// body
	include POCHIPP_PATH . 'inc/thickbox/serach_items.php';
}


/**
 * 商品リンク追加画面のタブ設定
 */
function media_upload_tabs() {

	$tabs = [];

	// エディターからモーダルが開かれた時、タブを追加
	$at = \POCHIPP::array_get( $_GET, 'at', '' );
	if ( 'editor' === $at ) {
		$tabs[ \POCHIPP::TABKEY_REGISTERD ] = '登録済み商品データを検索';
	}

	// 共通
	$tabs[ \POCHIPP::TABKEY_AMAZON ]  = 'Amazonから商品検索';
	$tabs[ \POCHIPP::TABKEY_RAKUTEN ] = '楽天市場から商品検索';

	return $tabs;
}
