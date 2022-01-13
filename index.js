// import packages
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import http from 'http';
import request from 'request';

// find the image URLs from the website
const baseUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const imgUrls = (async () => {
  try {
    let homePageLinks = await getLinksFromURL(baseUrl);
    console.log(homePageLinks); // console.logs all the URLs of the images
  } catch (e) {
    console.log(e);
  }
})();

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

// get images from the source and save them to the folderpath
const folderpath = './memes';
const url = imgUrls

async function downloadImage(url, folderpath) {
  const response = await axios({
    url
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(folderpath))
      .on('error', reject)
      .once('close', () => resolve(folderpath));
  });
}
console.log(downloadImage(url, folderpath));

// for(let i = 0; i.length < 10; i++)

// https.get(imgUrls, (res) => {
//   const path = (01).jpg;
//   const writeStream = fs.createWriteStream(path);

//   writeStream.on('finish', () => {
//     writeStream.close();
//     console.log('Download Completed');
//   });
// });
