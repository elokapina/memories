# Memories

Gallery application with landing page and audio/text intro.

Made for the XR Finland chapter gallery to celebrate brave rebels fighting against climate change.

## Usage

This application can be deployed either by running it as a Node application or via Docker.
We recommend using the Docker way.

Whichever way you intend to go, the following steps are common:

### Choosing your images

Choose your images and place them in a folder called `originals`. Create it if necessary.

Install `imagemagick` if you don't have it and in the project root folder execute the following:

`mogrify -path public/pictures -resize 1920 -quality 85 -format jpg originals/*`

This will resize the images and drop their quality a bit for web usage. When you want to
refresh your images, just repeat this step.

### Init configuration file

`cp config.example.js config.js` to initialize the configuration file.

### Configure image list

Get a list of your images and place them in your preferred order into the `config.js`
`pictures` array.

Hint: `ls -1 public/pictures/ | xargs -I img echo '"img",` for an easily copypasteable list.

### Image captions

Memories supports the following captions per image:
* caption
* long caption

These are optional. If you want to set them, have a look at the examples in the config
file and add as needed. If you don't want captions, ignore this step.

### Logo

The top-left logo comes from `public/logo.png`. Copy your PNG format file there.

### Audio

There is an audio file that starts playing when the user enters the gallery.
Copy your audio file to `public/audio.mp3`.

### Favicon

The site favicon should be added to `public/favicon.png`. It should be exactly 32x32 in size.

### Texts

The config file contains a list of texts that will be shown either in the landing page
intro or during the gallery viewing. Go through them and edit as needed.

### Done!

Phew, that wasn't so bad. Now you can either run the gallery locally or build a docker image.

#### Running locally

```bash
npm install
npm run serve
```

#### Docker image

```bash
docker build -t memories:latest .
docker save -o memories memories:latest
```

Now you have a shiny new Memories docker image with your own images and configuration.
Copy to your server and deploy.

## Development

### Install dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## License

Application code licensed under MIT license.

Additionally includes the following fonts with their own license,
files found in `src/assets`:
* FUCXEDCAPSLatin - https://fontsinuse.com/typefaces/110173/fucxed
  - License: non-commercial use only
* CrimsonText - https://fontsinuse.com/typefaces/44330/crimson-text
  - License: SIL OPEN FONT LICENSE Version 1.1

## Authors

Jason Robinson / @jaywink / @jaywink:federator.dev

& the XR Finland media team.

Made with love and rage.
