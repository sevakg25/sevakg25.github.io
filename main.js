var contactSubmitButton = document.querySelector('#contact_submit_btn');
var pswpElement = document.querySelectorAll('.pswp')[0];
const FOLDERS = ['liverpool', 'travels'];
const path = 'images/';
const NUM_PICS_PER_FOLDER = [13, 26];
let photos = {};
let photoMetaData = {
    'liverpool': {},
    'travels': {}
};

const fetchMetadata = (gallery) => {
    let xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200" && xobj.responseText) {
            photoMetaData[gallery] = JSON.parse(xobj.responseText);
            window.dispatchEvent(new Event('metadata_fetched'));
        }
    };
    xobj.open('GET', `images/${gallery}/metadata.json`, true);
    xobj.send(null);


}

const fetchDimensionsAndCreateImages = () => {
    let xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");

    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            dimensions = JSON.parse(xobj.responseText);
            for (let i = 0; i < FOLDERS.length; i++) {
                let folderPhotos = [];
                for (let j = 1; j <= NUM_PICS_PER_FOLDER[i]; j++) {
                    let obj = {};
                    obj.src = path + FOLDERS[i] + '/' + j + '.jpeg';
                    obj.w = dimensions[FOLDERS[i]][j - 1].w;
                    obj.h = dimensions[FOLDERS[i]][j - 1].h;
                    if (photoMetaData[FOLDERS[i]][j]) {
                        obj.title = photoMetaData[FOLDERS[i]][j]
                    }
                    folderPhotos.push(obj)
                }
                photos[FOLDERS[i]] = folderPhotos;
            }
            createGalleryInHTML();
        }
    };
    xobj.open('GET', 'imageDimensions.json', true);
    xobj.send(null);

}

const createGalleryInHTML = () => {
    const galleryTitles = FOLDERS.map(name => name.charAt(0).toUpperCase() + name.slice(1));
    const gallery = document.querySelector('#theGallery');
    galleryTitles.forEach((title, i) => {
        let section = document.createElement("DIV");
        section.setAttribute("class", "gallerySection");
        let titleElement = document.createElement("DIV");
        titleElement.setAttribute("class", "h4");
        titleElement.appendChild(document.createTextNode(title));
        section.appendChild(titleElement);

        for (let j = 1; j <= NUM_PICS_PER_FOLDER[i]; j++) {
            let fig = document.createElement("FIGURE");
            fig.setAttribute("class", "thumbnail");
            fig.setAttribute("itemprop", "associatedMedia");
            fig.setAttribute("itemtype", "http://schema.org/ImageObject");
            fig.setAttribute("itemscope", "");
            let link = document.createElement("A");
            link.setAttribute("class", "image-link");
            let img = document.createElement("IMG");
            img.setAttribute("class", FOLDERS[i] + "-images");
            img.setAttribute("src", path + FOLDERS[i] + '/' + j + ".jpeg");
            img.setAttribute("itemprop", "thumbnail");
            img.setAttribute("alt", "Image description");
            img.setAttribute("height", "200");
            link.appendChild(img);
            fig.appendChild(link);
            section.appendChild(fig);
        }
        gallery.appendChild(section);

        Array.from(document.getElementsByClassName('image-link')).forEach(function(el) {
            let index = parseInt(el.getElementsByTagName("IMG")[0].src.match(/\/\d+\.jpeg+$/g)[0].match(/\d+/g)[0]);
            let galleryName = el.getElementsByTagName("IMG")[0].className;
            el.addEventListener('click', function() { openGallery(index - 1, galleryName) });
        });
    });
}

const openGallery = function(i, galleryName) {
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


contactSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let name = $('#fname').val() + ' ' + $('#lname').val();
    let dropdown = document.querySelector('#country');
    let message = $('#subject').val();

    window.location.href = 'mailto:ghazarian.sevak@gmail.com?subject=Hello from ' + name + '!&body=' + message;
});

(function() {
    FOLDERS.forEach(folder => fetchMetadata(folder));
})();

window.addEventListener('metadata_fetched', fetchDimensionsAndCreateImages);

