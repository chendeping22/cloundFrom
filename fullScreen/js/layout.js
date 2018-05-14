          window.onload = function() {
            var elem = document.documentElement,
                height = (elem.clientHeight - 54 )* 0.3333;
//              console.log(elem.clientWidth);
            
            var main = document.getElementById('main');
            	main.style.width = elem.clientWidth ;
            	main.style.overflow = 'hidden';
            	
            var items = document.querySelectorAll('.item');
            for(var i = 0, item; item = items[i++]; ){
                item.style.width = "33.33%"
                item.style.height = height + "px";
//              item.setAttribute('data-type','cell');
                item.style.float = 'left';
                main.appendChild(item)
              
            }
//          for(var i = 0; i < 3; i++ ){
//            for(var j = 0; j< 3; j++){
//              var div = document.getElementById('item');
//              div.style.width = "33.33%"
//              div.style.height = height + "px";
//              div.setAttribute('data-type','cell');
//              div.style.float = 'left';
//              main.appendChild(div)
//            }
//          }
             document.body.appendChild(main);
          };
         window.onresize = function() {
			var elem = document.documentElement;
            height = (elem.clientHeight-54 )* 0.3333;
            var divs = document.querySelectorAll('.item');
//            for(var i = 0,div;div = divs[i++]; ){
				for(var i = 0; i < divs.length; i++ ) {
				  var div = divs[i];	
                  div.style.height = height + "px";

              }
          };
          
