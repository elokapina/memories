<template>
  <div>
    <a :href="config.logoTargetUrl" target="_blank" rel="noopener">
      <img
        src="../../public/logo.png"
        :class="logoClasses"
        alt="logo">
    </a>
    <div v-if="codeRequired">
      <div class="code-container header-text large-text">
        {{ config.texts.inputCode }}
        <input
          class="code-input"
          type="text"
          v-model="code"
          v-on:keyup="codeChange"
        />
      </div>
    </div>
    <div v-else-if="showGallery">
      <MemoriesGallery
        v-bind:pictures="pictures"
      />
    </div>
    <div v-else>
      <div class="grid-container">
        <div></div>
        <div class="header-text xlarge-text buffered">
          {{ config.texts.title }}
        </div>
        <div class="normal-text buffered">
          {{ config.texts.subtitle }}
        </div>
        <div
          v-if="!showIntro"
          v-on:click="showTheGallery"
          class="header-text pointer-text underline-text large-text buffered"
        >
          {{ config.texts.start }}
        </div>
        <div v-if="showIntro" class="small-text intro-container">
          <IntroText />
          <div v-on:click="showTheGallery" class="header-text pointer-text underline-text large-text buffered">
            {{ config.texts.start }}
          </div>
        </div>
        <div v-else class="small-text intro-container buffered">
          {{ config.texts.introTextLink }}
          <span v-on:click="showIntroText" class="underline-text pointer-text">
            {{ config.texts.introTextLinkClickHere }}
          </span>.
        </div>
        <div v-if="config.texts.help" class="small-text intro-container">
          {{ config.texts.help }}
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import MemoriesGallery from "./MemoriesGallery.vue"
import IntroText from "./IntroText.vue"
import config from "../../config"

export default {
  components: {
    IntroText,
    MemoriesGallery,
  },
  data() {
    return {
      logoClasses: 'logo logo-landing',
      showGallery: false,
      showIntro: !config.texts.introTextLinkClickHere,
      pictures: [],
      codeRequired: config.backendUrl !== undefined,
      code: "",
    }
  },
  computed: {
    config() {
      return config
    },
  },
  mounted() {
    if (this.codeRequired && config.enableCodeBasedUrls) {
      const path = window.location.pathname
      if (path !== "/") {
        this.code = path.slice(1)
        this.codeChange()
      }
    }
  },
  methods: {
    showTheGallery() {
      this.logoClasses = 'logo'
      this.showGallery = true
    },
    showIntroText() {
      this.showIntro = true
    },
    async codeChange() {
      const response = await fetch(`${config.backendUrl}/images/${this.code}`)
      if (!response.ok) {
        return
      }
      const data = await response.json()
      // eslint-disable-next-line no-restricted-syntax
      for (const [idx, picture] of data.pictures.entries()) {
        this.pictures.push({
          key: `${idx}`,
          url: `pictures/${this.code}/${picture}`,
          caption: data.properties?.[picture]?.caption || '',
          longCaption: data.properties?.[picture]?.longCaption || '',
        })
      }
      this.codeRequired = false
      this.preload()
    },
    preload() {
      // Preload a few gallery images
      // noinspection JSMismatchedCollectionQueryUpdate
      const images = []
      // eslint-disable-next-line no-restricted-syntax
      for (const [idx, picture] of this.pictures.entries()) {
        const image = new Image()
        image.src = picture.url
        images.push(image)
        if (idx > 5) {
          break
        }
      }
    },
  },
}
</script>

<style lang="sass">
.logo
  z-index: 10000
  width: 200px
  height: 71.6px
  position: absolute
  top: 10px
  left: 10px

@media only screen and (max-width: 1080px)
  .logo-landing
    position: static
    margin: 10px

.grid-container
  display: grid
  justify-content: center
  text-align: center
  height: 100vh
  margin: 20px 10px

@media only screen and (max-width: 1080px)
  .grid-container
    display: block
    height: 100%
    .buffered
      margin: 40px 0

.code-container
  display: grid
  justify-content: center
  text-align: center
  margin-top: 10%
  width: 100%
  height: 30pt

.code-input
  height: 100pt

.intro-container
  margin: 0 15%
</style>
