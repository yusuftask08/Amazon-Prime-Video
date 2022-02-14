<template>
  <div>
    <div class="movieInfo">
      <div class="title2 mt-5">
        {{ movieDetail.title ? movieDetail.title : movieDetail.name }}
      </div>
      <div class="overview2">
        {{
          movieDetail.overview
            ? movieDetail.overview.substr(0, 400) + "..."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia explicabo rem quo repellendus optio maxime mollitia atque aliquam deserunt aut, blanditiis dicta animi quasi error laborum odio quos minima doloribus ab. Enim autem eos praesentium cupiditate, quia labore, numquam nihil provident optio quis nobis quae doloribus, assumenda quam soluta. Beatae?"
        }}
      </div>
      <div class="moviefooterScreen">
        <div class="movierating">IMDB {{ movieDetail.vote_average }}</div>
        <div class="movierunTime">
          {{ Math.floor(movieDetail.runtime / 60) + " sa" }}
          {{ (movieDetail.runtime % 60) + " dk" }}
        </div>
        <div class="moviereleaseYear">
          {{
            movieDetail.release_date
              ? movieDetail.release_date.substr(0, 4)
              : ""
          }}
        </div>
        <div class="" style="color: grey">
          {{ movieDetail.adult == false ? "+18" : "-" }}
        </div>
      </div>
      <div class="prime-inside mb-n3 mt-4">
        <p class="d-flex align-items-center">
          <img
            src="https://m.media-amazon.com/images/G/01/primeLogo/primelogo-330x90-v2._V507659160_SY35_FMpng_.png"
            alt=""
          />
          <strong>
            <span class="ml-3">Prime’a dahil</span>
          </strong>
        </p>
      </div>
      <div class="buttonGroup">
        <div>
          <button type="button" class="btn button-play">
            <i class="fas fa-play fa-lg mr-2"></i>
            <span style="font-weight: 700"> Oynat </span>
          </button>
        </div>
        <div class="ml-2">
          <button
            @click="addWatchList(movieDetail)"
            type="button"
            class="btn button-plus"
          >
            <i
              :class="[
                isAddWatchList !== movieDetail.id ? 'fa-plus' : 'fa-check',
                'fas fa-lg text-white ',
              ]"
            ></i>
          </button>
        </div>
        <div class="ml-2">
          <button type="button" class="btn button-plus">
            <i class="fas fa-magic fa-lg"></i>
          </button>
        </div>
        <div class="ml-2">
          <button type="button" class="btn button-plus">
            <i class="fas fa-download fa-lg"></i>
          </button>
        </div>
      </div>
      <div class="people">
        <div class="peopleHeading">Yönetmenler</div>
        <div class="peopleVal ml-2" style="width: 100%">
          <div class="d-flex">
            {{
              director.toString().length > 50
                ? director.toString().substr(0, 50) + "..."
                : director.toString() || "Veri yok"
            }}
          </div>
        </div>
        <div class="peopleHeading">Başrollerde</div>
        <div class="peopleVal ml-2" style="width: 100%">
          <div class="">
            {{
              cast.toString().length > 50
                ? cast.toString().substr(0, 50) + "..."
                : cast.toString()
            }}
          </div>
        </div>
        <div class="peopleHeading">Türler</div>
        <div class="peopleVal ml-2">
          <div class="d-flex">
            {{ genres.toString() }}
          </div>
        </div>
      </div>
      <div class="imageDiv">
        <img
          v-if="!showImgVideo"
          class="movie_image"
          :src="
            'http://image.tmdb.org/t/p/original/' + movieDetail.backdrop_path
          "
          alt="580489"
        />
      </div>
      <div class="divImage1"></div>
      <div class="info d-flex mt-5" style="width: 150%">
        <div class="term-of-use justify-content-start">
          <span class="">
            Oynat'a tıklayarak <a href="/#">Kullanım Şartları</a>'mızı kabul
            etmiş olursunuz.
          </span>
        </div>
        <div class="bottom-action d-flex ml-auto">
          <div class="share mr-4">
            <i class="fas fa-share-alt mr-2"></i>
            <span>Paylaş</span>
          </div>
          <div class="feedback mr-4">
            <i class="fas fa-pencil-alt mr-2"></i> <span>Geri Bildirim</span>
          </div>
          <div class="question">
            <i class="fas fa-question-circle mr-2"></i>
            <span>Yardım Alın</span>
          </div>
        </div>
      </div>
    </div>
    <div class="relatedMovies">
      <div class="tabHeading">
        <div
          class="mr-5"
          @click="show = true"
          :class="show == true ? 'activeRelated' : ''"
        >
          İlgili
        </div>
        <div @click="show = false" :class="show == true ? '' : 'activeRelated'">
          Ayrıntılar
        </div>
      </div>
      <div class="banner" v-if="show">
        <Card :data="similar" :showSeeMore="false" :pageName="'detail'" />
      </div>
      <div class="detail text-white" v-else>
        <h4 class="ml-1">Daha fazla ayrıntı</h4>
        <div class="detailsCrew">
          <div class="d-flex">
            <h5 class="ml-n4 detail-title">Yapımcılar</h5>
            <div class="peopleVal" style="width: 100%">
              <div class="d-flex title-desc">
                {{
                  director.toString().length > 220
                    ? director.toString().substr(0, 220) + "..."
                    : director.toString() || "Veri yok"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex mt-5">
            <h5 class="ml-n4 detail-title">Stüdyo</h5>
            <div class="peopleVal" style="width: 100%">
              <div class="d-flex title-desc">
                {{
                  productionCompany.toString().length > 220
                    ? productionCompany.toString().substr(0, 220) + "..."
                    : productionCompany.toString() || "Veri yok"
                }}
              </div>
            </div>
          </div>
          <div class="d-flex mt-5">
            <h5 class="ml-n4 detail-title">Amazon Yaş Kategorisi</h5>
            <div class="peopleVal" style="width: 100%">
              <div class="d-flex title-desc">
                {{
                  movieDetail.adult == false ? "+18 Yetişkinler" : "Veri yok"
                }}
                <a href="/#" class="ml-2"> Daha fazla bilgi edinin</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Home/Card/index.vue";
import { MOVIE_ID_DETAILS, WATCH_LIST_ADD } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  components: {
    Card,
  },
  data() {
    return {
      show: true,
      hours: null,
      minutes: null,
      showImgVideo: false,
    };
  },
  watch: {
    $route(to, from) {
      if (from.params.id !== this.$route.params.id) {
        this.getDetail();
      }
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let name = this.movieOrTv == true ? (name = "movie") : (name = "tv");
      const id = this.$route.params.id;
      this.$store.dispatch(MOVIE_ID_DETAILS, {
        id: id,
        category: name,
      });
      name = null;
    },
    showVideo(e) {
      setTimeout(() => {
        this.showImgVideo = e;
      }, 2000);
    },
    addWatchList(e) {
      this.$store.dispatch(WATCH_LIST_ADD, e);
    },
  },
  computed: {
    ...mapGetters({
      movieDetail: "getMovieDetail",
      cast: "getCast",
      director: "getDirector",
      genres: "getMovieGenre",
      similar: "getSimilar",
      productionCompany: "getProductionCompany",
      trailerVideo: "getTrailerVideo",
      movieOrTv: "getMovieOrTv",
      isAddWatchList: "getIsAddWatchList",
    }),
  },
};
</script>

<style>
.bottom-action div {
  cursor: pointer !important;
}
.title-desc {
  left: 20%;
  position: absolute;
}
.title-desc a {
  color: #79b8f3;
  text-decoration: none;
}
.detail-title {
  font-weight: 700;
  white-space: nowrap;
  display: table-cell;
  vertical-align: top;
  float: none;
  margin: 0;
  color: #8197a4;
}
.detailsCrew {
  margin-left: 30px;
}
.activeRelated {
  border-bottom: 2px solid #fff;
  color: #fff;
}
.tabHeading {
  position: absolute;
  display: flex;
  justify-content: space-between;
  min-width: 250px;
  text-align: center;
  margin-left: 40%;
  top: 115% !important;
  color: gray;
  font-size: 25px;
  cursor: pointer;
}
.banner {
  transition: 0.3s;
  margin: 20px;
  position: absolute;
  width: 98.5%;
  top: 125%;
  height: 30%;
}
.detail {
  margin: 20px;
  position: absolute;
  width: 98.5%;
  top: 125%;
  height: 30%;
}
.activeRelated {
  border-bottom: 2px solid white;
  color: white;
}
.detailsCrew {
  margin-left: 30px;
}
.term-of-use span {
  font-size: 17px;
  line-height: 24px;
  cursor: pointer;
}
.term-of-use {
  color: #8197a4;
  margin-bottom: 24px;
}
.term-of-use a {
  color: #79b8f3;
  text-decoration: none;
}
.button-plus {
  border-radius: 50%;
  width: 54px !important;
  height: 54px !important;
  color: #fff;
  background-color: #425265;
}
.button-plus:hover {
  text-decoration: none;
  background-color: #384556;
  outline: none;
  color: #fff;
}
.button-play {
  cursor: pointer;
  width: 132px !important;
  height: 68px;
  background-color: #0f79af;
  color: #fff;
}
.button-play:hover {
  background-color: #36b0ee;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  color: #fff !important;
}
.button-play:active {
  background-color: #36b0ee;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
}
.fa-play {
  color: #fff;
}
.movieInfo {
  position: absolute;
  left: 0;
  color: #fff;
  margin-left: 30px;
}
.title2 {
  font-size: 40px;
  margin-top: 10px;
  font-weight: 400;
}
.overview2 {
  margin-top: 20px;
  width: 600px;
  font-size: 16px;
  line-height: 1.5;
}
.moviefooterScreen {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  width: 400px;
}
.movierating {
  color: #a9a9a9;
  font-size: 15px;
}
.movierunTime {
  color: #a9a9a9;
  font-size: 15px;
}
.moviereleaseYear {
  font-size: 15px;
  color: grey;
  margin-bottom: 15px;
}
.movierated {
  border: 1px solid #a9a9a9;
  color: #a9a9a9;
  font-size: 12px;
  padding: 3px;
  height: 10px;
}
.buttonGroup {
  display: flex;
  align-items: center;
  width: 750px;
  padding: 0 auto;
}
.people {
  min-width: 43%;
  display: grid;
  grid-template-columns: 1.3fr 10.7fr;
  text-align: left;
  margin-top: 40px;
  grid-row-gap: 7px;
  line-height: 1.5;
}
.peopleHeading {
  color: #8197a4;
  font-weight: 700;
}
.peopleVal {
  color: #90dffe;
}
.divImage1,
.imageDiv {
  position: absolute;
  right: 0 !important;
  top: 0;
  left: 69.5%;
  z-index: 1;
  min-width: 100% !important;
}
.imageDiv {
  z-index: 0;
  height: 100%;
  overflow: hidden;
  padding: 0;
}
.trailerDiv {
  z-index: 0;
  height: 100%;
  overflow: hidden;
  padding: 0;
}
.divImage1 {
  height: 90%;
  background: linear-gradient(90deg, #0f171e 15%, rgba(15, 23, 30, 0.411));
}
.movie_image {
  position: absolute;
  object-fit: cover;
  width: 100%;
  top: 0;
  min-height: 90%;
  z-index: -1;
}
</style>