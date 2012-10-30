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
        refresh();
        setTimeout(function(){getLocation()}, 5000);                    
      }
    );
}

function refresh(){
    $('#results').listview('refresh');

    $('#results li').swipeDelete({
        click: function(e){
            e.preventDefault();
            $(this).parents('li').remove();
        }
    });
    
}

function onError(){
    alert('FAIL');
}