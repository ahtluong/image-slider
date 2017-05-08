var images =
{

	prevImg: 5,
	curImg : 1,
	nextImg: 2,

	start: function() {
		$('.img-' + images.curImg).show();
		$('.dot.img-' + images.curImg).addClass('active');
	},

	move: function(dir, dest) {
		dest = (typeof dest !== 'undefined') ? dest : (dir == 'n') ? images.nextImg : images.prevImg;
		if (dir == 'n') images.slide_right(dest, 600);
		else            images.slide_left (dest, 600);

		images.curImg  = dest;
		dots.curActive = dest;
		images.nextImg = images.curImg + 1 > 5 ? 1 : images.curImg + 1;
		images.prevImg = images.curImg - 1 < 1 ? 5 : images.curImg - 1;

		$('.dot').removeClass('active');
		$('.dot.img-' + images.curImg).addClass('active');
	},

	slide_right: function(next, speed) {
		var positionTop = $('.images.img-' + images.curImg).position().top;
		$('.images.img-' + images.curImg).hide('slide', { direction: 'left'  }, speed);
		$('.images.img-' + next)         .show('slide', { direction: 'right' }, speed).css('top', positionTop);
	},

	slide_left: function(prev, speed) {
		var positionTop = $('.images.img-' + images.curImg).position().top;
		$('.images.img-' + images.curImg).hide('slide', { direction: 'right' }, speed);
		$('.images.img-' + prev)         .show('slide', { direction: 'left'  }, speed).css('top', positionTop);		
	},

	preview: function(dir) {
		// TODO show preview image when hovering next/previous
		// var previewPosition = [];
		// if (dir == 'n') previewPosition = $('#next-button').offset();
		// else            previewPosition = $('#prev-button').offset();

		// $('body').append($('<div/>').addClass('preview').append($('<img/>').attr('src', 'images/dog' + (images.curImg + 1))));
	},

	remove_preview: function() {
		// TODO remove preview image when not hovering next/previous
	},

	loop: function() {
		setTimeout(function() {
			images.move('n');
			images.loop();
		}, 2000);
	},

};

var dots =
{
	click: function(e) {
		var numClick = 0;
		for (var i = 1; i <=5; i++) {
			if ($(e).hasClass('img-' + i)) {
				numClick = i;
				break;
			}
		}

		if (numClick > images.curImg) images.move('n', numClick);
		else                          images.move('p', numClick);
	}
};


$(document).ready(function() {
	images.start();
	images.loop();
	$('#next-button').click(function() { images.move('n'); });
	$('#prev-button').click(function() { images.move('p'); });
	$('.dot')        .click(function() { dots.click(this); });
});