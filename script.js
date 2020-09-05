(function($) {

$("#openNav").click(function() {
  $(".page").addClass("swipe-lft");
  $(".nav").addClass("open");
});
$("#closeNav").click(function() {
  $(".page").removeClass("swipe-lft");
  $(".nav").removeClass("open");
});

	var adata = 'data: ';
	var productName;
	var className;
	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

$( window ).load(function() {
    $body.removeClass('is-preload', function(){
    	$body.addClass('is-loaded');
    });
});

var btnContainer = document.getElementById("product-matrix");
var btns = btnContainer.getElementsByClassName("product-tab");

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var current = document.getElementsByClassName("active");
		if (current.length > 0) {
			current[0].className = current[0].className.replace(" active", "");
		}	
    	this.className += " active";
		productName = this.className.split(" ")[0];

		postData = {
			"productName": productName
		};
        getProduct(postData);
	});
}
	
function getProduct(postData){
	$.ajax({
        type        :            "POST",
        url         :            "/wp-content/elzalive-content/ajax-php/return.php",
        data        :            postData,	
        dataType    :            "json",
        success: function(response) {
            $("#product-title").html(response.productTitle);
            $("#product-description").html(response.productDescription);
            var dataSheets = response.tds + "&nbsp;&nbsp;&nbsp;" + response.sds;
            $("#tds-sds-links").html(dataSheets);
            $("#landing-page").fadeOut(250, function(){
            	$("#product-section").fadeIn(250);
				$(".product-tab").removeClass("active");	
            });
        },
		complete: function(response) {
        },
    	error: function (response) {
        var r = response;
        alert(adata+r)
        }
    });
};

$( ".left-nav" ).on	( "click", function() {
	$("#product-section").fadeOut(500, function(){
		$("#landing-page").fadeIn(250);
	});
});

})(jQuery)