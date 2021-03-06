<?php
/**
	Template name: about-page-template
 */
get_header();
?>


<main>
 	<div class="main">
		<div class="resume-first-screen x-resume-first-screen">
			<div class="ui-container resume-first-screen__inner">

				<div class="resume-first-screen__block contact-item x-contact-item">
					<div class="contact-item__icon contact-item__icon--photo1"
					<?php
					//custom about photo
	                echo ' style="background-image: url( ' , get_field('about_photo') , ' );" '; ?>
	                >
	            </div>

			 	<div class="contact-item__title">
					<?php // custom title(name)
	                echo esc_html( get_the_title() ); ?>
            	</div>

				<div class="contact-item__text">
					<?php //custom about profession
	                the_field('about_profession'); ?>
                </div>

				<div class="contact-item__social-icons">
					<?php
							// hide of empty custom insta and facebook icon, with links
							if (get_field('about_instagram'))
							{
								echo '<a href="' . get_field('about_instagram') . '" class="contact-item__social-icon contact-item__social-icon--instagram"></a>';
							}

							if (get_field('about_facebook'))
							{
								echo '<a href="' . get_field('about_facebook') . '" class="contact-item__social-icon contact-item__social-icon--facebook"></a>';
							}
			                    ?>
				</div>

				<a
					<?php // custom tel number link + echo
					echo 'href="tel:+7' , get_field('about_tel') , '"'; ?>
					class="ui-link ui-link--reverse contact-item__number">+7<?php
	                the_field("about_tel"); ?>
                </a>

				<a
					<?php // custom email link + echo
					echo 'href="mailto:' , get_field('about_email') , '"' ; ?>
					class="ui-link ui-link--reverse contact-item__email">
					<?php the_field('about_email'); ?>
				</a>
			</div>

			<div class="resume-first-screen__block">
	            <div class="resume-text-block resume-text-block--fade x-text">
	                <div class="resume-text-block__text1">
		                <?php // custom text 1 block
	                	the_field('about_text1'); ?>
	                </div>

	                <div class="resume-text-block__text2">
		                <?php // custom text 2 block
	                	the_field('about_text2'); ?>
	                </div>

	                <div class="resume-text-block__text3 text3-block">
						<?php // custom text 3 block cloned
						$rows = get_field('about_text3');
						if($rows)
						{
							foreach($rows as $row)
							{
								echo '<div class="text3-block__item">' . '<div class="text3-block__year">' . $row['about_text3_year'] .  ' г.</div>' . '<div class="text3-block__text">' . $row['about_text3_text'] . '</div> </div>';
							}
						} ?>

					</div>
	            </div>
	            <div class="ui-custom-button ui-custom-button--gradient project-description__button project-description__button--more x-more-less" data-text="Читать дальше"></div>
			</div>
		</div>
	</div>
    <div class="resume-certificates">
        <div class="ui-container resume-certificates__inner">
            <div class="resume-certificates__title">Дипломы и сертификаты</div>
			<ul class="resume-certificates__list certificates-list x-resume-slider">

			<?php //custom diplom slider

				$images = get_field('about_diploms');
				if( $images ): ?>	 			
			        <?php foreach( $images as $image ): ?>
			            <li class="certificates-list__item">
                            <a href="<?php echo $image['url']; ?>" data-lightbox="certificates" class="ui-link ui-link--spy">
    			                <img src="<?php echo $image['sizes']['thumbnail']; ?>"/>
                            </a>
			            </li>
			        <?php endforeach; ?>
				<?php endif; ?>
			</ul>
        </div>
    </div>
    <div class="resume-publications">
        <div class="ui-container resume-publications__inner">
            <div class="resume-publications__title">Публикации</div>

			<?php //custom publications slider
				$images = get_field('about_publications');
				if( $images ): ?>
	 			<ul class="resume-publications__list publications-list x-resume-slider">
			        <?php foreach( $images as $image ): ?>
			            <li class="publications-list__item">
			                <a href="<?php echo $image['url']; ?>" data-lightbox="publications" class="ui-link ui-link--spy">
    			                <img src="<?php echo $image['sizes']['thumbnail']; ?>"/>
			                </a>
			            </li>
			        <?php endforeach; ?>
			    </ul>
			<?php endif; ?>
        </div>
    </div>

</div>
</main>

<?php
get_footer();
