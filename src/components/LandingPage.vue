<template>
  <div>
    <a :href="config.logoTargetUrl" target="_blank" rel="noopener">
      <img
        src="../../public/logo.png"
        :class="logoClasses"
        alt="logo">
    </a>
    <div v-if="showGallery">
      <MemoriesGallery />
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
        <div v-on:click="showTheGallery" class="header-text pointer-text underline-text large-text buffered">
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
      showIntro: false,
    }
  },
  computed: {
    config() {
      return config
    },
  },
  methods: {
    showTheGallery() {
      this.logoClasses = 'logo'
      this.showGallery = true
    },
    showIntroText() {
      this.showIntro = true
    },
  },
  mounted() {
    // Preload the gallery images
    // noinspection JSMismatchedCollectionQueryUpdate
    const images = []
    config.pictures.forEach(picture => {
      const image = new Image()
      image.src = `/pictures/${picture}`
      images.push(image)
    })
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

.intro-container
  margin: 0 15%
</style>
