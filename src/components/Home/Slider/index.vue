<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in data" :key="item.id">
        <img
          @click="goDetail(item)"
          class="images"
          :src="'http://image.tmdb.org/t/p/w1280/' + item.backdrop_path"
      /></swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  props: ["data"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          disableOnInteraction: true,
        },
        speed: 800,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    goDetail(e) {
      this.$router.push(`/detail/${e.id}`);
    },
  },
};
</script>
<style>
.swiper-button-prev {
  position: absolute;
  margin: 0;
  top: 0;
  height: 100%;
  border: 0;
  padding: 6px !important;
  color: #fff;
  cursor: pointer;
  background: transparent;
  z-index: 10;
  filter: drop-shadow(0 0 5px #000);
}
.swiper-button-next {
  position: absolute;
  margin: 0;
  top: 0;
  height: 100%;
  border: 0;
  padding: 6px !important;
  color: #fff;
  cursor: pointer;
  background: transparent;
  z-index: 10;
  filter: drop-shadow(0 0 5px #000);
}
.images {
  max-height: 400px;
  width: 100%;
  object-fit: fill;
}
</style>