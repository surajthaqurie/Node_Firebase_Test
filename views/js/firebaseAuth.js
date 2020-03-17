function checkIfLoggedIn() {
    if (localStorage.getItem('firebase_idToken')) {
        // do nothing
        document.getElementById('google-pic')
            .setAttribute('src', localStorage.getItem('google-photo'));

        document.getElementById('google-signin')
            .setAttribute('style', 'display:none; visibility: hidden');

        document.getElementById('signout')
            .setAttribute('style', 'display: inline-block; visibility: visible');
    } else {
        document.getElementById('google-signin')
            .setAttribute('style', 'display:inline-block; visibility: visible');


        document.getElementById('signout')
            .setAttribute('style', 'display: none; visibility: hidden');
    }

}
checkIfLoggedIn();

function signOut() {
    localStorage.removeItem('firebase_idToken');
    localStorage.removeItem('google-photo');

    document.getElementById('google-pic')
        .setAttribute('src', '');

    checkIfLoggedIn();

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
            localStorage.setItem('firebase_idToken', idToken);

            const photo = result.user.photoURL;
            localStorage.setItem('google-photo', photo);

            document.getElementById('google-email').innerHTML = result.user.email;

            checkIfLoggedIn();

        }).catch((error) => {
            console.log(error);
        });
}