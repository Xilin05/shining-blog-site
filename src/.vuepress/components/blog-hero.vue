<script setup lang="ts">
import BlogHero from 'vuepress-theme-hope/blog/components/BlogHero.js'
import BingHeroBackground from 'vuepress-theme-hope/presets/BingHeroBackground.js'
import HitokotoBlogHero from 'vuepress-theme-hope/presets/HitokotoBlogHero.js'
</script>

<template>
  <BlogHero>
    <template #heroInfo="{ tagline, isFullScreen, ...heroInfo }">
      <HitokotoBlogHero v-bind="heroInfo" />
    </template>
    <template #heroBg>
      <!-- <h1>自定义的bloghero组件</h1> -->
      <!-- <BingHeroBackground /> -->
      <div class="videoContainer">
        <video
          class="fullscreenVideo"
          id="bgVid"
          playsinline=""
          autoplay=""
          :muted="true"
          :loop="true"
        >
          <source src="../public/bg_video.mp4" type="video/mp4" />
        </video>
      </div>
    </template>
  </BlogHero>
</template>

<style scoped lang="scss">
.videoContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  background: black;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
    top: 0;
    left: 0;
    // background: rgba(25, 29, 34, 0.65);
  }

  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .fullscreenVideo {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
