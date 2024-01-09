
const currentDate = dayjs();
const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);

$(function () {
  // Get the current hour of the day using the dayjs library.
  const currentHour = dayjs().format('H');

  // The function below changes the color of each time block based on "past, present, or future" relative to the current hour.
function hourlycolor() {
  $('.time-block').each(function() {
    const hourBlock = parseInt(this.id);
    console.log(hourBlock, currentHour);
    $(this).toggleClass('past', hourBlock < currentHour);
    $(this).toggleClass('present', hourBlock === currentHour);
    $(this).toggleClass('future', hourBlock > currentHour);

  });
}
 // Save the user's input in a textentry to localStorage - only when the savebtn has been clicked.
function textentry(){
  $('.saveBtn').on('click', function() {
    const key = $(this).parent().attr('id');
    const value = $(this).siblings('.description').val();
    localStorage.setItem(key, value);
  });
}

 // Refresh the color of each time block past(grey), present(red), or future(green) relative to the current time.
function timeBlockColor (){
  $('.time-block').each(function(){
    const hourBlock = parseInt(this.id);
    if(hourBlock == currentHour){
      $(this).removeClass('past future').addClass('present');}

    else if (hourBlock < currentHour){
      $(this).removeClass('future present').addClass('past');}

    else {
      $(this).removeClass('past present').addClass('future');}
  });
}
  // This will get the user input from the localStorage and set textentry values for each time block.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
// Call the three main functions to set up the page.
hourlycolor();
textentry();
timeBlockColor();


// The setInterval() method calls a function at specified intervals (in milliseconds).
setInterval(updateTime, 1000);
 
});
