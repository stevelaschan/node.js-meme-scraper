// for(let i = 0; i.length < 10; i++)

http.get(imgUrls, (res) => {
  const path = '01.jpg';
  const writeStream = fs.createWriteStream(path);

  writeStream.on('finish', () => {
    writeStream.close();
    console.log('Download Completed');
  });
});
