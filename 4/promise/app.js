var randomButtonElement = document.getElementById('randomize');
var randomUserElement = document.getElementById('user');
var errorElement = document.getElementById('error');

randomButtonElement.onclick = function () {

    makeGetRequest('https://api.github.com/users')
        .then(request => {
            var data = JSON.parse(request);
            if (data) {
                return data;
            }
        }).
        then( data => {           
            var user = data[Math.floor(Math.random() * data.length)];
            loadImage(user.avatar_url, function () {
                hideError();
                drawUser(user);
            }, showError);
        })


}
   
function makeGetRequest(url) {

    return new Promise(function (successCallback, errorCallback){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                var error = new Error('������ ' + xhr.status);
                error.code = xhr.statusText;
                errorCallback(error);
            } else {
                successCallback(xhr.responseText);
            }
        }
        
    

        xhr.send();
    
    })
}

function showError(err) {
    errorElement.textContent = err;
    errorElement.classList.remove('hidden');
    randomUserElement.classList.add('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
    randomUserElement.classList.remove('hidden');
}


function loadImage(imageUrl, successCallback, errorCallback) {
    var img = new Image();

    img.onload = function () {
        successCallback(img);
    };

    img.onerror = function () {
        errorCallback(new Error('���-�� ����� �� ���'));
    };
    img.src = imageUrl;
}

function drawUser(data) {
    var img = randomUserElement.querySelector('img');
    var link = randomUserElement.querySelector('a');
    img.src = data.avatar_url;
    img.alt = data.login;
    link.href = data.html_url;
    link.textContent = data.login;
}
