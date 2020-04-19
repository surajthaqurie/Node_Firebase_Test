function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user => {
        // if (localStorage.getItem('firebase_idToken')) {
        if (user) {
            // do logged in stuff
            console.log('user sign in');
            // console.log(user);

            let photoURL = user.photoURL;

            document.getElementById('google-pic')
                .setAttribute('src', photoURL);

            // document.getElementById('google-pic')
            //     .setAttribute('src', localStorage.getItem('google-photo'));

            document.getElementById('google-signin')
                .setAttribute('style', 'display:none; visibility: hidden');

            document.getElementById('signout')
                .setAttribute('style', 'display: inline-block; visibility: visible');
        } else {
            // do not logged in stuff
            console.log('user log out');
            document.getElementById('google-signin')
                .setAttribute('style', 'display:inline-block; visibility: visible');


            document.getElementById('signout')
                .setAttribute('style', 'display: none; visibility: hidden');
        }
    });
    // let user = firebase.auth().currentUser;
    // console.log(user); // Null is output
}

window.onload = () => {
    checkIfLoggedIn();
}

function signOut() {

    firebase.auth().signOut();

    // localStorage.removeItem('firebase_idToken');
    // localStorage.removeItem('google-photo');

    document.getElementById('google-pic')
        .setAttribute('src', '');
}

function signInWithGoogle() {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log(result);
            document.getElementById('google-displayName').innerHTML = result.user.displayName;
            document.getElementById('google-pic').src = result.user.photoURL;

            // Set IdToken in localStroage of Browser
            const idToken = result.credential.idToken;

            // localStorage.setItem('firebase_idToken', idToken);

            const photo = result.user.photoURL;
            // localStorage.setItem('google-photo', photo);

            document.getElementById('google-email').innerHTML = result.user.email;

            checkIfLoggedIn();

        }).catch((error) => {
            console.log(error);
        });
}
