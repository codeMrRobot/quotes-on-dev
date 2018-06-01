<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
				<div class="site-info">
					<span class="menu-stuff">
				<div id="site-navigation" class="main-navigation" role="navigation">
				<?php 
					wp_nav_menu(
						array (
						'theme_location' => 
						'primary',								
						'menu_id' => 
						'primary_menu',
						'menu_class' => 
						'footer_navigation'
						)
		);
?>
</div>

							
				<p class ="red">Brought to you by <a href="http://www.redacademy.com/">RED Academy</a></p>
	</span>
			</div><!-- .site-info -->
					
				
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
