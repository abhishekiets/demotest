window.onload = function() {
	var mainFile_arr = ['','K-Class/content_selector','Exploriments/exploriments','Videos/sci_videos','Rhymes_Stories/rhymes_stories'];
	
	// Buttons
	var totMainBtns = 4;
	
			alert('hdsdsi ');
	for(var i=1; i <= totMainBtns; i++){
		var btn = document.getElementById("btn"+i);
		btn.addEventListener("click", function(){
			var idName = this.id.charAt(3);
			alert('hi ' + mainFile_arr[idNmae]);
			window.location = "Content/" + mainFile_arr[idName] + ".html";
		});
	}
	
	$('#intro-video').on("ended", function(){
		$('.mainBtns').show();
		$('.intro-header').show();
		$(this).hide();
	});	
};
