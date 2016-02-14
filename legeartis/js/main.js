var Site = Site || {};

window.Site.View = Backbone.View.extend({
	events:{			
		'click nav.main a' : 'navHandler',
		'click .switcher' : 'switchBanner',
		'click .top-menu-dropdown-btn' : 'dropdownHandler',
		/*added*/'click .filter .current .selected' : 'dropdownSelectHandler',
		/*added*/'click .filter .choice-menu-dropdown a' : 'promotionsSelectHandler',
		'keyup #minCost,#maxCost' : 'sliderValues',
		'click .car-models li' : 'changeCarModel',
		'click #showMoreModels' : 'showMoreModels',
		'click .description-nav-button' : 'changeTab',

		'click .configurator .brand input' : 'checkboxHandler',
		'click .configurator .model-list .models .models-item input' : 'checkboxHandler',
		/*'click .configurator .check-marker input' : 'checkboxHandler',*/
		'click .check-marker input' : 'checkboxHandler',
		'click .configurator .cars-bodywork' : 'bodyworkHandler',
		'click .configurator .cars-bodywork label' : 'bodyworkHandler',

		'mouseover .configurator .cars-bodywork' : 'bodyworkHandlerOver',
		'mouseout .configurator .cars-bodywork' : 'bodyworkHandlerOut',

		'click .configurator .brands .brands-item input' : 'brandslistHandler',
		'click .configurator .submit > input' : 'submitBtnHandler',
		'click .brand-item .articles article' : 'showPopup',
		'click .close, .simplemodal-overlay' : 'hidePopup',
		'click .internal-page .social-sharing' : 'showSocialPopup',
		'click .model-description-photo img' : 'showModelDescPopup',
		'click .internal-popup' : 'showModelDescPopup',
		/*added*/'click .feedback-call-popup' : 'feedbackCallPopup',
		/*added*/'click .feedback-test-drive-popup' : 'feedbackTestDrivePopup',
		/*added*/'click .feedback-credit-application-popup' : 'feedbackCreditApplicationPopup',
		/*added*/'click .feedback-please-wait-popup' : 'callFeedbackPleaseWaitPopup',
		'click .views .frame-views-effect' : 'showModalPopup',
		'click .item-preview a' : 'changePreview',
		/*added*/'change .contact-form .text-wrap input' : 'fieldVerification',
		/*added*/'change .popup .text-wrap input' : 'fieldVerification',
		/*added*/'click .popup .selected-item .selected-value' : 'selectingListHandler',
		/*added*/'click .popup .selected-item .select-list-item' : 'selectingListItemHandler',
		'click' : 'closeAll'
	},

	animating: false,

	initialize: function(){
		this.setElement('body');
		this.loadPlugins();
		this.render();		
	},	
	navHandler: function(e){
		e.preventDefault();
		if (this.animating) return;

	    this.animating = true;

		var current = $(e.currentTarget),
			currentMargin = current.position().left,
			currentIndex = current.index(),
			currentText = current.html(),
			currentHref = current.attr('href'),
			self = this;


		$('div.nav-slide-button span').fadeOut(150,function(){
			$(this).html(currentText);
			$(this).fadeIn(150);
		})	
		$('div.nav-slide-button').animate({'marginLeft': currentMargin - 100},400,
			function(){				
				self.animating = false;	
				document.location.href = currentHref;		
			});
	},
	dropdownHandler: function(e){
		e.stopPropagation();
		var current = $(e.currentTarget),
		    dropdown = this.$el.find('div.top-menu-dropdown');
		
		if (current.hasClass('on')) {
			dropdown.hide();
			current.removeClass('on')
				   .siblings('i').removeClass('on');
		} else {
			dropdown.show();
			current.addClass('on')
				   .siblings('i').addClass('on');
		}
	},
	hideDropdown: function(){		
		if ($('a.top-menu-dropdown-btn').hasClass('on')) {	

			$('div.top-menu-dropdown').hide();
			$('a.top-menu-dropdown-btn').removeClass('on')
					.siblings('i').removeClass('on')

		}
	},
	/*_____added start_____________________________________________________________*/
	dropdownSelectHandler: function(e){
		e.stopPropagation();
		var current = $(e.currentTarget),
		    dropdownAll = current.parents('.filter-wrapper').find('.choice-menu-dropdown'),
		    dropdown = current.parents('.filter').find('.choice-menu-dropdown');

		if (current.hasClass('on')) {
			dropdown.hide();
			current.removeClass('on');
		} else {
			dropdownAll.hide();
			current.parents('.filter-wrapper').find('.current > .selected').removeClass('on');
			dropdown.show();
			current.addClass('on');
		}
	},
	hideDropdownSelect: function(e){		
		var curLink = $(e.currentTarget);
		
		if (curLink.parents('.filter').find('.current > .selected').hasClass('on')) {	

			$('.filter > .choice-menu-dropdown').hide();
			$('.filter > .current > .selected').removeClass('on');
		}
	},
	promotionsSelectHandler: function(e){
		var curLI = $(e.currentTarget).parents('li');

		if (!curLI.hasClass('active')) {

			var curLink = $(e.currentTarget),
				curText = curLI.text();

			curLI.parents('ul').find('li').removeClass('active');
			curLI.addClass('active');
			curLink.parents('.filter').find('.current > .selected').text(curText);
		}

		this.hideDropdownSelect(e);
	},
	selectingListHandler: function(e){
			//e.stopPropagation();
			var el = $(e.currentTarget).parent();
			
			console.log(el);

			if (el.hasClass('on')) {
				el.removeClass('on');
				return;
			} else {
				this.allSelectingListClose();
				el.addClass('on');
				return;
			}

	},
	allSelectingListClose: function(){
		$('.popup .selected-item.on').removeClass('on');
	},
	selectingListItemHandler: function(e){
		var depress = $(e.currentTarget),
			el = $(e.currentTarget).parents('.selected-item'),
			selectedValueViewer = depress.parent().siblings('.selected-value'),
			formRecipientId = $('#' + depress.parents('.selected-item').data('inputid'));
		
		//text and value notation
		selectedValueViewer.text(depress.text());
		formRecipientId.attr('value', depress.data('value'));

		depress.parents('.row').find('.error-message').hide();

		if (el.hasClass('on')) {
			el.removeClass('on');
			return;
		} else {
			el.addClass('on');
			return;
		}
	},

	/*_____added end______________________________________________________________*/
	sliderValues:function(e){
		var valueMin = parseInt($('#minCost').val()),
			valueMax = parseInt($('#maxCost').val());

			if ((valueMin > valueMax)) {

				$('#minCost').val($('#maxCost').val());
				$( "#config-slider" ).slider( "option", "values", [ valueMax,valueMax] );
			} else 
			if (valueMax < valueMin) {

				$('#maxCost').val($('#minCost').val());
				$( "#config-slider" ).slider( "option", "values", [ valueMin,valueMin] );
			}
			 else {

				$( "#config-slider" ).slider( "option", "values", [ valueMin, valueMax ] );
	         }
	},
	changeCarModel: function(e){
		$(e.currentTarget).toggleClass('on')
						  .siblings('li').removeClass('on');
	},
	showMoreModels : function(e){
		e.preventDefault();
		if ($('.brand-item').hasClass('hidden')) {

			$('.brand-item.hidden').show();
			$('footer.brands p').html('');
		}
	},
	changeTab: function(e){
		$(e.currentTarget).toggleClass('active')
						  .siblings('a').removeClass('active');
	},
	checkboxHandler: function(e){
		$(e.currentTarget).toggleClass('checked')
		                  .siblings().toggleClass('checked');

		/*added ---------------------------------------- */
		if ($(e.currentTarget).hasClass('verification'))  {
			this.modelListVerification(e);
		}
		/* ---------------------------------------- added*/
	},
	/*added ----------------------------------------------------------------------------------------------- */
	modelListVerification: function(e){
		var curLink = $(e.currentTarget),
			curLinkParent = curLink.parents('.model-list'),
			lengCheck = curLinkParent.find($("input.checked")).length,
			errElem = curLinkParent.find('.error-message');

		if (lengCheck > 0) {
			errElem.hide();
		}
		else {
			errElem.show();
		}
	},
	fieldVerification: function(e){
		var curLink = $(e.currentTarget),
			lengCheck = curLink.val().length,
			curLinkParent = curLink.parents('.row'),
			errElem = curLinkParent.find('.error-message');

		if (curLink.hasClass('name') || curLink.hasClass('base-input') || curLink.hasClass('select')) {
			if (lengCheck > 0) {
				errElem.hide();
			}
			else {
				errElem.show();
			}
		}
		else {
			var operatorCodeLeng = curLinkParent.find('.operator-code').val().length,
				otherCodeLeng = curLinkParent.find('.other-code').val().length;

			if ((operatorCodeLeng > 0) && (otherCodeLeng > 0)) {
				errElem.hide();
			}
			else if ((operatorCodeLeng == 0) && (otherCodeLeng == 0)) {
				errElem.show();
			}
		}

	},
	/* ----------------------------------------------------------------------------------------------- added*/
	bodyworkHandler: function(e){
		e.stopPropagation();
		$(e.currentTarget).toggleClass('checked');
	},
	bodyworkHandlerOver: function(e){
		$(e.currentTarget).addClass('hover');
	},
	bodyworkHandlerOut: function(e){
		$(e.currentTarget).removeClass('hover');
	},
	brandslistHandler: function(e){

		var brandItem = $(e.currentTarget).parents('.brands').children('.brands-item');
		
		brandItem.removeClass('active');
		$(e.currentTarget).parents('.brands-item').addClass('active');

	},
	submitBtnHandler: function(e){
		$(e.currentTarget).toggleClass('on');
	},
	showPopup: function(e){		
		e.stopPropagation();
		$('.popup').appendTo($(e.currentTarget)).show();		
	},
	hidePopup: function(e){	
		if (e) e.stopPropagation();	
		
		$('.popup').hide();
		$.modal.close();
	},
	showSocialPopup: function(e){			
		$('.social-sharing-menu-dropdown').toggle();
	},
	hideSocialPopup : function(){
		if ( $('.social-sharing-menu-dropdown').is(':visible') ) {
			 $('.social-sharing-menu-dropdown').hide();	
		} 
	},
	showModelDescPopup: function(){
		$('.popup.model-desc').show();
	},
	showModalPopup: function(e){
		e.preventDefault();
		$.modal($('.popup'));
	},
	feedbackCallPopup: function(){
		$('.popup.feedback-order-a-call').modal();
	},
	feedbackTestDrivePopup: function(){
		$('.popup.feedback-test-drive').modal();
	},
	feedbackCreditApplicationPopup: function(){
		$('.popup.feedback-credit-application').modal();
	},
	
	/*added start*/
	callFeedbackPleaseWaitPopup: function(e){
		e.preventDefault();
		$.ajax({
			url: '/call_me',
			type: 'POST',
			data: 'type=finance',
			success: function (xhr) {
				$.modal.close();
				$('.popup.feedback-please-wait').modal();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$.modal.close();
				$('.popup.feedback-please-wait').modal();
			}
		});
	},
	/*added end*/
	changePreview: function(e){
		e.preventDefault();

		var imgSrc = $(e.currentTarget).find('img').attr('src').replace('-prev',''),
			videoSrc = $(e.currentTarget).attr('href'),
			popupSrc = imgSrc.replace('vnutr-slider-image','big-photo');			
	
		$(e.currentTarget).addClass('active')
		                  .parents('li').siblings()
		                  .find('a').removeClass('active');

		if ($('.big-display').length > 0){

			$('.big-display').fadeOut(300,function(){
				this.src = imgSrc;			
				$('.popup.model-desc-photo .content img').attr('src',popupSrc);			
				$(this).fadeIn(300);
			});	 

		}
		if ($('.slider-review').hasClass('video')) {

			$('.slider-review iframe').attr('src',videoSrc);

		}
	},
	closeAll: function(e){
		if ($(e.target).context.localName === 'body') {	

			this.hideSocialPopup();
			this.hidePopup();
			this.hideDropdown();
			/*added*/this.hideDropdownSelect();
		}
	},	
	switchBanner: function(e){
		if ($(e.currentTarget).hasClass('on')) return;

		var currentIndex = $(e.currentTarget).index();

		$('div.switcher').removeClass('on')
						 .eq(currentIndex).addClass('on');

		$('div.banner-slide.active').fadeOut(200,function(){
			$(this).removeClass('active');	
			
			$('div.banner-slide').eq(currentIndex).fadeIn(200,function(){
				$(this).addClass('active');
			});
		})
	},
	loadPlugins: function(){
		if ($( "#config-slider" ).length > 0){

			var valueMin = parseInt($('#minCost').val()),
				valueMax = parseInt($('#maxCost').val());

			$( "#config-slider" ).slider({
		        range: true,
		        min: 349000,
		        max: 3000000,
		        values: [ valueMin, valueMax ],
		        step:5,
		        slide: function(event,ui) {
		          $("#minCost").val(ui.values[ 0 ]);
		          $("#maxCost").val(ui.values[ 1 ]); 
		        }		        
		    });
		}
	},
	prepareBanner: function(){
		var count = this.$el.find('.banner-slide').length,
			switcher = this.$el.find('.banner-switcher');
		while (count--) {
			$('<div class="switcher"></div>').appendTo(switcher);
		}
		switcher.find('div.switcher:first').addClass('on').end()
				.find('div.switcher:last').addClass('last');

	},
	initNavBtn: function(){
		var activeLink = $('nav.main > a.active'),
			activeLinkPosition = activeLink.position().left -100,
			activeLinkText = activeLink.html();

		$('div.nav-slide-button').css('marginLeft',activeLinkPosition)
								 .find('span').html(activeLinkText); // Åñëè íå íóæíî,÷òîáû òåêñò ñ àêòèâíîãî ëèíêà íå ïåðåíîñèëñÿ â ñêîëüçÿùóþ ïëàøêó, òî ýòó ñòðîêó ìîæíî óáðàòü

	},
	render: function(){
		this.prepareBanner();
		this.initNavBtn();
	}
})

jQuery(document).ready(function($) {
	var site = new Site.View;
});
