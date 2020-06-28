<template>
    <div class="noncentered-text">
      <p v-for="(item, index) in config.texts.introTextParagraphs" :key="index">
        {{ item }}
      </p>
    </div>
</template>

<script>
import config from "../../config"

export default {
  name: "IntroText",
  computed: {
    config() {
      return config
    },
  },
}
</script>

<style>

</style>
