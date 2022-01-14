// import packages
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import request from 'request';

// // find the image URLs from the website
const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

async function getLinksFromURL(url) {
  try {
    let links = [];
    let httpResponse = await axios.get(url);

    let $ = cheerio.load(httpResponse.data);
    let linkObjects = $('img'); // get all hyperlinks

    linkObjects.each((index, element) => {
      links.push(
        $(element).attr('src'), // get the img src attribute
      );
    });

    return links;
  } catch (e) {
    console.log(e);
  }
}

let homePageLinks = await getLinksFromURL(baseUrl);
let tenImgURLs = []; // variable for the first ten images
for (let i = 0; i < 10; i++) {
  tenImgURLs = homePageLinks[i]; // log the first ten images to the consol
}

// save the images to the folderpath memes
const download = (tenImgURLs, path, callback) => {
  request.head(tenImgURLs, (err, res, body) => {
    request(tenImgURLs).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

// const url = tenImgURLs;
let path = '';
for (let j = 1; j < 11; j++) {
  path = `0${j}.jpg`;
}
for (let k = 0; k < 10; k++)
  download(tenImgURLs[k], path[k], () => {
    console.log('✅ Done!');
  });
