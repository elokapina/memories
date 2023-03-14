const childProcess = require('child_process')
const fs = require('fs/promises')
const config = require('./config')
const backendConfig = require('./backend_conf');

(async () => {
  try {
    await fs.stat('originals')
  } catch (error) {
    await fs.mkdir('originals')
  }

  let backend = false
  if (config.backendUrl !== undefined) {
    backend = true
    try {
      await fs.stat('converted')
    } catch (error) {
      await fs.mkdir('converted')
    }
    try {
      await fs.stat('backendPictures')
    } catch (error) {
      await fs.mkdir('backendPictures')
    }
  }

  console.log('Cleaning old files..')
  // eslint-disable-next-line no-restricted-syntax
  for (const basePath of ['public/pictures', 'backendPictures']) {
    // eslint-disable-next-line no-await-in-loop
    const oldFiles = await fs.readdir(basePath)
    // eslint-disable-next-line no-restricted-syntax
    for (const file of oldFiles) {
      if (file !== '.gitkeep') {
        // eslint-disable-next-line no-await-in-loop
        const path = `${basePath}/${file}`
        try {
          // Try remove file
          // eslint-disable-next-line no-await-in-loop
          await fs.rm(path)
        } catch (error) {
          if (error.code === 'ERR_FS_EISDIR') {
            // Remove files under directories
            // eslint-disable-next-line no-await-in-loop
            const files = await fs.readdir(path)
            // eslint-disable-next-line no-restricted-syntax
            for (const subFile of files) {
              // eslint-disable-next-line no-await-in-loop
              await fs.rm(`${path}/${subFile}`)
            }
            // eslint-disable-next-line no-await-in-loop
            await fs.rmdir(path)
          }
        }
        // Try remove symlinks
        try {
          // eslint-disable-next-line no-await-in-loop
          await fs.unlink(path)
        } catch (error) {
          // Ignore
        }
      }
    }
  }

  console.log('Optimizing images..')
  childProcess.execSync(
    `mogrify -path ${backend ? 'converted' : 'public/pictures'} -resize 1920 -quality 85 -format jpg originals/*`,
  )

  if (backend) {
    console.log('Copying images to backend codes..')
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const [code, images] of Object.entries(backendConfig.codes)) {
      console.log('----', code, 'images count', images.length)
      try {
        // eslint-disable-next-line no-await-in-loop
        await fs.stat(`backendPictures/${code}`)
      } catch (error) {
        // eslint-disable-next-line no-await-in-loop
        await fs.mkdir(`backendPictures/${code}`)
      }
      images.forEach(image => {
        fs.copyFile(`converted/${image}`, `backendPictures/${code}/${image}`)
      })
    }

    if (backendConfig.personalCodes !== undefined) {
      console.log('Creating personal code symlinks..')
      // eslint-disable-next-line no-restricted-syntax
      for (const [personalCode, code] of Object.entries(backendConfig.personalCodes)) {
        // eslint-disable-next-line no-await-in-loop
        await fs.symlink(`../../backendPictures/${code}`, `public/pictures/${personalCode}`)
      }
    } else {
      console.log('Creating code symlinks..')
      // eslint-disable-next-line no-restricted-syntax
      for (const code of Object.keys(backendConfig.codes)) {
        // eslint-disable-next-line no-await-in-loop
        await fs.symlink(`../../backendPictures/${code}`, `public/pictures/${code}`)
      }
    }

    console.log('Cleaning optimized temporary files..')
    const files = await fs.readdir('converted')
    files.forEach(file => {
      fs.rm(`converted/${file}`)
    })
  }
})()
