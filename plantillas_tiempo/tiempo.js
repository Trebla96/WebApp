function generateIcon(data){
    var icon;
    switch(data){
        case "clear sky":
            icon = "wi-day-sunny";
            break;
        case "few clouds":
            icon = "wi-day-cloudy";
            break;
        case "scattered clouds":
        case "broken clouds":
            icon = "wi-cloudy";
            break;
        case "shower rain":
            icon = "wi-hail";
            break;
        case "rain":
            icon = "wi-day-rain-mix";
            break;
        case "thunderstorm":
            icon = "wi-thunderstorm";
            break;
        case "snow":
            icon = "wi-snow";
            break;
        case "mist":
            icon = "wi-fog";
            break;
        default:
            icon = "wi-na";
            break;
    }
    return icon;
}
    
function tempConverter(kelvin){
   return Math.round(kelvin - 273.15);
 }    

function getDate(day){
  var date = new Date(new Date().getTime() + day * 60 * 60 * 1000);
  return date.toLocaleDateString();
}

function handleData(arr){
  var now = 0;
  var day = 0;
  var data;
  for(var i=0; i <= 4; i++){
    data = arr[now];
    $(".day-"+i+" h5").text(getDate(day));
    $("#day-"+i+"-icon").removeClass("wi-na");
    $("#day-"+i+"-icon").addClass(generateIcon(data.weather[0].description));
    $("#day-"+i+"-temp").text(tempConverter(data.main.temp));
    day += 24;
    now += 8;
  }
}


$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
       $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&APPID=b0e5b638763503def2b1d7ff0a4b0391',
          success: function(data) {
            handleData(data.list);
            $("#contry").text(data.city.country + "__" + data.city.name);
            $("#desc").text(data.list[0].weather[0].description);
            $('input').on('change', function() {
              var temps = $("[id$=temp]");
              var c = temps[0].textContent;
               $.each( temps, function( i, val ) {
                 var c = temps[i].textContent;
                 if ($("#pure-toggle-4").is(':checked')) {
                    $("[id=day-"+i+"-temp]").text(Math.round((c - 32) * (5/9)));
                  } else {
                     $("[id=day-"+i+"-temp]").text(Math.round(c * (9/5) + 32));
                  }
              });
            });
          },
          cache: true
        });
    });
});