<template>
  <div class="home">
    <div class="carousel">
      <div v-for="(image, index) in images" :key="index" :style="{ backgroundImage: 'url(' + image + ')' }" :class="{ active: index === activeImage }"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      images: [
        'https://mrwallpaper.com/images/hd/uefa-champions-league-star-bowl-rlsrfh81jsb88ed1.jpg',
        'https://staticg.sportskeeda.com/Football+wallpapers/CR7/cr7.jpg',
      ],
      activeImage: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.activeImage = (this.activeImage + 1) % this.images.length
    }, 2000) 
  }
}
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100vw;
  height: 300px;
  overflow: hidden;
}

.carousel div {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s;
  opacity: 0;
}

.carousel div.active {
  opacity: 1;
}
</style>