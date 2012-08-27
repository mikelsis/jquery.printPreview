(function( $ ) {

  $.fn.printPreview = function() {
  	close_button = $("<div>").attr("id","print_preview_clouse_btn");
  	print_button = $("<div>").attr("id","print_preview_print_btn");

  	this.click(function(e){
  		e.preventDefault();

  		$("body").prepend(close_button);
  		$("body").prepend(print_button);

  		container = $("<div>").attr("id", "print_preview_container").load($(this).attr("href"));
		background = $("<div>").attr("id", "print_preview_background");
  		border = $("<div>").attr("id", "print_preview_border");
  		border.append(container);
  		$("body").prepend(border.fadeTo('slow', 1, function(){
  			close_button.fadeTo(100, 0.8, function(){
  				print_button.fadeTo(100, 0.8);
  			});
  		}));
		$("body").prepend(background.fadeTo('slow', 0.5, function(){
			border.show('slow');
		}));
  	});

  	print_button.click(function(e){
      $("#print_preview_container").attr("style", "margin:0px;")
  		$("#edit_symbol").hide();
  		print_frame = $("#print_preview_container");
  		if (print_frame.size() > 1){
			print_frame.eq( 0 ).print();
			return;
		} else if (!print_frame.size()){
			return;
		}

		var strFrameName = ("printer-" + (new Date()).getTime());
		var jFrame = $( "<iframe name='" + strFrameName + "'>" );

		jFrame
			.css( "width", "1px" )
			.css( "height", "1px" )
			.css( "position", "absolute" )
			.css( "left", "-9999px" )
			.appendTo( $( "body:first" ) )
		;

		var objFrame = window.frames[ strFrameName ];
		var objDoc = objFrame.document;

		var jStyleDiv = $( "<div>" ).append(
			$( "style" ).clone()
		);

		objDoc.open();
		objDoc.write( "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" );
		objDoc.write( "<html>" );
		objDoc.write( "<body>" );
		objDoc.write( "<head>" );
		objDoc.write( "<title>" );
		objDoc.write( document.title );
		objDoc.write( "</title>" );
		objDoc.write( jStyleDiv.html() );
		objDoc.write( "</head>" );
		objDoc.write( print_frame.html() );
		objDoc.write( "</body>" );
		objDoc.write( "</html>" );
		objDoc.close();

		objFrame.focus();
		objFrame.print();

		setTimeout( function(){
			jFrame.remove();
		}, (60 * 1000));
		$("#edit_symbol").show();
  	});

  	close_button.click(function(e) {
  		background.fadeTo('slow', 0, function(){
  			background.remove();
  		});
  		$("body").prepend(background.fadeTo('slow', 0.5));
		border.fadeTo('slow', 0, function(){
      		border.remove();
      		print_button.fadeTo(100, 0, function(){
  				close_button.fadeTo(100, 0, function(){
  				// empty
  				});
  			});
      	});
  	});
  };

   $.fn.editSingleLine = function(e) {
   		
   		edit_symbol = $("<img>").attr("id", "edit_symbol");
   		this.append(edit_symbol);
   		clicked = false;
   		this.click(function(){
   			if(!clicked) {
   				$("#edit_symbol").remove();
   				$(this).html("<input id='print_input' type='text' value='"+$(this).text()+"' />");
   				$("#print_input").focus();
   				clicked = true;
   			}
   		});

   		this.focusout(function(e){
   			$(this).text($("#print_input").val());
   			$(this).append(edit_symbol);
   			clicked = false;
   		});

   };

})( jQuery );