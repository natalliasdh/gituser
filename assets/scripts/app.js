const search = document.getElementById("go");


search.addEventListener("click", (e) => {
    e.preventDefault;
    lookForUser();
});

function lookForUser() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("noresults").style.display = "none";
            var response = JSON.parse(xhr.responseText);
            updateInfo(response);

        } else if (xhr.status === 404) {
            document.getElementById("noresults").style.display = "block";

        }

    };

    xhr.open('GET', 'https://api.github.com/users/' + document.getElementById('searchfield').value);
    xhr.send();
}


function updateInfo(response) {

    if (response.name !== null) { document.querySelector("h2").innerHTML = response.name; } else {
        document.querySelector("h2").innerHTML = response.login;
    }
    document.querySelector(".usernick").innerHTML = "@" + response.login;

    document.querySelector("#avatarimg").src = response.avatar_url;

    if (response.bio !== null)

    { document.querySelector(".bio").innerHTML = response.bio; } else {
        document.querySelector(".bio").innerHTML = "Not available";

    }
    document.querySelector("#repos").innerHTML = response.public_repos;
    document.querySelector("#followers").innerHTML = response.followers;
    document.querySelector("#following").innerHTML = response.following;

    if (response.location !== null) { document.querySelector("#location").innerHTML = response.location; } else {
        document.querySelector("#location").innerHTML = 'Not available';
        document.querySelector("#location").style.opacity = 0.5;
    }

    if (response.twitter_username !== null)

    { document.querySelector("#twitter").innerHTML = response.twitter_username; } else {
        document.querySelector("#twitter").innerHTML = "Not available";
        document.querySelector("#twitter").style.opacity = 0.5;
    }

    if (response.blog !== "") { document.querySelector("#website").innerHTML = response.blog; } else {
        document.querySelector("#website").innerHTML = "Not available";
        document.querySelector("#website").style.opacity = 0.5;
    }

    if (response.company !== null) { document.querySelector("#company").innerHTML = response.company; } else {
        document.querySelector("#company").innerHTML = "Not available";
        document.querySelector("#company").style.opacity = 0.5;
    }

    const date = new Date(response.created_at).toDateString().slice(4);
    document.querySelector(".joined").innerHTML = "Joined " + date;


}