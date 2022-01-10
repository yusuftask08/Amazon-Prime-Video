<template>
  <div class="watch-list">
    <div class="mx-5">
      <div class="list-title pt-3">
        <span style="cursor: pointer"> İzleme listesi </span>
      </div>
      <div class="row mt-3 d-flex justify-content-center" v-if="isWatchList">
        <div class="col-sm-3 my-2 box" v-for="item in watchList" :key="item.id">
          <div v-if="showImg" style="border: 1px solid grey">
            <img
              @mouseover="getDetail(item)"
              @click="send(item)"
              style="width: 100%"
              class="card-img-top"
              src="@/assets/arrow-prime.png"
              alt=""
            />
          </div>
          <img
            @click="send(item)"
            v-else
            @error="defaultImg"
            style="width: 100%"
            :src="'http://image.tmdb.org/t/p/original/' + item.backdrop_path"
            alt="Card image cap"
          />
          <div class="hover-data" style="width: 100%">
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
                    class="fas fa-clipboard-list text-white mr-3"
                    @click="deleteWatchList(item)"
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
                  ? movieInfo.overview.substr(0, 230) + "..."
                  : noText.substr(0, 230) + "..."
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
      </div>
      <div class="list" v-else>
        <div class="image">
          <img
            style="width: 217px; height: 217px"
            src="https://m.media-amazon.com/images/G/01/digital/video/empty_list_watchlist_new.png"
            alt=""
          />
        </div>
        <h3 class="text-white">İzleme Listeniz şu anda boş</h3>
        <div class="no-data">
          İzleme Listesine Ekle'ye tıklayarak daha sonra izlemek istediğiniz
          <router-link to="tv">TV dizilerini</router-link>
          ve
          <router-link to="movie">Filmleri</router-link> ekleyin.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Home/Card/index.vue";
import { mapGetters } from "vuex";
import {
  WATCH_LIST_GET,
  MOVIE_ID_INFO_DETAILS,
  WATCH_LIST_DELETE,
} from "@/store/actions.type";
export default {
  components: { Card },
  data() {
    return {
      showImg: false,
      noText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia explicabo rem quo repellendus optio maxime mollitia atque aliquam deserunt aut, blanditiis dicta animi quasi error laborum odio quos minima doloribus ab. Enim autem eos praesentium cupiditate, quia labore, numquam nihil provident optio quis nobis quae doloribus, assumenda quam soluta. Beatae?",
      defaultImage: require("@/assets/arrow-prime.png"),
    };
  },
  created() {
    this.init();
  },
  methods: {
    send(e) {
      if (this.$route.path !== e.id) {
        this.$router.push(`/detail/${e.id}`);
      }
    },
    defaultImg(event) {
      event.target.src = this.defaultImage;
    },
    init() {
      this.$store.dispatch(WATCH_LIST_GET);
    },
    getDetail(e) {
      const isTvOrMovie = e.adult == false ? true : false;
      this.$store.dispatch(MOVIE_ID_INFO_DETAILS, {
        id: e.id,
        category: isTvOrMovie,
      });
    },
    deleteWatchList(e) {
      this.$store.dispatch(WATCH_LIST_DELETE, e.Id);
    },
  },
  computed: {
    ...mapGetters({
      watchList: "setWatchList",
      movieInfo: "setMovieInfo",
    }),
    isWatchList() {
      return this.watchList.length > 0;
    },
  },
};
</script>

<style>
.list-title span {
  margin-top: 50px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  float: none;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.watch-list {
  background-image: radial-gradient(
      ellipse at left top,
      rgba(29, 79, 115, 0.2) 10%,
      #0f171e 80%
    ),
    radial-gradient(
      ellipse at left bottom,
      rgba(29, 79, 115, 0.1) 20%,
      #0f171e 80%
    );
}
.watch-list {
  -webkit-font-smoothing: none;
  background-size: 100% 100%, 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 100%, top;
  padding-bottom: 30px;
}
.list {
  padding-top: 48px;
  text-align: center;
  padding-bottom: 48px;
}
.list div {
  color: #8197a4;
}
.list h3,
h2._3Nx7x1 {
  font-weight: 700;
}
.list div a,
.list div a:link {
  color: #79b8f3;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
}
</style>