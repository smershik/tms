var fruits = ["Яблоко", "Апельсин", "Слива"];
for(var i = 0; i < fruits.length;  i++) {
    (function(i) {

        alert(fruits[i]);
    })(i);
}