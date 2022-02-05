
<template>
  <div>
    <div class="d-flex align-items-center mt-3">
      <img
        src="https://m.media-amazon.com/images/G/01/primeLogo/primelogo-330x90-v2._V507659160_SY35_FMpng_.png"
      />
      <strong>
        <span class="ml-3 text-white"> Sizin için önizlemeler</span>
      </strong>
    </div>
    <small class="mt-2" style="color: #8197a4"
      >İzlediklerinize göre sizin için seçilmiştir
    </small>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-4">
            <div
              class="_1Tjzg3"
              style="
                background-image: linear-gradient(
                    270deg,
                    rgba(37, 46, 57, 0),
                    rgb(37, 46, 57) 80%
                  ),
                  url('https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/dc77d0b2f1d324f9480d517a716ba966ffb1dd8e49ddab07389dac80057fbea8._RI_V_TTW_SX1500_BL40_FMJPG_.jpg');
              "
            ></div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-navigation",
  title: "Navigation",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>
<style>
._2krGTw ._1Tjzg3 {
  width: 33vw;
  min-width: 200px;
  max-width: 460px;
  height: 100%;
  position: relative;
  padding: 24px;
  z-index: 3;
  background-size: cover;
  background-image: linear-gradient(270deg, rgba(37, 46, 57, 0), #252e39 80%);
  border-radius: 16px 0 0 16px;
}
._2krGTw,
._2krGTw > * {
  border-radius: 16px;
  overflow: hidden;
}
._2krGTw * {
  transition: opacity 0.3s;
}
</style>
