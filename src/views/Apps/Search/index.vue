<template>
  <div>
    <div class="search-page mx-5 my-3">
      <div class="d-flex search-info align-items-center">
        <div v-if="categoryName" class="mt-3" style="font-size: 18px">
          {{ categoryName }}
        </div>
        <div v-else-if="noData" class="mt-3" style="font-size: 18px">
          "{{ query }}" sonuçları
        </div>
        <div v-else class="mt-3" style="font-size: 18px">
          "{{ query }}" aramanız ile eşleşen bir içerik bulamadık. Aşağıdan en
          popüler TV dizilerine ve filmlere göz atın.
        </div>
        <div class="ml-auto" v-if="noData">
          <button type="button" class="btn btn-secondary collapse-button">
            Daralt
          </button>
        </div>
      </div>
    </div>
    <div class="row d-flex mx-4 px-2 justify-content-center">
      <div
        class="col-sm-3 my-2 box"
        v-for="item in isData"
        :key="item.id"
        @mouseover="getDetail(item)"
      >
        <div v-if="showImg" style="border: 1px solid grey">
          <img
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
                  v-if="!iconShow"
                  class="fas fa-plus text-white mr-3"
                  @click="addWatchList(item)"
                >
                </i>
                <i
                  v-else
                  class="fas fa-clipboard-list text-white mr-3"
                  @click="iconShow = false"
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
            <div class="run-time ml-2">
              {{ Math.floor(movieInfo.runtime / 60) + " sa" }}
              {{ (movieInfo.runtime % 60) + " dk" }}
            </div>
            <div class="release-year ml-2">
              {{
                movieInfo.release_date
                  ? movieInfo.release_date.substr(0, 4)
                  : ""
              }}
            </div>
            <div class="release-year mr-n5">
              {{ movieInfo.adult ? "+18 " : "Veri yok" }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5" v-if="!noData">
      <Card
        :data="popularMovieList"
        :showSeeMore="false"
        :contentName="'Amazon Orjinal ve Özel İçerikler'"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_QUERY, MOVIE_ID_INFO_DETAILS } from "@/store/actions.type";
import Card from "@/components/Home/Card/index.vue";

export default {
  name: "search",
  components: { Card },
  data() {
    return {
      iconShow: false,
      showImg: false,
      defaultImage: require("@/assets/arrow-prime.png"),
      noText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia explicabo rem quo repellendus optio maxime mollitia atque aliquam deserunt aut, blanditiis dicta animi quasi error laborum odio quos minima doloribus ab. Enim autem eos praesentium cupiditate, quia labore, numquam nihil provident optio quis nobis quae doloribus, assumenda quam soluta. Beatae?",
    };
  },
  methods: {
    send(e) {
      if (this.$route.path !== e.id) {
        console.log(`this.$route`, this.$route);
        this.$router.push(`/detail/${e.id}`);
      }
    },
    defaultImg(event) {
      event.target.src = this.defaultImage;
    },
    init() {
      const q = localStorage.getItem("query");
      this.$store.dispatch(SEARCH_QUERY, q);
    },
    getDetail(e) {
      const isTvOrMovie = e.adult == false ? true : false;
      this.$store.dispatch(MOVIE_ID_INFO_DETAILS, {
        id: e.id,
        category: isTvOrMovie,
      });
    },
    addWatchList() {
      this.iconShow = true;
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      movieInfo: "setMovieInfo",
      genreIdMovies: "setGenreIdMovies",
      searchData: "setSearchData",
      query: "setQuery",
      popularMovieList: "setPopularMovieList",
    }),
    noData() {
      return this.searchData.length > 0;
    },
    categoryName() {
      return this.$route.params.name;
    },
    isData() {
      return this.$route.params.name ? this.genreIdMovies : this.searchData;
    },
  },
  beforeRouteLeave: function (to, from, next) {
    if (to.name !== "Search") {
      localStorage.removeItem("query");
      localStorage.removeItem("category-name");
    }
    next();
  },
};
</script>

<style>
.search-default h2 {
  color: #8197a4;
}
.search-page {
  color: #8197a4;
}
.collapse-button {
  border-radius: 3px;
  padding: 8px 16px;
  background-color: #425265;
  width: 100px !important;
  text-align: center;
  margin-top: 0px !important;
}
.collapse-button:hover {
  background-color: #566b84;
}
.search-info {
  border-bottom: 1px solid #425265;
  padding-top: 24px;
  padding-bottom: 16px;
}
</style>