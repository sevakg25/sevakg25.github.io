var contactSubmitButton = document.querySelector('#contact_submit_btn');
var pswpElement = document.querySelectorAll('.pswp')[0];
const NUM_PHOTOS = 21;
const FOLDERS = ['football', 'liverpool', 'travels'];
const NUM_PICS_PER_FOLDER = [8, 7, 2];
let photos = {};
(function() {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'imageDimensions.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            dimensions = JSON.parse(xobj.responseText);
            const path = 'images/';
            for (let i = 0; i < FOLDERS.length; i++) {
                let folderPhotos = [];
                for (let j = 1; j <= NUM_PICS_PER_FOLDER[i]; j++) {
                    let obj = {};
                    obj.src = path + FOLDERS[i] + '/' + j + '.jpeg';
                    obj.w = dimensions[FOLDERS[i]][j - 1].w;
                    obj.h = dimensions[FOLDERS[i]][j - 1].h;
                    folderPhotos.push(obj)
                }
                photos[FOLDERS[i]] = folderPhotos;
            }
        }
    };
    xobj.send(null);
})();

let openGallery = function(i, galleryName) {
	let galleryOptions = {
		index: i
	};
	let galleries = {};
    FOLDERS.forEach((gallery, index) => {
        let name = FOLDERS[index] + '-images';
        galleries[name] = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photos[FOLDERS[index]], galleryOptions);
    });
    galleries[galleryName].init();
};

Array.from(document.getElementsByClassName('image-link')).forEach(function(el) {
	let index = parseInt(el.getElementsByTagName("IMG")[0].src.match(/\/\d+\.jpeg+$/g)[0].match(/\d+/g)[0]);
    let galleryName = el.getElementsByTagName("IMG")[0].className;
	el.addEventListener('click', function() {openGallery(index - 1, galleryName)});
});


contactSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let name = $('#fname').val() + ' ' + $('#lname').val();
    let dropdown = document.querySelector('#country');
    let message = $('#subject').val();

    window.location.href = 'mailto:ghazarian.sevak@gmail.com?subject=Hello from ' + name + '!&body=' + message;
});