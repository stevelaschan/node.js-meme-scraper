// import packages
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import request from 'request';

// basis Website
const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// find the image URLs from the website
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

// download the meme images
const download = (tenImgURLs, path, callback) => {
  request.head(tenImgURLs, (err, res, body) => {
    request(tenImgURLs).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

let tenImgURLs = []; // variable for the first ten images
let path = ''; // variable for the meme path
for (let i = 0; i < 10; i++) {
  tenImgURLs = homePageLinks[i];
  path = `./memes/0${i + 1}.jpg`;
  download(tenImgURLs, path, () => {});
}

console.log('✅ Done!');
