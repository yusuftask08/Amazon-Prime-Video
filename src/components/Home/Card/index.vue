<template>
  <div>
    <div class="d-flex align-items-center" v-if="showSeeMore">
      <h2 class="title mt-4">{{ contentName }}</h2>
      <router-link to="Login" class="seeMore mt-4">
        <h6>Daha Fazlasını Gör</h6>
      </router-link>
    </div>
    <swiper class="swiper" ref="swiper" :options="swiperOption">
      <swiper-slide class="py-2" v-for="(item, index) in data" :key="index">
        <div class="box">
          <div>
            <img
              v-if="!showImg"
              style="width: 95%"
              class="card-img-top"
              src="@/assets/arrow-prime.png"
            />
            <img
              v-else
              @click="send(item)"
              @mouseover="getDetail(item)"
              style="width: 95%"
              class="card-img-top"
              :src="'http://image.tmdb.org/t/p/original/' + item.backdrop_path"
            />
          </div>
          <div class="hover-data">
            <div class="hover-heading">
              <div class="play-div">
                <div class="playIcon">
                  <button class="btn btn-hover-play">
                    <i class="fa fa-play text-grey fa-m"></i>
                  </button>
                </div>
                <div class="text-white mt-2 ml-3">Oynat</div>
              </div>
              <div class="mt-2 d-flex icons">
                <div>
                  <i class="fas fa-play text-white mr-3"></i>
                </div>
                <div>
                  <i
                    @click="addWatchList(item)"
                    :class="[
                      isAddWatchList !== item.id ? 'fa-plus' : 'fa-check',
                      'fa text-white mr-3',
                    ]"
                  >
                  </i>
                </div>
                <div class="mr-n3">
                  <i class="fas fa-ban text-white mr-3"></i>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <span class="prime-inside">Prime’a Dahil</span>
            </div>
            <div class="hover-data-title">
              {{ movieInfo.title ? movieInfo.title : movieInfo.name }}
            </div>
            <div class="overview">
              {{
                movieInfo.overview
                  ? movieInfo.overview.substr(0, 150) + "..."
                  : noText.substr(0, 150) + "..."
              }}
            </div>
            <div class="movie-info">
              <div class="run-time">
                {{ Math.floor(movieInfo.runtime / 60) + " sa" }}
                {{ (movieInfo.runtime % 60) + " dk" }}
              </div>
              <div class="release-year">
                {{
                  movieInfo.release_date
                    ? movieInfo.release_date.substr(0, 4)
                    : ""
                }}
              </div>
              <div class="release-year">
                {{ movieInfo.adult ? "+18 " : "Veri yok" }}
              </div>
            </div>
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
import { SET_MOVIE_OR_TV } from "@/store/mutations.type";
import {
  WATCH_LIST_ADD,
  MOVIE_ID_INFO_DETAILS,
  WATCH_LIST_DELETE,
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "card",
  props: ["data", "showSeeMore", "contentName", "pageName"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      curentTab: 0,
      showImg: true,
      hoverScreen: false,
      name: null,
      hours: null,
      noIsWatch: null,
      minutes: null,
      iconShow: false,
      noText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia explicabo rem quo repellendus optio maxime mollitia atque aliquam deserunt aut, blanditiis dicta animi quasi error laborum odio quos minima doloribus ab. Enim autem eos praesentium cupiditate, quia labore, numquam nihil provident optio quis nobis quae doloribus, assumenda quam soluta. Beatae?",
      show: true,
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 0,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {},
      },
    };
  },
  methods: {
    send(e) {
      const isTvOrMovie = e.adult == false ? true : false;
      this.$store.commit(SET_MOVIE_OR_TV, isTvOrMovie);
      if (this.$route.path !== e.id) {
        this.$router.push(`/detail/${e.id}`).then((_) => {});
        this.lazyImage();
      }
    },
    getDetail(e) {
      const isTvOrMovie = e.adult == false ? true : false;
      this.$store.dispatch(MOVIE_ID_INFO_DETAILS, {
        id: e.id,
        category: isTvOrMovie,
      });
    },
    addWatchList(e) {
      this.$store.dispatch(WATCH_LIST_ADD, e);
    },
    deleteWatchList(e) {
      this.$store.dispatch(WATCH_LIST_DELETE, e.id);
    },
    lazyImage() {
      setTimeout(() => {
        this.showImg = true;
      }, 1000);
      this.showImg = false;
    },
  },
  computed: {
    ...mapGetters({
      movieInfo: "setMovieInfo",
      trailerVideo: "setMovieInfoTrailer",
      watchList: "setWatchList",
      isAddWatchList: "setIsAddWatchList",
    }),
  },

  created() {
    this.lazyImage();
  },
};
</script>

<style>
.btn-hover-play {
  margin-top: 0px !important;
  width: 40px !important;
  height: 40px !important;
  background: black;
  border-radius: 50% !important;
  border: 2px solid #fff !important;
}
.btn-hover-play:hover {
  background: #00a0d6;
  transition: 0.3s;
  border: 2px solid #00a0d6 !important;
}
.swiper-button-next:hover {
  transition: opacity 0.25s ease, background-color 0.25s ease;
  background-color: rgba(15, 23, 30, 0.5);
}
.swiper-button-prev:hover {
  transition: opacity 0.25s ease, background-color 0.25s ease;
  background-color: rgba(15, 23, 30, 0.5);
}
.icons i {
  cursor: pointer;
}
.box {
  cursor: pointer;
}
.box:hover {
  position: relative;
  transform: scale(1.2);
  transition: all 0.3s ease;
  z-index: 999;
}
.swiper-container:hover {
  overflow-y: visible;
  overflow-x: unset;
  scroll-behavior: smooth;
}
.box:hover > .hover-data {
  display: block;
}
.box-img {
  transition: 0.3s;
}
.prime-inside {
  font-size: 12px;
  font-weight: 700;
  color: #8197a4;
}
.title {
  margin-top: 10px;
  font-weight: 700;
  font-size: 19px;
  color: #fff;
  text-decoration: none;
}
.hover-data-title {
  line-height: 24px;
  font-weight: 700;
  font-size: 15px;
  padding: 0;
  color: #fff;
}
.seeMore {
  color: #79b8f3;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 10px;
}
.seeMore:hover {
  text-decoration: none;
  color: #90dffe;
}
.hover-data {
  height: 250px;
  width: 95%;
  display: none;
  position: relative;
  background: linear-gradient(rgba(27, 37, 48, 0), #1b2530 48px);
  padding: 30px 30px;
  padding-bottom: 5px;
  margin-top: -45px;
  z-index: 2;
  text-decoration: none;
}
.play-button {
  color: white;
  transform: scale(1.3);
}
.play-button:hover {
  background-color: white;
  border-radius: 50%;
  outline: none;
}
.playtext {
  text-decoration: none;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
}
.play-div {
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 65px;
}
.hover-heading {
  text-decoration: none;
  display: flex;
  justify-content: space-between;
}
.overview {
  margin-top: 5px;
  font-size: 11px;
  text-decoration: none;
  color: #fff;
}
.release-year {
  font-size: 11px;
  color: gray;
  margin-bottom: 15px;
}
.run-time {
  color: darkgray;
  font-size: 11px;
}
.movie-info {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 200px;
}
.rated {
  border: 1px solid darkgray;
  color: darkgray;
  font-size: 9px;
  padding: 3px;
  height: 10px;
}
</style>