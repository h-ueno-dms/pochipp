<?php
namespace POCHIPP;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * manage_posts_columns
 */
add_filter( 'manage_posts_columns', '\POCHIPP\add_custom_post_columns' );
function add_custom_post_columns( $columns ) {
	global $post_type;

	if ( \POCHIPP::POST_TYPE_SLUG === $post_type ) {

		$columns['pimg']        = '商品画像';
		$columns['pid']         = 'ID';
		$columns['searched_at'] = '検索元';
		$columns['used_at']     = '使用ページ';

	}

	return $columns;
}

/**
 * manage_posts_custom_column
 */
add_action( 'manage_posts_custom_column', '\POCHIPP\output_custom_post_columns', 10, 2 );
function output_custom_post_columns( $column_name, $post_id ) {
	global $post_type;

	if ( \POCHIPP::POST_TYPE_SLUG !== $post_type ) return;

	$pchpp_metas = get_post_meta( $post_id, \POCHIPP::META_SLUG, true );
	$pchpp_metas = json_decode( $pchpp_metas, true ) ?: [];

	if ( 'searched_at' === $column_name ) {

		$searched_at = $pchpp_metas['searched_at'] ?? '';

		if ( 'amazon' === $searched_at ) {
			echo 'Amazon';
		} elseif ( 'rakuten' === $searched_at ) {
			echo '楽天市場';
		} elseif ( 'yahoo' === $searched_at ) {
			echo 'Yahoo';
		} else {
			echo '-';
		}
	} elseif ( 'pid' === $column_name ) {

		echo esc_html( $post_id );

	} elseif ( 'pimg' === $column_name ) {

		$image_id    = $pchpp_metas['image_id'] ?? '';
		$image_url   = $pchpp_metas['image_url'] ?? '';
		$searched_at = $pchpp_metas['searched_at'] ?? '';

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo \POCHIPP::get_item_image( $image_id, $image_url, $searched_at );

	} elseif ( 'used_at' === $column_name ) {
		$args = [
			'post_type'              => [ 'post', 'page' ],
			'no_found_rows'          => true,
			'posts_per_page'         => -1,
			's'                      => 'wp:pochipp/linkbox "pid":' . $post_id,
		];

		$used_count = get_post_meta( $post_id, 'used_count', true ) ?: 0;

		$count     = 0;
		$the_query = new \WP_Query( $args );
		foreach ( $the_query->posts as $post_data ) {
			$the_id = $post_data->ID;
			$title  = $post_data->post_title;

			$ttl_width = mb_strwidth( $title, 'UTF-8' );
			if ( 30 < $ttl_width ) {
				$title = mb_strimwidth( $title, 0, 30 ) . '...';
			} elseif ( 0 === $ttl_width ) {
				$title = '(タイトルなし)';
			}

			$edit_link = admin_url( 'post.php?post=' . $the_id . '&action=edit' );
			echo '<a href="' . esc_url( $edit_link ) . '" class="pchpp-usepage" data-title="' . esc_attr( $title ) . '">' .
				esc_html( $the_id )
			. '</a>';

			$count++;
		}
		wp_reset_postdata();

		// 使用回数、変わってた時だけ更新
		if ( (int) $used_count !== $count ) {
			update_post_meta( $post_id, 'used_count', $count );
		}
	}

}
