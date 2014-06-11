/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

 /**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website-part-2/
 */

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	htmlbody = $('html,body');
	var duration = 500;
	
	var pageNames = new Array(5);
	pageNames[0] = "Home";
	pageNames[1] = "Bio";
	pageNames[2] = "Members";
	pageNames[3] = "Videos";
	pageNames[4] = "News";	

    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Init navigation
		      initHomepageNav();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
		    forceHeight: false,
		    render: function(data) {
		    
		        //Debugging - Log the current scroll position.
		        //console.log(data.curTop);
			document.querySelector('.scrollpos').innerHTML = data.curTop;
		    }
		});
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    // Refresh Skrollr after resizing our sections
	    s.refresh($('.homeSlide'));
	    
	}

	function initHomepageNav(){
		
		var homeSlides = $('.homeSlide');
		var $slideContent = $('.hsContainer');
		var slidesCount = $(homeSlides).length;
		var activeSlide = 1;
		
		var pageBtnLinks = "";
		for (var i=0; i<pageNames.length; ++i) {
			
			
			pageBtnLinks += "<li" + ((i==0)? " class='first'" : ((i==pageNames.length-1)? " class='last'" : ""))+ "><a href=\"#\" title=\"Go to " + pageNames[i] + " page\"><span id=\"" + i + "\">" + pageNames[i] + "</li>";
		}
		
		// Build HTML for Nav
		$('<div/>', {
		    'id' : 'slideNav'
		}).append($('<ul>' + pageBtnLinks + '</ul>')).appendTo('body').delay(1200).fadeIn(duration);
		
		var $activeSlide = $("#slideNav li .active");
		
		// Highlight the section currently scrolling DOWN
		homeSlides.waypoint(function(direction) {
		  if (direction === 'down') {
			var index = $(this).index();
			showHideNavItems(index);
		  }
		}, { offset: '50%' });
		
		// Highlight the section currently scrolling UP
		homeSlides.waypoint(function(direction) {
		  if (direction === 'up') {
			var index = $(this).index();
			showHideNavItems(index);
		  }
		}, {
		  offset: function() {
		    // This is the calculation that would give you
		    // "bottom of element hits middle of window"
		    return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
		  }
		});
		
		//Fade out unnecesary nav items
		function showHideNavItems(index){
			var $activeSlideNumber = parseInt($activeSlide.attr("id"));
			
			for (var i=0; i<pageNames.length; ++i) {
				var $navLink = $("#slideNav li #" + i).parent();
				if (i == index) {
					$navLink.addClass('disabled').parent().animate({opacity: 1});;
				} else {
					$navLink.removeAttr('class').parent().animate({opacity: 0.25});
				}				
			}			
		}
		
		$("#slideNav a").click(function (e) {
			e.preventDefault();
			var index = parseInt($(this).find("span").attr("id"));
			console.log("index: " + index);
			scrollToSlide(index+1);			    
		});		   
	    
		function scrollToSlide(slideId){
			console.log("scrolling to slide: " + slideId);
			
			// Custom slide content offset
		    var customSlideOffset = $("#slide-"+slideId).attr('data-content-offset');
		    
		    
		    // Scroll to the top of a container if it doesn't have custom offset defined
		    if(typeof customSlideOffset === 'undefined'){
		        
		        htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top) + 'px'},'slow');
		        
		    } else {
		        
		        // Convert percentage 'eg. 25p' into pixels
		        if(customSlideOffset.indexOf('p')!=-1) {
			       
			       var customSlideOffset = parseInt(customSlideOffset.split('p')[0]);
				   var slideHeight = $slide.height();
				   
				   customSlideOffset = Math.ceil((slideHeight/100) * customSlideOffset);
				   
				   //console.log(slideHeight +' '+ customSlideOffset);
				   
				   htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        } else {
			       
			       var customSlideOffset = parseInt(customSlideOffset);
			       
			       htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        }
		    
		    }
		}
	    
	    
	}
	
	
			var channelId = "UC1mYjqEFPXs4aSIEBIdeGKA";
		var apiKey = "AIzaSyB82o6B5TLfspdRkk1zFGfFu1xBF-8HHRg";
		var maxVideosPerPlaylist = 15;
		var maxPosts = 5;
		var accessToken = "1404143096540699|gEFyWN19VMoCdw7GVjRLFM6X178";
		
		var apiUrl_playlists = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=" + channelId + "&fields=items%2Fid&key=" + apiKey;
		var apiUrl_videos = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items/snippet(title,resourceId/videoId)&maxResults=" + maxVideosPerPlaylist + "&key=" + apiKey + "&playlistId=";
		var apiUrl_fbPosts = "https://graph.facebook.com/mrittikaband/posts?limit=" + maxPosts + "&access_token=" + accessToken;
		
		$(document).ready(function(){			
				// Fetch youtube videos				
				$.get(apiUrl_playlists, function(playlistResponse) {
						var numPlaylists = playlistResponse.items.length;
						console.log("Number of playlists: " + numPlaylists);
						for (var p = 0; p < numPlaylists; p++) {
								var playlistId = playlistResponse.items[p].id;
								$.get(apiUrl_videos + playlistId, function(videoResponse) {
										var numVideos = videoResponse.items.length;
										console.log("Number of videos: " + numVideos);
										var ytLink = "http://www.youtube.com/watch?v=";
										for (var v = 0; v < numVideos; v++) {
												var title = videoResponse.items[v].snippet.title;
												var videoId = videoResponse.items[v].snippet.resourceId.videoId;
												console.log("videoId: " + videoId);
												var $videoLink = "<li><a href='" + ytLink + videoId + "'>" + title + "</a></li>";
												$("ul.youtube-video-gallery").append($videoLink);
										}
								
										$("ul.youtube-video-gallery").youtubeVideoGallery({ assetFolder: 'img'});
								});	
						}
						
				});
				
				$.get(apiUrl_fbPosts, function(response) {
						$("#social_feeds").removeClass("loading");										
						var numEntries = response.data.length;
						console.log("Number of entries: " + numEntries);
						for(var i = 0; i < numEntries; i++) {								
								var data = response.data[i];															
								var date = new Date(data.created_time.substr(0, 10)).toLocaleDateString();
								
								var feed = "<li>";
								feed += "<img src=" + data.icon + " alt/>&nbsp;<strong>" + date + "</strong><br />" + data.message + "<br />";
								
								if (data.link) {
										feed += "<a href='" + data.link + "' target='_blank'>";
										if (data.picture) {
												feed += "<img src='" + data.picture + "' alt/>";
										}
										feed += "</a>";
								}
								
								feed += "</li>";
								
								$("#social_feeds ul").append(feed);
						}
						
				});
				
				
				
		});
		
} )( jQuery );