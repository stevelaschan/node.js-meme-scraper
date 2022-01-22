import fs from 'node:fs';
import axios from 'axios';
import cheerio from 'cheerio';
import request from 'request';

// GET URLs OF THE MEMES FROM WEBSITE
const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/'; // Basis Website for downloading the memes

async function getLinksFromURL(url) {
  try {
    const links = [];
    const httpResponse = await axios.get(url);

    const $ = cheerio.load(httpResponse.data);
    const linkObjects = $('img'); // get all hyperlinks

    linkObjects.each((options, element) => {
      links.push(
        $(element).attr('src'), // get the img src attribute
      );
    });
    return links;
  } catch (e) {
    console.log(e);
  }
}

// DOWNLOAD PROCESS
const homePageLinks = await getLinksFromURL(baseUrl); // variable for called URLs from meme website
const download = (imgUrl, path) => {
  request(imgUrl).pipe(fs.createWriteStream(path));
};

for (let i = 0; i < 10; i++) {
  // loop the downloading process 10 times
  const imgUrl = homePageLinks[i]; // get the URLs for the memes
  const path = `./memes/0${i + 1}.jpg`; // move them to the file called "memes"
  download(imgUrl, path);
}

console.log('Download completed!');
