window.onload = function() {
	var duration = 1000;
	var currBoard = "cbse";
	var currStd = 0;
	var currSub, currChap, currStdNum, currSubNum, currChapNum, currTop, currTopNum, currLess, currLessNum, totalStd, shortSub;
	var totChapNum = 0, totTopicNum=0, totLessonNum=4;
	var totSubjects = [];
	var totChapters = [];
	var totTopics = [];
	var totLessons = [];
	var shortSub_arr = ["eng", "bio", "mat", "geo", "eco", "sci", "alg", "civ", "gram", "his", "buss"];
	var fullSub_arr = ["English", "Biology", "Maths", "Geography", "Economics", "Science", "Algebra", "Civics", "English Grammar", "History", "Bussiness Studies"];
	var topicPath = "", lessonPath = "";
	var dbPath = "../Shell/db/" + currBoard + "/";
	
	//readXML();
	readStdData();
	
	//Init Data
	$('#stdSelect').attr('size', '5');
	$('#subSelect').attr('size', '3');
	$('#chapSelect').attr('size', '3');
	document.getElementById('stdSelect').selectedIndex = -1;
	$('#subBtn a').css({'cursor':'default', 'opacity':'0.5'});
	$('#chapBtn a').css({'cursor':'default', 'opacity':'0.5'});
	
	function readStdData(){
		totalStd = standard.stdData.length;
		for(var i=0; i < totalStd; i++){
			var StdText = standard.stdData[i].Class;
			if(StdText.charAt(StdText.length - 1) !== '#'){
				$('<option class="">' + StdText + '</option>').appendTo('#stdSelect');
			}else{
				$('<option class="" disabled hidden>' + StdText.substr(0, StdText.length - 1) + '</option>').appendTo('#stdSelect');
			}
		}
	}
		
	// Buttons
	$('#stdBtn').click(function() {
		if(currStdNum !== 0){
			$('#divStdSelect').slideToggle(duration);
			$('#divSubSelect').slideUp(duration);
			$('#divChapSelect').slideUp(duration);
		}
    });
	
	$('#stdSelect').change(function(e) {
		currStd = e.target.value;
		currStdNum = (e.currentTarget.selectedIndex + 1);
		if(currStdNum > 0){
			$('#stdBtn a').html(currStd);
			resetSubData();
			readSubData();
			resetChapData();
			resetTopicData();
			resetLessData();
		}
	});
			
	function resetSubData(){
		$('#subSelect').html('');
		$('#subBtn a').html("Subjects");
		$('#subBtn').unbind('click');
	}
	
	function readSubData(){
		var subs = standard.stdData[currStdNum - 1].Subjects;
		totSubjects = subs.split(',');
		for(var i=0; i < totSubjects.length; i++){
			var SubText = totSubjects[i];
			if(SubText.charAt(SubText.length - 1) !== '#'){
				$('<option class="">' + SubText + '</option>').appendTo('#subSelect');
			}else{
				$('<option class="" disabled hidden>' + SubText.substr(0, SubText.length - 1) + '</option>').appendTo('#subSelect');
			}
		}
		document.getElementById('subSelect').selectedIndex = -1;
		$('#subBtn a').css({'cursor':'pointer', 'opacity':'1'});
		
		$('#subBtn').click(function() {
			if(currSubNum !== 0){
				$('#divStdSelect').slideUp(duration);
				$('#divSubSelect').slideToggle(duration);
				$('#divChapSelect').slideUp(duration);
			}
   		});
	
		$('#subSelect').change(function(e) {
			currSub = e.target.value;
			currSubNum = (e.currentTarget.selectedIndex + 1);
			if(currSubNum > 0){
				$('#subBtn a').html(currSub);
				topicPath = dbPath + "topics/" + currSub + "_" + currStd + ".json";
				resetChapData();
				resetTopicData();
				resetLessData();
				removeJS_Script('loadChapJS');
				updateChapJS_Script(topicPath, 'loadChapJS');
			}
		});
	}
	
	function resetChapData(){
		$('#chapSelect').html('');
		$('#chapBtn a').html("Chapters");
		$('#chapBtn a').css({'cursor':'default', 'opacity':'0.5'});
		$('#chapBtn').unbind('click');
	}
		
	function removeJS_Script(objName){
		document.getElementById(objName).remove();
	}
	
	function updateChapJS_Script(path, idVal){
		var scriptTag = document.createElement('script');
		scriptTag.src = path;
		scriptTag.id = idVal;
		document.body.appendChild(scriptTag);
		scriptTag.addEventListener("load", loadChapScriptFunc);
	}
	
	function loadChapScriptFunc(){
		totChapNum = topic.topicData.length;
		totChapters = [];
		for(var i = 0; i < totChapNum; i++){
			var tempChap = topic.topicData[i].Chapter.name;
			totChapters.push(tempChap);
		}
		readChapData();
	}
	
	function readChapData(){
		for(var i=0; i < totChapters.length; i++){
			var ChapText = totChapters[i];
			if(ChapText.charAt(ChapText.length - 1) !== '#'){
				$('<option class="">' + ChapText + '</option>').appendTo('#chapSelect');
			}else{
				$('<option class="" disabled hidden>' + ChapText.substr(0, ChapText.length - 1) + '</option>').appendTo('#chapSelect');
			}
		}
		
		document.getElementById('chapSelect').selectedIndex = -1;
		$('#chapBtn a').css({'cursor':'pointer', 'opacity':'1'});
		
		$('#chapBtn').click(function() {
			if(currChapNum !== 0){
				$('#divStdSelect').slideUp(duration);
				$('#divSubSelect').slideUp(duration);
				$('#divChapSelect').slideToggle(duration);
			}
    	});
	
		$('#chapSelect').change(function(e) {
			currChap = e.target.value;
			currChapNum = (e.currentTarget.selectedIndex + 1);
			if(currChapNum > 0){
				$('#chapBtn a').html(currChap);
				resetTopicData();
				resetLessData();
				loadTopics();
			}
		});
	}
	
	function resetTopicData(){
		$('#topicList').html('');
	}
	
	function loadTopics(){
		$('.topicSection').hide();
		totTopicNum = topic.topicData[currChapNum - 1].Chapter.M.length;
		for(var i = 1; i <= totTopicNum; i++){
			var TopText = topic.topicData[currChapNum - 1].Chapter.M[i-1].name;
			if(TopText.charAt(TopText.length - 1) != '#'){
				$('<li class="" id="topic_btn'+ i + '"><a href="#">' + TopText + '</a></li>').appendTo('#topicList');
			}else{
				$('<li class="" id="topic_btn' + i + '" hidden><a href="#">' + TopText.substr(0, TopText.length - 1) + '</a></li>').appendTo('#topicList');
			}
			
			var topicBtn = document.getElementById('topic_btn'+ i);
			topicBtn.addEventListener("click", clickTopics);
		}
				
		$('.topicSection').show(duration);
	}
	
	 function clickTopics(){
		currTop = $(this).find('a').text();
		currTopNum = this.id.charAt(this.id.length-1);
		var topIdNum = topic.topicData[currChapNum - 1].Chapter.M[currTopNum-1].id;
		 if(currTopNum > 0){
		 	lessonPath = dbPath + "lessons/" + currSub + "/" + currSub + "_" + currStd + "_" + topIdNum + ".json";
			 if($('#lessonList li').length > 0){
			 	resetLessData();
				setTimeout(clearLessData, duration);
			 }else{
				 clearLessData();
			 }
	 	}
	}
	
	function resetLessData(){
		$('.lessonSection').slideUp(duration);
	}
	
	function clearLessData(){
		$('#lessonList').html('');
		removeJS_Script('loadLessJS');
		updateLessJS_Script(lessonPath, 'loadLessJS');
	}
	
	function updateLessJS_Script(path, idVal){
		var scriptTag = document.createElement('script');
		scriptTag.src = path;
		scriptTag.id = idVal;
		document.body.appendChild(scriptTag);
		scriptTag.addEventListener("load", loadLessScriptFunc);
	}
	
	function loadLessScriptFunc(){
		totLessonNum = lesson.lessonData.M.length;
		totLessons = [];
		for(var i = 0; i < totLessonNum; i++){
			var tempLess = lesson.lessonData.M[i].name;
			totLessons.push(tempLess);
		}
		loadLessData();
	}
	
	function loadLessData(){		
		for(var j = 1; j <= totLessonNum; j++){
			var LessText = lesson.lessonData.M[j-1].name;
			if(LessText.charAt(LessText.length - 1) != '#'){
				$('<li class="" id="lesson_btn'+ j + '"><a href="#">' + LessText + '</a></li>').appendTo('#lessonList');
			}else{
				$('<li class="" id="lesson_btn' + j + '" hidden><a href="#">' + LessText.substr(0, LessText.length - 1) + '</a></li>').appendTo('#lessonList');
			}
			
			var lessBtn = document.getElementById('lesson_btn' + j);
			lessBtn.addEventListener("click", clickLessons);
		}
		
		$('.lessonSection').slideDown(duration);
		setTimeout(showLessons, duration);
	}
	
	function showLessons(){		
		$('body,html').animate({scrollTop:$('.content_footer').offset().top}, duration);
	}
			
	function clickLessons(){
		currLess = $(this).text();
		currLessNum = this.id.charAt(this.id.length-1);
		for(var i = 0; i < shortSub_arr.length; i++){
			if(currSub === fullSub_arr[i]){
				shortSub = shortSub_arr[i];
				i = fullSub_arr.length;
			}
		}
		launchLesson();
	}
	
	function launchLesson(){
		var videoPath = currBoard + "_class" + currStd + "_" + shortSub + "_ch" + currChapNum + "_tp" + currTopNum + "_lu" + currLessNum;
		var filePathMp4 = 'Project/Class' + currStd + "/" + currSub + "/" + videoPath + "/"+ videoPath + ".mp4";
		var filePathWebm = 'Project/Class' + currStd + "/" + currSub + "/" + videoPath + "/"+ videoPath + ".webm";
		var poster = 'Project/Class' + currStd + "/" + currSub + "/" + videoPath + "/"+ "poster.jpg";
				
		$('.shell-header h4').html(currLess);
		$('<source src="' + filePathMp4 + '"type="video/mp4">').appendTo('#luShell-video');
		$('<source src="' + filePathWebm + '" type="video/webm">').appendTo('#luShell-video');
		$('#luShell-video').attr('poster', poster);
		$('#luShell-video').load();
			
		$('#luShell').slideDown(duration);
		
		$('#luShell-player').bind(function(){
			//
		});
		var boxWidth = ($(document).width() * 80) / 100;
		var boxHeight = ($(document).height() * 80) / 100;
		$('#luShell-video').css({'width':boxWidth,'height':boxHeight});
		
		$('#luPopupClose').click(function(){
			$('#luShell').slideUp(duration);
			var video = document.getElementById('luShell-video');
			video.pause();
			$('#luShell-video').html('');
		});
	}
	
};
/*function readXML(){
	var xmlHttp = new window.XMLHttpRequest();
	xmlHttp.open("GET", 'Project/Database/cbse/XML_STD.xml', false);
	xmlHttp.send(null);
	var xmlDoc = xmlHttp.responseXML.documentElement;
	console.log(xmlDoc);
}*/

window.onresize = function(){
	//var boxWidth = ($(document).height() * 80) / 100;
	//$('#luShell-video').css('width',boxWidth);
};