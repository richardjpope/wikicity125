$(document).ready(function(){
  			
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
  }

  function handleGetCurrentPosition(location){
    url = '/articles/' + location.coords.latitude + '/'+ location.coords.longitude
    $.getJSON(url, function(data) { 
        for (var i=0; i < data['articles'].length; i++) {
          $('#results').append('<li><a href="' + data['articles'][i]['mobileurl']  +'">' +  data['articles'][i]['title'] + '</a></li>')
        };
        $('#results').listview('refresh');
      }
    );
  }

  function onError(){
    alert('FAIL');
  }

});