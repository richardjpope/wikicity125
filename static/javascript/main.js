$(document).ready(function(){

    //init
    getLocation();
    
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
    }
}

function handleGetCurrentPosition(location){
    url = '/articles/' + location.coords.latitude + '/'+ location.coords.longitude
    $.getJSON(url, function(data) { 
        for (var i=0; i < data['articles'].length; i++) {
            if($('#' + data['articles'][i]['id']).length == 0){
                $('#results').append('<li id=' + data['articles'][i]['id']  + '><a target="_new" href="' + data['articles'][i]['mobileurl']  +'">' +  data['articles'][i]['title'] + '</a></li>')
            }
        };
        $('#results').listview('refresh');
        setTimeout(function(){getLocation()}, 5000);                    
      }
    );
}

function onError(){
    alert('FAIL');
}