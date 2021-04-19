var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var dayEventItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//base
function initializeSchedule(){
//each time block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var dayEventObj = {
      //set related todo hour to same as data-hour
      hour: thisBlockHr,
      //get text ready to accept string input
      text: "",
    }
    //add this todo object to todoitems array
    dayEventItems.push(dayEventObj);
  });

  //once we have looped thru timeblocks, save this array of objects to local storage by stringifying it first
  localStorage.setItem("dayEvent", JSON.parse(dayEventItems));
  
} 

//format timeblock colors depending on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add style to time blocks to show where we are in the day
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
    dayEventItems = localStorage.getItem("dayEvent");
    dayEventItems = JSON.parse(dayEventItems);

  //loop thru array 
    for (var i = 0; i < dayEventItems.length; i++){
    var itemHour = dayEventItems[i].hour;
    var itemText = dayEventItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(dayEventItems);
}

function saveHandler(){

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

 
  for (var x = 0; x < dayEventItems.length; x++){
    if (dayEventItems[x].hour == hourToUpdate){
      //text=entered text info
      dayEventItems[x].text = itemToAdd;
    }
  }
  localStorage.setItem("dayEvent", JSON.stringify(dayEventItems));
  renderSchedule();
}

// when the document loads
$(document).ready(function(){

  
  setUpTimeBlocks();
    if(!localStorage.getItem("dayEvent")){
        initializeSchedule();
  }

  //display date
  $currentDay.text(currentDate);

  //render schedule from local storage
  renderSchedule();
  //when a dayEvent item save button is clicked, save it
  $scheduleArea.on("click", "button", saveHandler);
  
});