var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var dayEventItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
$("#currentDay").html(currentDate);

var currentHour = moment().format("H");

//base
function initializeSchedule(){g
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

function saveHandler(){

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

 
  for (var x = 0; x < dayEventItems.length; x++){
    if (dayEventItems[x].hour == hourToUpdate){
      //text=entered text info
      dayEventItems[x].text = itemToAdd;
    }
  }
  localStorage.setItem(data-hour, textarea);
  console.log(localStorage);
  localStorage.getItem(hourToUpdate, itemToAdd);
  renderSchedule();
};

// when the document loads
$(document).ready(function(){

  setUpTimeBlocks();
    if(!localStorage.getItem("dayEvent")){
        initializeSchedule();
  }
  
});
