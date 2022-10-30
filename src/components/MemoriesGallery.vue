<!--suppress CssInvalidPseudoSelector -->
<template>
  <div>
    <agile
      @after-change="e => currentSlide = e.currentSlide"
      @before-change="closeLongCaption"
      :fade="true"
      :dots="false"
      :change-delay="200"
      :autoplay="autoplay"
      :autoplaySpeed="config.autoPlayIntervalSeconds * 1000"
      :speed="1000"
      ref="carousel"
    >
      <template slot="caption">
        {{ (picture || {}).caption || '' }}
        <span v-if="(picture || {}).longCaption" class="pointer-text">
          <br>
          <span v-on:click="showLongCaption" class="underline-text">({{ config.texts.showCaption }})</span>
        </span>
      </template>

      <img
        v-for="picture in pictures"
        v-on:click="closeLongCaption"
        class="slide"
        :src="picture.url"
        :key="picture.key"
        :alt="picture.caption"
      />

      <template slot="prevButton">
        <font-awesome-icon :icon="['fa', 'chevron-left']" />
      </template>

      <template slot="nextButton">
        <font-awesome-icon :icon="['fa', 'chevron-right']" />
      </template>
    </agile>
    <audio id="audio-speech" autoplay loop preload="auto" controls>
      <!--suppress HtmlUnknownTarget -->
      <source src="audio.mp3" type="audio/mpeg">
    </audio>
    <div v-if="longCaptionVisible" class="long-caption-container small-text">
      {{ picture.longCaption }}
      <div class="tiny-text pull-to-right">
        <span v-on:click="closeLongCaption" class="pointer-text underline-text">
          {{ config.texts.closeByClicking }}
        </span>
        {{ config.texts.orByMovingToNextImage }}.
      </div>
    </div>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile'
import config from "../../config"

export default {
  components: {
    agile: VueAgile,
  },
  props: [
    "pictures",
  ],
  data() {
    return {
      autoplay: true,
      currentSlide: 0,
      longCaptionVisible: false,
    }
  },
  computed: {
    config() {
      return config
    },
    picture() {
      return this.pictures.find(o => o.key === this.currentSlide.toString())
    },
  },
  methods: {
    onKey(ev) {
      if (ev.key === "ArrowLeft") {
        this.$refs.carousel.goToPrev()
      } else if (ev.key === "ArrowRight" || ev.code === "Space") {
        this.$refs.carousel.goToNext()
      }
    },
    closeLongCaption() {
      this.longCaptionVisible = false
      this.autoplay = true
      this.$refs.carousel.isAutoplayPaused = false
    },
    showLongCaption() {
      this.longCaptionVisible = true
      this.autoplay = false
      this.$refs.carousel.isAutoplayPaused = true
    },
  },
  created() {
    window.addEventListener('keydown', this.onKey)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKey)
  },
}
</script>

<style lang="sass">
.agile
  &__caption
    position: absolute
    left: 50%
    bottom: 5%
    width: 98%
    transform: translateX(-50%)
    font-size: 1.45em
    margin: 20px 0
    font-weight: 400
    color: #eeeeee
    text-shadow: -1px -1px 0 #212529, 1px -1px 0 #212529, -1px 1px 0 #212529, 1px 1px 0 #212529
    text-align: center
    font-family: 'Crimson Text', Serif, serif

  &__nav-button
    background: transparent
    border: none
    color: #fff
    cursor: pointer
    font-size: 24px
    height: 100%
    position: absolute
    top: 0
    transition-duration: .3s
    width: 80px

    &:hover
      background-color: rgba(#000, .5)
      opacity: 1

    &--prev
      left: 0

    &--next
      right: 0

  &__dots
    bottom: 10px
    left: 50%
    position: absolute
    transform: translateX(-50%)

  &__dot
    margin: 0 10px

    button
      background-color: transparent
      border: 1px solid #fff
      border-radius: 50%
      cursor: pointer
      display: block
      height: 10px
      font-size: 0
      line-height: 0
      margin: 0
      padding: 0
      transition-duration: .3s
      width: 10px

    &--current,
    &:hover
      button
        background-color: #fff

.slide
  display: block
  height: 100vh
  object-fit: scale-down

audio
  position: absolute
  bottom: 20px
  right: 20px
  opacity: 0.3
  width: 100px
  &::-webkit-media-controls-timeline-container
    display: none
  &::-webkit-media-controls-current-time-display
    display: none
  &::-webkit-media-controls-timeline
    display: none
  &::-webkit-media-controls-volume-slider-container
    display: none
  &::-webkit-media-controls-time-remaining-display
    display: none

.long-caption-container
  z-index: 100000
  top: 30px
  left: 50%
  transform: translateX(-50%)
  position: absolute
  padding: 30px
  width: 40%
  border-color: #eeeeee
  border-width: 2px
  border-style: double
  border-radius: 5px
  background-color: #212529

@media only screen and (max-width: 1080px)
  .long-caption-container
    width: 80%

@media only screen and (max-width: 500px)
  .long-caption-container
    width: 90%
    padding: 10px
</style>
