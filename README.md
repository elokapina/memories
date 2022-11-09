# Memories

Gallery application with landing page and audio/text intro.

Made for the XR Finland chapter gallery to celebrate brave rebels fighting against climate change.

## Usage

This application can be deployed either by running it as a Node application or via Docker.
We recommend using the Docker way.

Memories runs in two modes: purely frontend or frontend + backend. Running with the
backend allows for security splitting into several subgalleries via access codes.
The purely frontend version just has one image list without any access controls.

In the following instructions, choose "frontend only" or "frontend + backend", where
applicable.

### Choose your images

Choose your images and place them in a folder called `originals`. Create it if necessary.

### Init configuration file

* Frontend only:

  `cp config.example_with_frontend_only.js config.js` to initialize the configuration file.

* Frontend + backend:

  `cp backend_config.example.js backend_conf.js` to initialize the backend config.

  `cp config.example_with_backend.js config.js` to initialize the frontend config.

The config files are pretty self-explanatory. Some of them control behaviour:

* Removing or setting `texts.introTextLinkClickHere` to `false` will immediately render 
  the intro text.
* Removing or setting `texts.help` to `false` will hide the help text section.

### Configure image list

Get a list of your images to be placed in your preferred order into the config files.

Hint: `ls -1 originals/ | xargs -I img echo '"img",'` for an easily copypasteable list.

* Frontend only: put the images into the `pictures` array in `config.js`.

* Frontend + backend: split the images into one or more galleries under `codes` in the
`backend_conf.js` file. The key of the property in `codes` is the access key to 
the gallery. Put the relevant images for each gallery (code) in the array 
under the code, as in the example config file.

### Optimize and copy images

Install `imagemagick` if you don't have it and in the project root folder execute the following:

```bash
node prepare_pictures.js
```

This will resize the images and drop their quality a bit for web usage. When you want to
refresh your images, just repeat this step.

If you have configured backend mode, the images will be copied to code specific subfolders. 

### Image captions

Memories supports the following captions per image:
* caption
* long caption

These are optional. If you want to set them, have a look at the examples in the config
file and add as needed. If you don't want captions, ignore this step.

* Frontend only: the captions are in `config.js` under `pictureProperties`.

* Frontend + backend: the captions are in `backend_conf.js` under `properties`.

### Logo

The top-left logo comes from `public/logo.png`. Copy your PNG format file there.

### Styling

If you want to override some styling, put it in `public/custom.css`. Don't forget
to add some `!important` to the styles where necessary to ensure they override
the Vue generated component styles.

### Audio

There is an audio file that starts playing when the user enters the gallery.
Copy your audio file to `public/audio.mp3`.

### Favicon

The site favicon should be added to `public/favicon.png`. It should be exactly 32x32 in size.

### Texts

The frontend `config.js` file contains a list of texts that will be shown either in the 
landing page  intro or during the gallery viewing. Go through them and edit as needed.

### Done!

Phew, that wasn't so bad. Now you can either run the gallery locally or build a docker image(s).

#### Running locally

```bash
npm install
```

* Frontend only:

  ```bash
  npm run serve
  ```

* Frontend + backend, open two terminals, in one:

  ```bash
  npm run serve
  ```

  The other:

  ```bash
  node src/backend/app.js
  ```

#### Docker image

* Frontend only:

  ```bash
  docker build -f docker/frontend/Dockerfile -t memories-frontend:latest .
  docker save -o memories-frontend memories-frontend:latest
  ```

* Backend + frontend:

  ```bash
  docker build -f docker/frontend/Dockerfile -t memories-frontend:latest .
  docker save -o memories-frontend memories-frontend:latest
  docker build -f docker/backend/Dockerfile -t memories-backend:latest .
  docker save -o memories-backend memories-backend:latest
  ```

Now you have a shiny new Memories docker image(s) with your own pictures and configuration.
Note! These images contain the config files, so if you're deploying a secret code
protected gallery, don't upload the backend image to a public registry!

Copy to your server and import the images:

* Frontend only:

  ```bash
  docker load < memories-frontend
  ```

* Frontend + backend:

  ```bash
  docker load < memories-frontend
  docker load < memories-backend
  ```

Then run them, pointing traffic to the following ports:

* Frontend: 80
* Backend: 3000

How to run Docker images or how to set up a load balancer is out of scope
of this readme.

## Development

### Install dependencies

```bash
npm install
```

### Compiles and hot-reloads frontend for development

```bash
npm run serve
```

### Run backend

```bash
NODE_ENV=development node src/backend/app.js
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

## License

Application code licensed under MIT license.

Additionally, includes the following fonts with their own license,
files found in `src/assets`:
* FUCXEDCAPSLatin - https://fontsinuse.com/typefaces/110173/fucxed
  - License: non-commercial use only
* CrimsonText - https://fontsinuse.com/typefaces/44330/crimson-text
  - License: SIL OPEN FONT LICENSE Version 1.1

## Authors

Jason Robinson / @jaywink / @jaywink:federator.dev

& the XR Finland media team.

Made with love and rage.
