const sizeOf = require('image-size');
const fs = require('fs');

const PATH = '../images/';
const FOLDERS = ['liverpool/', 'travels/'];
const NUM_PICS_PER_FOLDER = [13,26];
var dimensions = {};
for (let i = 0; i < FOLDERS.length; i++) {
	let folderDimensions = [];
	for (let j = 1; j <= NUM_PICS_PER_FOLDER[i]; j++) {
		let obj = {};
		let imagePath = PATH + FOLDERS[i] + j + '.jpeg';
		let data = sizeOf(imagePath);
		obj.w = data.width;
		obj.h = data.height;
		folderDimensions.push(obj);
	}
	let keyName = FOLDERS[i].substring(0, FOLDERS[i].length - 1);
	dimensions[keyName] = folderDimensions;
}

fs.writeFile('../imageDimensions.json', JSON.stringify(dimensions), function(err) { if(err) console.log(err) });