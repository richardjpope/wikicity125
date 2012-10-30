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
    $('#results li').swipeDelete({
        click: function(e){
            e.preventDefault();
            $(this).parents('li').remove();
        }
    });
    
    $('#results li').swipeDelete({
        direction: 'swiperight', // standard jquery mobile event name
        btnLabel: 'Delete',
        btnTheme: 'b',
        btnClass: 'aSwipeBtn',
        click: function(e){
            e.preventDefault();
            var url = $(e.target).attr('href');
            $(this).parents('li').remove();
            $.post(url, function(data) {
                console.log(data);
            });
        }
    });
    
    $('#results').listview('refresh');    
}

function onError(){
    fake_location = {'coords':{'latitude': 54, 'longitude': -0.1}}
    handleGetCurrentPosition(fake_location);
}