function myForEach(arr, func){
    for (var i = 0; i < arr.length; i++){
       console.log(func(arr[i]));
    }    
}

function doSmth(elem){
    return elem * 3;
}

myForEach([2,4,5], doSmth);




/*
[2,4,5].forEach(function(arrItem){
    console.log(doSmth(arrItem));
});
function doSmth(elem){
    return elem * 3;
}
*/