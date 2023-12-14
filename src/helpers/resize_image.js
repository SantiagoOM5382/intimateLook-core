const sharp = require('sharp')

async function resizeImage (image, width, height) {
  await sharp(image.buffer)
    .resize({
      width: width,
      height: height
    })
    .webp({
      quality: 80,
      smartSubsample: true
    })
    .toBuffer()
    .then((data) => {
      image.buffer = data
    })
    .catch((err) => {
      console.error(err)
      return null
    })

  return image
}

async function convertImage (image) {
  await sharp(image.buffer)
    .webp({
      quality: 80,
      smartSubsample: true
    })
    .toBuffer()
    .then((data) => {
      image.buffer = data
    })
    .catch((err) => {
      console.error(err)
      return null
    })

  return image
}

module.exports = { resizeImage, convertImage }
