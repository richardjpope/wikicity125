var fake = true;
var fake_route = [[51.52432,-0.10967],[51.52335,-0.10848],[51.52246,-0.10685],[51.52145,-0.10574],[51.52001,-0.10552],[51.51894,-0.10531],[51.51758,-0.10509],[51.51584,-0.10488],[51.51451,-0.10437],[51.51317,-0.10411],[51.51146,-0.10406],[51.50924,-0.10359],[51.50716,-0.10355],[51.50585,-0.10316],[51.50465,-0.10239],[51.50307,-0.10192],[51.5015,-0.10123],[51.49995,-0.1005],[51.49843,-0.0996],[51.49685,-0.0987],[51.49562,-0.0984],[51.4945,-0.09844],[51.4933,-0.09891],[51.49266,-0.09913],[51.49177,-0.09926],[51.49094,-0.09917],[51.49033,-0.0987],[51.4895,-0.09836],[51.48878,-0.09788],[51.48817,-0.09737],[51.48742,-0.09681],[51.48632,-0.09621],[51.48536,-0.09608],[51.4844,-0.09574],[51.48293,-0.09557],[51.4817,-0.09557],[51.48018,-0.09561],[51.47881,-0.09548],[51.47777,-0.09544],[51.47673,-0.09552],[51.47558,-0.09587],[51.47424,-0.09677],[51.47315,-0.0981],[51.47189,-0.09999],[51.47085,-0.10132],[51.46975,-0.10218],[51.46849,-0.10222],[51.46697,-0.10226],[51.46499,-0.10196],[51.46349,-0.10192],[51.46168,-0.10213],[51.45999,-0.10291],[51.45807,-0.10372],[51.45603,-0.10389],[51.45408,-0.10303],[51.45285,-0.10209],[51.4517,-0.10072],[51.45055,-0.09934],[51.44978,-0.10016],[51.44833,-0.10136],[51.44665,-0.10308],[51.44496,-0.10462],[51.4433,-0.10419],[51.44165,-0.10372]]
var fake_count = 0
    
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
    if(fake_count <= fake_route.length){
        fake_location = {'coords':{'latitude': fake_route[fake_count][0], 'longitude': fake_route[fake_count][1]}}
        handleGetCurrentPosition(fake_location)
        fake_count = fake_count + 1;
    }
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
                if($('#' + data['articles'][i]['id']).length == 0 && isCruft(data['articles'][i]['title']) == false){
                    $('#results').prepend('<li id=' + data['articles'][i]['id']  + ' data-icon="false"><a data-transition="slideup" data-rel="dialog" href="/browser/' + data['articles'][i]['id'] + '">' +  data['articles'][i]['title'] + '</a></li>')
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

function isCruft(title){
    result = false;
    if(title.indexOf('List of') > -1){
        result = true;
    } else{
        if(title.match(/^[1-9]* -/i)){
            result = true;
        }
    }
    return result;
}

function opac(){
    opacity = 1;
    counter = 1
    $('#results li').each(function(index) {
        if(counter > 3 && counter % 4 === 0 ){
            opacity = (opacity - 0.2);
        }
        
        $(this).css({ opacity: opacity });
        counter ++
    });
}

function cleanList(){
    while($('#results li').length  > 15){
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