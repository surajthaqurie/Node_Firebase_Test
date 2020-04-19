function addRestaurant() {
    let database = firebase.database();
    let restaurantRef = database.ref('/restaurants');

    let restaurantInput = document.getElementById('addRestaurant');

    let restaurantName = restaurantInput.value;
    restaurantInput.value = '';

    // return restaurantRef.push().key;
    restaurantRef.push(restaurantName);

}