var theDate = new Date();
var dynamicPathArr = new Array();

/* Notification Banner */
var ToggleNotification = function() {
	$('.notification').fadeTo("slow", 0);
	$('.notification').slideToggle("slow");
}

/* Message Center - Tray */
var ToggleTray = function() {
	$('.message-area').slideToggle("slow");
	$('.button-tray').toggleClass('close');
}

/* Message Center - Adjustable Name */
var changeFontSize = function() {
	var firstName = "Hi Bernie";
	var firstNameLength = firstName.length;

	var WelcomeName = document.getElementById("welcome-name");
	WelcomeName.innerHTML = firstName.toLowerCase();
	
	if(firstNameLength <= 9) {
		$("#welcome-name").css({'font-size':'75px'});
	}
	if(firstNameLength > 9 && firstNameLength <= 12) {
		$("#welcome-name").css({'font-size':'54px'});
	}
	if(firstNameLength > 12 && firstNameLength <= 15) {
		$("#welcome-name").css({'font-size':'42px'});
	}
	if(firstNameLength > 15 && firstNameLength <= 18) {
		$("#welcome-name").css({'font-size':'34px'});
	}
	if(firstNameLength > 18 && firstNameLength <= 21) {
		$("#welcome-name").css({'font-size':'29px'});
	}
	if(firstNameLength > 21 && firstNameLength <= 24) {
		$("#welcome-name").css({'font-size':'25px'});
	}
}

/* Policy Summary - Accordian */
var ToggleAccordion = function(divID) {
	$('#'+divID+'.account-summary').toggleClass('sel');
	$('#'+divID+'a.account-breakdown').slideToggle('slow', function() {
	});
}

/* Policy Summary - Slide Accordian - Agent Info */
var ToggleAgent = function(divID) {
	$('#Agent'+divID+'.Actions').css({'position':'relative','left':'200px'});
	$('#Agent'+divID+'.actions').toggleClass('sel');
//				$('#Agent'+divID+'.actions').fadeIn(2000);
	$('#Agent'+divID+'.actions').animate( {
		left: '0px'
	}, "slow", function(){});
	$('#Agent'+divID+'a.agent-photo').css({'position':'relative','left':'200px'});
	$('#Agent'+divID+'a.agent-photo').toggleClass('display');
	$('#Agent'+divID+'a.agent-photo').animate( {
		left: '0px'
	}, "slow", function(){});
}

/* Policy Summary - Tracking - I Want To... */
var GetHref = function(obj){
	var thisLocation = $('#'+obj).prev().attr('id');
	var thisType = $('#'+obj).prev().get(0).tagName;
	var thisValue = document.getElementById(thisLocation).value;
	var pseudoUrl = (thisValue.replace(/\s/g, '')).toLowerCase();
	if(pseudoUrl==''){
	}else{
		var thisUrl = 'css_'+pseudoUrl+'.html?location='+thisLocation+'&type='+thisType+'&value='+thisValue;
		location.href = thisUrl;
	}
}

/* Edit Preferences - Swipe Online Profile */
$(document).ready(function($){
	$(".swipe-email").on("click", function(){
		$("#swipe-main").fadeOut(250, function(){
			$("#swipe-main").css({"display":"none","position":"relative","marginLeft":"-521px"});
		});
		$("#swipe-email").css({"display":"block"});
		$("#swipe-email").animate({
			opacity: 1,
			marginLeft: '-=521'
		}, 1500);
	});
	$(".swipe-phone").on("click", function(){
		$("#swipe-main").fadeOut(250, function(){
			$("#swipe-main").css({"display":"none","position":"relative","marginLeft":"-521px"});
		});
		$("#swipe-phone").css({"display":"block"});
		$("#swipe-phone").animate({
			opacity: 1,
			marginLeft: '-=521'
		}, 1500);
	});
	$(".swipe-pssword").on("click", function(){
		$("#swipe-main").fadeOut(250, function(){
			$("#swipe-main").css({"display":"none","position":"relative","marginLeft":"-521px"});
		});
		$("#swipe-password").css({"display":"block"});
		$("#swipe-password").animate({
			opacity: 1,
			marginLeft: '-=521'
		}, 1500);				
	});
	$(".swipe-question").on("click", function(){
		$("#swipe-main").fadeOut(250, function(){
			$("#swipe-main").css({"display":"none","position":"relative","marginLeft":"-521px"});
		});
		$("#swipe-question").css({"display":"block"});
		$("#swipe-question").animate({
			opacity: 1,
			marginLeft: '-=521'
		}, 1500);				
	});
	$(".swipe-main1").on("click", function(){
		whichSection("1");
	});
	$(".swipe-main2").on("click", function(){
		whichSection("2");
	});
	$(".swipe-main3").on("click", function(){
		whichSection("3");
	});
	$(".swipe-main4").on("click", function(){
		whichSection("4");
	});
	
	$(".EditPrefLink").on("click", function(){
		$("#EditPrefTd").fadeIn("slow", function(){
			$("#edit-preference-td").html('<input type="text" value="ProjektMK6" maxlength="20" onClick="this.value=\'\';"> <a class="button-blue" href="javascript://"><span>Save</span></a> <a class="link red EditPrefCancel" href="javascript://">Cancel</a> | <a class="link-right red EditPrefCancel" href="javascript://">Remove</a>');
		});
		$("#edit-preference-td").parent().addClass("row-edit");
	});
	$(".EditPrefCancel").on("click", function(){
		$("#edit-preference-td").fadeIn("slow", function(){
			$("#edit-preference-td").html('<label>ProjektMK6</label> <a class="link-left EditPreflink" href="javascript://">Edit</a>');
		});
		$("#edit-preference-td").parent().removeClass("row-edit");
	});
});
var whichSection = function(someNum){
	switch(someNum){
		case "1":
			$("#swipe-email").css({"display":"none","position":"relative","marginLeft":"521px"});
		break;
		case "2":
			$("#swipe-phone").css({"display":"none","position":"relative","marginLeft":"521px"});
		break;
		case "3":
			$("#swipe-password").css({"display":"none","position":"relative","marginLeft":"521px"});
		break;
		case "4":
			$("#swipe-question").css({"display":"none","position":"relative","marginLeft":"521px"});
		break;
		default:
	
		break;	
	}
	$("#swipe-main").css({"display":"block"});
	$("#swipe-main").animate({
		opacity: 1,
		marginLeft: '+=521'
	}, 1500);
}