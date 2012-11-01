var fake = false;
    
$(document).ready(function(){
    
    //init
    if(fake == false){
        getLocation();
    }else{
        fakeLocation();
    }

});

function randomNumber(max){
    return Math.floor(Math.random()* (max + 1))
}

function fakeLocation(){
    lats = [51.656, 51.613, 51.510, 51.406];
    lngs = [-0.376, -0.261, -0.135, -0.279];
    random = randomNumber(4);
    fake_location = {'coords':{'latitude': lats[random], 'longitude': lngs[random]}}
    handleGetCurrentPosition(fake_location)
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
    }
}

function handleGetCurrentPosition(location){
    url = '/articles/' + location.coords.latitude + '/'+ location.coords.longitude
    $.getJSON(url, function(data) { 
        if(data['articles']){
            for (var i=0; i < data['articles'].length; i++) {
                if($('#' + data['articles'][i]['id']).length == 0){
                    $('#results').prepend('<li id=' + data['articles'][i]['id']  + '><a data-transition="slideup" data-rel="dialog" href="/browser/' + data['articles'][i]['id'] + '">' +  data['articles'][i]['title'] + '</a></li>')
                }
            };
        }
        refresh();
        if (fake == false){
            setTimeout(function(){getLocation()}, 5000);
        }else{
            setTimeout(function(){fakeLocation()}, 5000);
        }
      }
    );
}

function opac(){
    opacity = 1;
    counter = 1
    $('#results li').each(function(index) {
        if(counter > 2 && counter % 3 === 0 ){
            opacity = (opacity - 0.2);
        }
        
        $(this).css({ opacity: opacity });
        counter ++
    });
}

function cleanList(){
    while($('#results li').length  > 12){
        $('#results li').last().remove();
    }
}

function refresh(){    
    $('#results').listview('refresh');    
    cleanList();
    opac();
}

function onError(){
    alert('fail');
    // fake_location = {'coords':{'latitude': 54, 'longitude': -0.1}}
    // handleGetCurrentPosition(fake_location);
}