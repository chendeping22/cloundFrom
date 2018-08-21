          window.onload = function() {
            var elem = document.documentElement,
                height = (elem.clientHeight - 54 );
            var main = document.getElementById('main');
            main.style.height = height+"px";
            	main.style.width = elem.clientWidth ;
            	main.style.overflow = 'hidden';
            var items = document.querySelectorAll('.item');
            for(var i = 0, item; item = items[i++]; ){
                item.style.width = "33.33%"
                item.style.height = height*0.333 + "px";
                item.style.float = 'left';
                main.appendChild(item)
              
            }
             document.body.appendChild(main);
          };
         window.onresize = function() {
			var elem = document.documentElement;
            console.log(elem.clientWidth);
            height = (elem.clientHeight-54 )* 0.3333;
            var divs = document.querySelectorAll('.item');
				for(var i = 0; i < divs.length; i++ ) {
				  var div = divs[i];	
                  div.style.height = height + "px";

              }
          };
          
