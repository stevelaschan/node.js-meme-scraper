// Import packages
import fs from 'node:fs';
import axios from 'axios';
import cheerio from 'cheerio';
import request from 'request';

// Basis Website
const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Get URls from the meme website
async function getLinksFromURL(url) {
  try {
    const links = [];
    const httpResponse = await axios.get(url);

    const $ = cheerio.load(httpResponse.data);
    const linkObjects = $('img'); // get all hyperlinks

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

// Download meme images and save under file "memes"
const homePageLinks = await getLinksFromURL(baseUrl); // variable for called URLs from meme website
let imgUrl = []; // variable for the first ten meme images
let path = ''; // variable for the meme path
const download = () => {
  request(imgUrl).pipe(fs.createWriteStream(path));
};

for (let i = 0; i < 10; i++) {
  imgUrl = homePageLinks[i];
  path = `./memes/0${i + 1}.jpg`;
  download(imgUrl, path, () => {}); // downloading 10 memes
}

console.log('Download completed!');
