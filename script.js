(function() {
	"use strict";

	var arabicRemover = {};

	if(document.location.host.match(/facebook.com|twitter.com/)) {

		// http://stackoverflow.com/a/14570614
		var observeDOM = (function(){
		    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
		        eventListenerSupported = window.addEventListener;

		    return function(obj, callback){
		        if( MutationObserver ){
		            // define a new observer
		            var obs = new MutationObserver(function(mutations, observer){
		                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
		                    callback(mutations);
		            });
		            // have the observer observe foo for changes in children
		            obs.observe( obj, { childList:true, subtree:true });
		        }
		        else if( eventListenerSupported ){
		            obj.addEventListener('DOMNodeInserted', function(ev) { callback(ev) ;}, false);
		            obj.addEventListener('DOMNodeRemoved', function(ev) { callback(ev) 	;} , false);
		        }
		    }
		})();

		
		// extension namespace
		arabicRemover = {
			init: function() {		
				this.documentHTML 	= document.querySelector('html');
				this.totalFinded	= 0								;
				this.alertDiv		= null							;

				this.observe();
			},

			// observe DOM
			observe: function() {
				var self = this;

				observeDOM(self.documentHTML, function(mutations) {
					var targets = [];
					// this inst will happen, but OK
					if(mutations.target != undefined) {
						 if(self.checkIfIsSuspect(mutations.target)) targets = [mutations.target];
					} else { 
						for(var mutation in mutations) {
							var target = (mutations[mutation]).target
							if(self.checkIfIsSuspect(target)) {
								targets.push(target);
							}
						}
					};
					// replace all ocurrenc in suspect elements
					for(target in targets) self.searchAndReplace(targets[target]);
					// TODO : remove
					if(self.totalFinded > 0)  {
						//self.createAlert(this.totalFinded); 
						//self.totalFinded = 0;
					}
				})
			},

			// Replace at specif index
			replaceAt: function(string,search , replaceWith) {
				var index = string.match(search).index;
				if(!index) index = string.search(search);
				var initIndex = (search.toString().length);
				return (string.substring(0,index) + replaceWith + string.substring(index+(search.toString().length - 2)));
			},

			// replace element innerHTML with 'sanitezed HTML'
			searchAndReplace: function(element) {
				var self = this; // this is not necessary here, but...
				if(element && element != undefined) {
					try {
					 	if(self.checkIfIsSuspect(element)) {
							var newDocumentBody = self.replaceAt(element.innerHTML, /̷̴̐ خ/gi, '[Anti Arabic Char]' );
							element.innerHTML = newDocumentBody;
							this.totalFinded++;
							return true;
						}
					} catch(e) {
					}
				}
			},

			// ok
			checkIfIsSuspect: function(element) {
				return (element.innerText.match(/̷̴̐ خ/gi));
			},

			// TODO : remove
			createAlert: function(total) {
				var self = this;
				if(!self.alertDiv) {
					styles_to_apply = {position: 'fixed' , background: 'rgba(0,0,0,0.5)', width: '200px' , bottom: '10px' , right: '10px', padding:'15px', 'color' :'#fff' , 'font-size': '13px', 'z-index': '99999999999999'};
					div = document.createElement('div');
					div.id = "arabic_msg_remove_div";
					for(style in styles_to_apply) if(style in div.style) div.style[style] = styles_to_apply[style];
					this.alertDiv = div;
					document.body.appendChild(this.alertDiv);
					setTimeout(function() {
						self.alertDiv.remove();
						self.alertDiv = null;
					} , 3000);
				};
				this.alertDiv.display = 'inline-block';
				this.alertDiv.innerHTML = "Removing " + total + ' arabic messages(Wait 3 secs to dismiss)';
			}
		};

		// init this shit
		arabicRemover.init();
	};

})();