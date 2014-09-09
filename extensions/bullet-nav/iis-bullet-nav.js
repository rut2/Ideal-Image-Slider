/*
* Ideal Image Slider: Bullet Navigation Extension v1.0.0
*
* By Gilbert Pellegrom
* http://gilbert.pellegrom.me
*
* Free to use and abuse under the MIT license.
* https://raw.githubusercontent.com/gilbitron/Ideal-Image-Slider/master/LICENSE
*/

(function(IIS) {
	"use strict";

	var _updateActiveBullet = function(slider, activeIndex) {
		var bullets = slider._attributes.bulletNav.querySelectorAll('a');
		if(!bullets) return;

		Array.prototype.forEach.call(bullets, function(bullet, i){
			IIS._removeClass(bullet, 'iis-bullet-active');
			if(i === activeIndex){
				IIS._addClass(bullet, 'iis-bullet-active');
			}
		}.bind(this));
	};

	IIS.Slider.prototype.addBulletNav = function() {
		var bulletNav = document.createElement('div');

		// Create bullet nav
		IIS._addClass(bulletNav, 'iis-bullet-nav');
		Array.prototype.forEach.call(this._attributes.slides, function(slide, i){
			var bullet = document.createElement('a');
			bullet.innerHTML = i + 1;

			bullet.addEventListener('click', function(){
				if(IIS._hasClass(this._attributes.container, this.settings.classes.animating)) return false;
				this.stop();
				this.gotoSlide(i + 1);
			}.bind(this));

			bulletNav.appendChild(bullet);
		}.bind(this));

		this._attributes.bulletNav = bulletNav;
		this._attributes.container.appendChild(bulletNav);
		_updateActiveBullet(this, 0);

		// Hook up to afterChange events
		var origAfterChange = this.settings.afterChange;
		var afterChange = function() {
			var slides = this._attributes.slides,
				index = slides.indexOf(this._attributes.currentSlide);
			_updateActiveBullet(this, index);
			return origAfterChange();
		}.bind(this);
		this.settings.afterChange = afterChange;
	};

	return IIS;

})(IdealImageSlider);
