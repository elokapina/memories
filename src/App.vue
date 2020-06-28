<template>
  <div id="app">
    <LandingPage />
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage.vue"

export default {
  name: 'App',
  components: {
    LandingPage,
  },
}
</script>

<style lang="sass">
body, html
  background-color: #212529
  margin: 0

@font-face
  font-family: 'FucXedLatin'
  src: url("assets/FUCXEDCAPSLatin-Regular.woff")
  font-style: normal
  font-weight: normal
  font-display: swap

@font-face
  font-family: 'Crimson Text'
  src: url("assets/CrimsonText-Regular.woff")
  font-display: swap

.header-text
  font-family: FucXedLatin, sans-serif
  color: #eeeeee

.xlarge-text
  font-size: 64px

.large-text
  font-size: 48px

.normal-text
  font-family: 'Crimson Text', Serif, serif
  color: #eeeeee
  font-size: 32px

.small-text
  font-family: 'Crimson Text', Serif, serif
  color: #eeeeee
  font-size: 18px

.tiny-text
  font-family: 'Crimson Text', Serif, serif
  color: #eeeeee
  font-size: 14px

.pull-to-right
  margin-top: 20px
  display: inline
  float: right

.underline-text
  text-decoration: underline

.pointer-text
  cursor: pointer

.noncentered-text
  text-align: left
</style>
