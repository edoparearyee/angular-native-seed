// @ts-check
(function() {
  'use strict';

  const fs = require('fs');
  const path = require('path');

  const webAppPath = path.join(__dirname, 'src/app');
  const webAssetsPath = path.join(__dirname, 'src/assets');
  const nativescriptAppPath = path.join(__dirname, 'nativescript/app/app');
  const nativescriptAssetsPath = path.join(__dirname, 'nativescript/app/assets');

  console.log('Setting up symlinks...');

  // remove previous symlinks if they exist
  removeSymLinks();

  // Try to create symlinks
  createSymLink();

  return 0;

  function createSymLink() {
    console.log(`linking files in: ${webAppPath} -> ${nativescriptAppPath}`);

    fs.exists(nativescriptAppPath, (exists) => {
      if (!exists) {
        fs.mkdir(nativescriptAppPath, () => createLinks());
      } else {
        createLinks();
      }
    });
  }

  function removeSymLinks() {
    fs.exists(nativescriptAppPath, function(exists) {
      fs.readdir(nativescriptAppPath, function(err, items) {
        items.forEach(item => {
          if (fs.existsSync(`${nativescriptAppPath}/${item}`)) {
            console.log(`Removing link: ${nativescriptAppPath}/${item}`);
            fs.unlinkSync(`${nativescriptAppPath}/${item}`);
          }
        });
      });
    });

    if (fs.existsSync(nativescriptAssetsPath)) {
      console.log(`Removing link: ${webAssetsPath} -> ${nativescriptAssetsPath}`);
      fs.unlinkSync(nativescriptAssetsPath);
    }
  }

  function createLinks() {
    fs.readdir(webAppPath, function (err, items) {
      const tnsFiles = items
        .filter(file => !file.includes('.browser.') && !file.includes('.server.') && !file.includes('.spec.'))
        .filter((file, i, files) => {
          const fileNameSplit = file.split('.');
          fileNameSplit.splice(fileNameSplit.length - 1, 0, 'tns');
          return files.indexOf(fileNameSplit.join('.')) === -1;
        });

      tnsFiles.forEach(file => {
        let newFileName = file;
        if (file.includes('.tns.')) {
          newFileName = file.split('.tns.').join('.');
        }
        if (file.includes('.native.')) {
          newFileName = file.split('.native.').join('.');
        }
        console.log(`linking: ${webAppPath}/${file} -> ${nativescriptAppPath}/${newFileName}`);
        fs.symlinkSync(`${webAppPath}/${file}`, `${nativescriptAppPath}/${newFileName}`, 'junction');
      });
    });

    if (!fs.existsSync(nativescriptAssetsPath)) {
      console.log(`linking: ${webAssetsPath} -> ${nativescriptAssetsPath}`);
      fs.symlinkSync(webAssetsPath, nativescriptAssetsPath, 'junction');
    }
  }
})();
