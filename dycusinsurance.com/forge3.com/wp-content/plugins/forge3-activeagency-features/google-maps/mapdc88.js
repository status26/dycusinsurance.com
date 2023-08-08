/**
 * Salient Google Maps script file. (Revised by Forge3)
 *
 * @package Salient
 * @author ThemeNectar
 */
/* global google */
/* global nectarLove */

Object.keys = Object.keys || function(o) { 
    var result = []; 
    for(var name in o) { 
        if (o.hasOwnProperty(name)) 
          result.push(name); 
    } 
    return result; 
};

(function($) { 
  
  "use strict";
  
  jQuery(document).ready(function($){

    var enableAnimation, 
    extraColor, 
    greyscale, 
    enableZoom, 
    enableZoomConnect, 
    markerImg, 
    centerlng, 
    centerlat, 
    zoomLevel, 
    latLng;
    
    var map     = [],
    styles      = [],
    infoWindows = [];
    
    window.mapAPI_Loaded = function() {
      
      for(var i = 0; i < $('.nectar-google-map').length; i++) {
        infoWindows[i] = [];
      }
      
      $('.nectar-google-map').each(function(i){
        
        //map margin if page header
        if( $('#page-header-bg:not("[data-parallax=1]")').length > 0 && $('#contact-map').length > 0 ) { 
          $('#contact-map').css('margin-top', 0);  
          $('.container-wrap').css('padding-top', 0);
        } 
        if( $('#page-header-bg[data-parallax=1]').length > 0 ) {
          $('#contact-map').css('margin-top', '-30px');
        }
        
        zoomLevel  = parseFloat($(this).attr('data-zoom-level'));
        centerlat  = parseFloat($(this).attr('data-center-lat'));
        centerlng  = parseFloat($(this).attr('data-center-lng'));
        markerImg  = $(this).attr('data-marker-img');
        enableZoom = $(this).attr('data-enable-zoom');
        enableZoomConnect = (enableZoom == '1') ? false : true;
        greyscale  = $(this).attr('data-greyscale');
        extraColor = $(this).attr('data-extra-color');
        
        var ultraFlat = $(this).attr('data-ultra-flat');
        var darkColorScheme = $(this).attr('data-dark-color-scheme');
        var $flatObj = [];
        var $darkColorObj = [];
        enableAnimation = $(this).attr('data-enable-animation');
        
        if( isNaN(zoomLevel) ) { 
          zoomLevel = 12; 
        }
        if( isNaN(centerlat) ) { 
          centerlat = 51.47; 
        }
        if( isNaN(centerlng) ) { 
          centerlng = -0.268199; 
        }
        
        if( typeof enableAnimation != 'undefined' && enableAnimation == 1 && $(window).width() > 690) { 
          enableAnimation = google.maps.Animation.BOUNCE;
        } else { 
          enableAnimation = null; 
        }
        
        latLng = new google.maps.LatLng(centerlat,centerlng);
        
        //color
        
        if(ultraFlat == '1') {
          $flatObj = [{
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },
          {
            "featureType": "administrative",
            "stylers": [
              { "visibility": "off" }
            ]
          }];
        } else {
          $flatObj[0] = {};
          $flatObj[1] = {};
          $flatObj[2] = {};
        }
        
        
        if(darkColorScheme == '1') {
          $darkColorObj = [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "saturation": 36
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 40
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "on"
              },
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              },
              {
                "weight": 1.2
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 21
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 29
              },
              {
                "weight": 0.2
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 18
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 19
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              }
            ]
          }];
        } else {
          $darkColorObj[0] = {};
          $darkColorObj[1] = {};
          $darkColorObj[2] = {};
          $darkColorObj[3] = {};
          $darkColorObj[4] = {};
          $darkColorObj[5] = {};
          $darkColorObj[6] = {};
          $darkColorObj[7] = {};
          $darkColorObj[8] = {};
          $darkColorObj[9] = {};
          $darkColorObj[10] = {};
          $darkColorObj[11] = {};
          $darkColorObj[12] = {};
        }
        
        if(greyscale == '1' && extraColor.length > 0) {
          styles = [
            
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{
                visibility: "off"
              }]
            }, 
            { 
              featureType: "road.local", 
              elementType: "labels.icon", 
              stylers: [{ 
                "visibility": "off" 
              }] 
            },
            { 
              featureType: "road.arterial", 
              elementType: "labels.icon", 
              stylers: [{ 
                "visibility": "off" 
              }] 
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{
                visibility: "off"
              }]
            }, 
            { 
              featureType: "transit", 
              elementType: "geometry.fill", 
              stylers: [
                { hue: extraColor },
                { visibility: "on" }, 
                { lightness: 1 }, 
                { saturation: 7 }
              ]
            },
            {
              elementType: "labels",
              stylers: [{
                saturation: -100,
              }]
            }, 
            {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [
                { hue: extraColor },
                { visibility: "on" }, 
                { lightness: 20 }, 
                { saturation: 7 }
              ]
            },
            {
              featureType: "landscape",
              stylers: [
                { hue: extraColor },
                { visibility: "on" }, 
                { lightness: 20 }, 
                { saturation: 20 }
              ]
              
            }, 
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                { hue: extraColor },
                { visibility: "on" }, 
                { lightness: 1 }, 
                { saturation: 7 }
              ]
            }, 
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                { hue: extraColor },
                { visibility: "on" }, 
                { lightness: 1 }, 
                { saturation: 7 }
              ]
            },
            $darkColorObj[0],
            $darkColorObj[1],
            $darkColorObj[2],
            $darkColorObj[3],
            $darkColorObj[4],
            $darkColorObj[5],
            $darkColorObj[6],
            $darkColorObj[7],
            $darkColorObj[8],
            $darkColorObj[9],
            $darkColorObj[10],
            $darkColorObj[11],
            $darkColorObj[12],
            $flatObj[0],
            $flatObj[1],
            $flatObj[2]
          ];
          
        } 
        
        
        
        else if(greyscale == '1'){
          
          styles = [
            
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{
                visibility: "off"
              }]
            }, 
            { 
              featureType: "road.local", 
              elementType: "labels.icon", 
              stylers: [{ 
                "visibility": "off" 
              }] 
            },
            { 
              featureType: "road.arterial", 
              elementType: "labels.icon", 
              stylers: [{ 
                "visibility": "off" 
              }] 
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{
                visibility: "off"
              }]
            }, 
            {
              elementType: "geometry",
              stylers: [{
                saturation: -100
              }]
            },
            {
              elementType: "labels",
              stylers: [{
                saturation: -100
              }]
            }, 
            {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [{
                color: "#ffffff"
              }]
            },
            {
              featureType: "landscape",
              stylers: [{
                color: "#ffffff"
              }]
            }, 
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [ {
                color: "#f1f1f1"
              }]
            }, 
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{
                color: "#b9e7f4"
              }]
            },
            $darkColorObj[0],
            $darkColorObj[1],
            $darkColorObj[2],
            $darkColorObj[3],
            $darkColorObj[4],
            $darkColorObj[5],
            $darkColorObj[6],
            $darkColorObj[7],
            $darkColorObj[8],
            $darkColorObj[9],
            $darkColorObj[10],
            $darkColorObj[11],
            $darkColorObj[12],
            $flatObj[0],
            $flatObj[1],
            $flatObj[2]
          ];
          
          
        }
        
        
        else {
          styles = [];
        } 
        
        
        var styledMap = new google.maps.StyledMapType(styles,
          {name: "Styled Map"});
          
          
          //options
          var mapOptions = {
            center: latLng,
            zoom: zoomLevel,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            scrollwheel: false,
            panControl: false,
            zoomControl: enableZoom,
            disableDoubleClickZoom: enableZoomConnect,	  
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.LARGE,
              position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false
            
          };
          
          map[i] = new google.maps.Map(document.getElementById($(this).attr('id')), mapOptions);
          
          //Associate the styled map with the MapTypeId and set it to display.
          map[i].mapTypes.set('map_style', styledMap);
          map[i].setMapTypeId('map_style');
          
          var $count = i;
          
          google.maps.event.addListenerOnce(map[i], 'tilesloaded', function() {
            
            var map_id = $(map[i].getDiv()).attr('id');
            
            //don't start the animation until the marker image is loaded if there is one
            if(markerImg.length > 0) {
              var markerImgLoad = new Image();
              markerImgLoad.src = markerImg;
              
              $(markerImgLoad).load(function(){
                setMarkers(map[i], map_id, $count);
              });
              
            }
            else {
              setMarkers(map[i], map_id, $count);
            }
          });
          /*
          Forge3 Note: Adds class to map after loading.
          --- Start Custom LazyLoad Code ---
          */
          $(this).addClass('loaded');
          /*
          --- End Custom LazyLoad Code ---
          */
          
        });
        
        
        //watcher to resize gmap inside grow-in animatino col
        var $gMapsAnimatedSelector = $('.col.has-animation[data-animation="grow-in"] .nectar-google-map');
        var gMapsInterval = [];
        $gMapsAnimatedSelector.each(function(i){
          
          var $that = $(this);
          
          //watcher
          gMapsInterval[i] = setInterval(function(){
            
            if($that.parents('.col.has-animation[data-animation="grow-in"]').hasClass('animated-in')) {
              
              for(var k=0; k < map.length; k++ ) {
                google.maps.event.trigger(map[k], 'resize');
              }
              
              //clear watcher
              setTimeout(function(){
                clearInterval(gMapsInterval[i]);
              },1000); 
              
            }
            
          },500);
          
        });
        
        CustomMarker.prototype = new google.maps.OverlayView();
        CustomMarker.prototype.draw = function() {
          
          var me = this;
          var div = this.div_;
          
          if (!div) {
            
            div = this.div_ = $('' +
            '<div><div class="animated-dot">' +
            '<div class="middle-dot"></div>' +
            '<div class="signal"></div>' +
            '<div class="signal2"></div>' +
            '</div></div>' +
            '')[0];
            
            
            div.style.position = 'absolute';
            div.style.paddingLeft = '0px';
            div.style.cursor = 'pointer';
            
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
            
            
            
          }
          var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
          if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
          }
          
          //infowindow
          google.maps.event.addDomListener(div, "click", function(event) {
            
            infoWindows[me.mapIndex][me.infoWindowIndex].setPosition(me.latlng_);
            infoWindows[me.mapIndex][me.infoWindowIndex].open(me.map);
            
          });
          
        };
        CustomMarker.prototype.remove = function() {
          // Check if the overlay was on the map and needs to be removed.
          if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
          }
        };
        
        CustomMarker.prototype.getPosition = function() {
          return this.latlng_;
        };
        
      }; //api loaded
      
      
      
      if(typeof google === 'object' && typeof google.maps === 'object') {
        //skip processing.
      } else {

        /*
        Forge3 Note: Use IntersectionObserver to LazyLoad Google Maps. 
        This section is custom, and along with the IntersectionObserver Polyfill below, can be copy/pasted from any new Salient updated maps.js code.
        
        --- Start Custom LazyLoad Code ---
        */

        var options = {
          rootMargin: '0px',
          threshold: 0.5
        }
        var $allmaps = $('.nectar-google-map');

        var observer = new IntersectionObserver(
          function(entries, self) {
            // Intersecting with Edge workaround https://calendar.perfplanet.com/2017/progressive-image-loading-using-intersection-observer-and-sqip/#comment-102838
            var isIntersecting = typeof entries[0].isIntersecting === 'boolean' ? entries[0].isIntersecting : entries[0].intersectionRatio > 0
            if (isIntersecting) {              
              $allmaps.each(function(index, el) {          
                self.unobserve(el);
              });

              /*
              Forge3 Note: This is the proxied script to hide the API from public view
              */ 
              $.getScript('/maps/api/js/');

            }
          },
          options
        )

        $allmaps.each(function(index, el) {          
          observer.observe(el);
        });
        
        // if(nectarLove.mapApiKey.length > 0) {
        //   $.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&key='+nectarLove.mapApiKey+'&callback=mapAPI_Loaded');
        // } else {
        //   $.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&callback=mapAPI_Loaded');
        // }

        /*
        --- End Custom LazyLoad Code ---
        */
        
      }
      
    
      
      function CustomMarker(latlng,  map, PARAM1, PARAM2) {
        this.latlng_ = latlng;
        this.infoWindowIndex = PARAM1;
        this.mapIndex = PARAM2;
        this.setMap(map);
      }
      
      function setMarkers(map,map_id,count) {
        
        
        $('.map-marker-list.'+map_id).each(function(){
          
          var enableAnimation = $('#'+map_id).attr('data-enable-animation');
          
          $(this).find('.map-marker').each(function(i){
            
            //nectar marker 
            if($('#'+map_id).is('[data-marker-style="nectar"]')) {
              var latlng = new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-lng'));
              var overlay = new CustomMarker(latlng, map, i, count);
            }
            
            
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-lng')),
              map: map,
              visible: false,
              mapIndex: count,
              infoWindowIndex : i,
              icon: $('#'+map_id).attr('data-marker-img'),
              optimized: false
            }); 
            
            //google default marker
            if(!$('#'+map_id).is('[data-marker-style="nectar"]')) {
              //animation
              if(typeof enableAnimation != 'undefined' && enableAnimation == 1 && $(window).width() > 690) {
                setTimeout(function() {			     	
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                  marker.setOptions({ visible: true });
                  setTimeout(function(){marker.setAnimation(null);},500);
                },   i * 200);
              } else {
                marker.setOptions({ visible: true });
              }
            }
            
            //infowindows 
            if($(this).attr('data-mapinfo') != '' && $(this).attr('data-mapinfo') != '<br />' && $(this).attr('data-mapinfo') != '<br/>') {
              var infowindow = new google.maps.InfoWindow({
                content: $(this).attr('data-mapinfo'),
                maxWidth: 300
              });
              
              infoWindows[count].push(infowindow);
              
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                
                return function() {
                  infoWindows[this.mapIndex][this.infoWindowIndex].open(map, this);
                };
                
              })(marker, i));
            }
            
            
          });
          
        });
        
        
      }//setMarker
      
  });
    
})(jQuery);


/* 
Forge3 Note: Intersection Observer Polyfill necessary for older browsers
*/
/* W3C Intersection Observer Polyfill https://github.com/w3c/IntersectionObserver  */
(function(e,f){function m(a){this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||l();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect,b=b.width*b.height;this.intersectionRatio=a?b/a:this.isIntersecting?1:0}function c(a,b){b=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(b.root&&1!=b.root.nodeType)throw Error("root must be an Element");
this._checkForIntersections=u(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(b.rootMargin);this.thresholds=this._initThresholds(b.threshold);this.root=b.root||null;this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function u(a,b){var d=null;return function(){d||(d=setTimeout(function(){a();d=null},b))}}function q(a,b,d,c){"function"==
typeof a.addEventListener?a.addEventListener(b,d,c||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,d)}function r(a,b,d,c){"function"==typeof a.removeEventListener?a.removeEventListener(b,d,c||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,d)}function n(a){try{var b=a.getBoundingClientRect()}catch(d){}if(!b)return l();b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top});return b}function l(){return{top:0,bottom:0,
left:0,right:0,width:0,height:0}}function t(a,b){for(;b;){if(b==a)return!0;b=p(b)}return!1}function p(a){return(a=a.parentNode)&&11==a.nodeType&&a.host?a.host:a}if("IntersectionObserver"in e&&"IntersectionObserverEntry"in e&&"intersectionRatio"in e.IntersectionObserverEntry.prototype)"isIntersecting"in e.IntersectionObserverEntry.prototype||Object.defineProperty(e.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var g=[];c.prototype.THROTTLE_TIMEOUT=
100;c.prototype.POLL_INTERVAL=null;c.prototype.USE_MUTATION_OBSERVER=!0;c.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections();this._checkForIntersections()}};c.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._observationTargets.length||
(this._unmonitorIntersections(),this._unregisterInstance())};c.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};c.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};c.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,d,c){if("number"!=typeof a||isNaN(a)||0>a||1<a)throw Error("threshold must be a number between 0 and 1 inclusively");
return a!==c[d-1]})};c.prototype._parseRootMargin=function(a){a=(a||"0px").split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!a)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};c.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,
this.POLL_INTERVAL):(q(e,"resize",this._checkForIntersections,!0),q(f,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in e&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(f,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};c.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,
r(e,"resize",this._checkForIntersections,!0),r(f,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))};c.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():l();this._observationTargets.forEach(function(d){var c=d.element,h=n(c),f=this._rootContainsTarget(c),k=d.entry,g=a&&f&&this._computeTargetAndRootIntersection(c,b);d=d.entry=new m({time:e.performance&&performance.now&&performance.now(),target:c,
boundingClientRect:h,rootBounds:b,intersectionRect:g});k?a&&f?this._hasCrossedThreshold(k,d)&&this._queuedEntries.push(d):k&&k.isIntersecting&&this._queuedEntries.push(d):this._queuedEntries.push(d)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)};c.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=e.getComputedStyle(a).display){var d=n(a);a=p(a);for(var c=!1;!c;){var h=null,g=1==a.nodeType?e.getComputedStyle(a):{};if("none"==g.display)return;a==this.root||
a==f?(c=!0,h=b):a!=f.body&&a!=f.documentElement&&"visible"!=g.overflow&&(h=n(a));if(h){var g=Math.max(h.top,d.top),k=Math.min(h.bottom,d.bottom),l=Math.max(h.left,d.left),d=Math.min(h.right,d.right),h=d-l,m=k-g,d=0<=h&&0<=m&&{top:g,bottom:k,left:l,right:d,width:h,height:m};if(!d)break}a=p(a)}return d}};c.prototype._getRootRect=function(){if(this.root)var a=n(this.root);else{a=f.documentElement;var b=f.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||
b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};c.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};c.prototype._hasCrossedThreshold=function(a,b){a=a&&a.isIntersecting?a.intersectionRatio||0:-1;b=b.isIntersecting?b.intersectionRatio||
0:-1;if(a!==b)for(var c=0;c<this.thresholds.length;c++){var e=this.thresholds[c];if(e==a||e==b||e<a!==e<b)return!0}};c.prototype._rootIsInDom=function(){return!this.root||t(f,this.root)};c.prototype._rootContainsTarget=function(a){return t(this.root||f,a)};c.prototype._registerInstance=function(){0>g.indexOf(this)&&g.push(this)};c.prototype._unregisterInstance=function(){var a=g.indexOf(this);-1!=a&&g.splice(a,1)};e.IntersectionObserver=c;e.IntersectionObserverEntry=m}})(window,document);