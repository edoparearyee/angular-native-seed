// @ts-check

/**
 * Symlink
 *
 * Creates symlinks for all files in `src/app` to `nativescript/app/app`
 * and renames symlinks for `*.tns.*` files by removing the `.tns` in the
 * symlink's filename and removes the original non `tns` symlink file.
 * So eventually the `tns` symlink overrides it's non `tns` equivalent.
 *
 * Inspired by {@link https://github.com/TeamMaestro/angular-native-seed/blob/master/symlink.js}
 */
(function() {
  'use strict';

  const fs = require('fs');
  const path = require('path');
  const mkdirRecursive = require('mkdir-recursive');
  const fsReaddirRecursive = require('fs-readdir-recursive');

  const webAppPath = path.join(__dirname, 'src/app');
  const webEnvPath = path.join(__dirname, 'src/environments');
  const webAssetsPath = path.join(__dirname, 'src/assets');
  const nativescriptAppPath = path.join(__dirname, 'nativescript/app/app');
  const nativescriptEnvPath = path.join(
    __dirname,
    'nativescript/app/environments'
  );
  const nativescriptAssetsPath = path.join(
    __dirname,
    'nativescript/app/assets'
  );

  const debug = false;

  console.log('Setting up symlinks...');

  // remove previous symlinks if they exist
  removeSymLinks();

  console.log('Symlinks created successfully!');
  return 0;

  function removeSymLinks() {
    const items = fsReaddirRecursive(nativescriptAppPath);
    items.forEach(item => {
      if (fs.existsSync(`${nativescriptAppPath}/${item}`)) {
        if (debug) console.log(`Removing link: ${nativescriptAppPath}/${item}`);
        fs.unlinkSync(`${nativescriptAppPath}/${item}`);
      }
    });

    if (fs.existsSync(nativescriptAssetsPath)) {
      if (debug)
        console.log(
          `Removing link: ${webAssetsPath} -> ${nativescriptAssetsPath}`
        );
      fs.unlinkSync(nativescriptAssetsPath);
    }
    if (fs.existsSync(nativescriptEnvPath)) {
      if (debug)
        console.log(`Removing link: ${webEnvPath} -> ${nativescriptEnvPath}`);
      fs.unlinkSync(nativescriptEnvPath);
    }

    // Try to create symlinks
    createSymLink();
  }

  function createSymLink() {
    if (debug)
      console.log(`linking files in: ${webAppPath} -> ${nativescriptAppPath}`);

    const items = fsReaddirRecursive(webAppPath).filter(
      item => !item.includes('.browser.') && !item.includes('.server.')
    );

    const linkItem = i => {
      const item = items[i];
      const dirArr = `${nativescriptAppPath}/${item}`.split('/');
      dirArr.pop();
      const dir = dirArr.join('/');

      const createLink = () => {
        if (debug)
          console.log(
            `linking: ${webAppPath}/${item} --> ${nativescriptAppPath}/${item}`
          );
        fs.symlinkSync(
          `${webAppPath}/${item}`,
          `${nativescriptAppPath}/${item}`,
          'junction'
        );
        items[i + 1] ? linkItem(i + 1) : renameTnsFiles();
      };

      fs.exists(dir, function(exists) {
        if (!exists) {
          if (debug) console.log(`making directory: ${dir}`);
          mkdirRecursive.mkdir(dir, null, () => createLink());
        } else {
          createLink();
        }
      });
    };

    const renameTnsFiles = () => {
      const nsItems = fsReaddirRecursive(nativescriptAppPath);
      const tnsFiles = nsItems.filter(file => file.includes('.tns.'));

      tnsFiles.forEach(file => {
        const fullPath = `${nativescriptAppPath}/${file}`;
        const newFileNameArr = fullPath.split('.tns.');
        const newFileName = newFileNameArr.join('.');
        if (fs.existsSync(newFileName)) {
          fs.unlinkSync(newFileName);
        }
        fs.renameSync(fullPath, newFileName);
      });

      if (!fs.existsSync(nativescriptAssetsPath)) {
        if (debug)
          console.log(`linking: ${webAssetsPath} -> ${nativescriptAssetsPath}`);
        fs.symlinkSync(webAssetsPath, nativescriptAssetsPath, 'junction');
      }
      if (!fs.existsSync(nativescriptEnvPath)) {
        if (debug)
          console.log(`linking: ${webEnvPath} -> ${nativescriptEnvPath}`);
        fs.symlinkSync(webEnvPath, nativescriptEnvPath, 'junction');
      }
    };

    linkItem(0);
  }
})();
