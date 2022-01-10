<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/">
          <img
            src="@/assets/Prime_video.png"
            alt=""
            width="120"
            height="40"
            class="d-inline-block align-text-top ml-4 mx-2 my-3"
          />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link"> Anasayfa </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tv" class="nav-link"> TV Dizileri </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/movies" class="nav-link"> Filmler </router-link>
            </li>
            <li class="nav-item">
              <span
                class="nav-link caret"
                style="cursor: pointer"
                @mouseover="dropdownCategories = true"
              >
                Kategoriler
              </span>
            </li>
            <div
              v-if="dropdownCategories"
              class="dropdownCategories"
              @mouseleave="dropdownCategories = false"
            >
              <div class="container text-white" style="padding: 0px !important">
                <div class="col-lg-6">
                  <h5 class="categories-title">En iyi kategoriler</h5>
                  <div class="categories">
                    <div class="cat_block cat_block--a">
                      <ul class="cat_panels">
                        <li
                          v-for="item in bestCategories"
                          :key="item.id"
                          class="categories-top-li"
                          :style="{
                            'background-image': 'url(' + item.images + ')',
                          }"
                          style="background-color: rgb(40, 72, 103)"
                        >
                          <a
                            :href="item.href"
                            class="categories-a"
                            @click="sendGenreData(item)"
                            >{{ item.name }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-1 text-white">
                  <div class="cat_separator" />
                </div>
                <div class="col-lg-5 d-flex categories">
                  <div class="cat_block--child flex-start">
                    <h5>Türler</h5>
                    <ul class="cat_columns--2">
                      <li
                        class="categories-li"
                        v-for="item in GenreList"
                        :key="item.id"
                      >
                        <a
                          @click="sendGenreData(item)"
                          class="categories-a-link"
                        >
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="cat_block--child">
                    <h5 class="categories-right-title">Diğer kategoriler</h5>
                    <ul class="cat_columns--3">
                      <li
                        class="categories-li"
                        v-for="otherItem in otherCategories"
                        :key="otherItem.id"
                      >
                        <a :href="otherItem.href" class="categories-a-link"
                          >{{ otherItem.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ul>
          <div class="input-group my-2 mr-2" style="width: 250px">
            <div
              class="input-group-prepend"
              style="background-color: transparent"
            >
              <span
                class="input-group-text"
                id="inputGroup-sizing-default"
                style="
                  background-color: transparent;
                  border: 1px solid rgba(129, 151, 164, 0.5);
                  border-right: none !important;
                  border-radius: 0px !important;
                "
              >
                <i
                  class="fas fa-search"
                  style="
                    color: #8197a4;
                    background-color: rgba(15, 23, 30, 0.2);
                  "
                >
                </i>
              </span>
            </div>
            <input
              style="
                border: 1px solid rgba(129, 151, 164, 0.5);
                background-color: transparent;
                border-left: none !important;
                caret-color: white;
                color: #fff;
                border-radius: 0px !important;
              "
              v-model="query"
              type="text"
              @keydown.enter="search"
              placeholder="Ara"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <div class="dropdown mr-4">
            <img
              src="https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-1.png"
              alt=""
              style="width: 32px; height: 32px; cursor: pointer"
            />
            <span
              @click="dropdown = !dropdown"
              class="dropdown-toggle text-light mr-2"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="cursor: pointer"
            >
              {{ name }}
            </span>
            <div
              v-if="dropdown"
              class="dropdown-menu d-flex"
              aria-labelledby="dropdownMenuButton"
            >
              <div class="left" @mouseleave="dropdown = false">
                <li
                  role="menuitem mb-2"
                  v-for="item in dropdownLeftList"
                  :key="item.id"
                  @click="item.action"
                >
                  <router-link :to="item.href">{{ item.name }}</router-link>
                </li>
              </div>
              <div class="right">
                <li class="profile-item nav-profiles-menu-active-profile">
                  <label for="input-profile-0">
                    <li>
                      <img
                        src="https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-1.png"
                        alt=""
                        style="width: 32px; height: 32px; cursor: pointer"
                      />
                      <router-link to="/"> {{ name }}</router-link>
                    </li>
                  </label>
                </li>
                <li class="profile-item nav-profiles-menu-active-profile">
                  <label for="input-profile-1">
                    <li>
                      <img
                        src="https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/kid-1.png"
                        style="width: 32px; height: 32px; cursor: pointer"
                      />
                      <router-link to="/" class="ml-1">Çocuklar </router-link>
                    </li>
                  </label>
                </li>
                <li class="d-flex align-content-center new-add">
                  <i
                    class="fas fa-plus-circle mr-1"
                    style="font-size: 32px !important"
                  >
                  </i>
                  <router-link to="/profiles" class="mt-1">
                    <span> Yeni ekle</span>
                  </router-link>
                </li>
                <li class="mt-2 ml-2">
                  <router-link to="/profiles">Profilleri düzenle</router-link>
                </li>
                <li class="mt-2 ml-2">
                  <router-link to="/">Daha fazla bilgi edinin </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  MOVIE_GENRE_LIST,
  GENRE_ID_GET_MOVIES,
  SEARCH_QUERY,
} from "@/store/actions.type";
import { LOGOUT } from "@/store/mutations.type";
export default {
  data() {
    return {
      dropdownCategories: false,
      active: false,
      dropdown: false,
      name: localStorage.getItem("name"),
      query: "",
      bestCategories: [
        {
          id: 28,
          name: "Amazon Orjinal İçerikleri",
          images:
            "https://m.media-amazon.com/images/G/01/digital/video/web_cats/Amazon-Originals.png",
        },
        {
          id: 16,
          name: "Çocuk",
          images:
            "https://m.media-amazon.com/images/G/01/digital/video/web_cats/Included-With-Prime.png",
        },
        {
          id: 27,
          name: "Son Eklenen Filmler",
          images:
            "https://m.media-amazon.com/images/G/01/digital/video/web_cats/Movies.png",
        },
        {
          id: 10770,
          name: "Son Eklenen TV İçerikleri",
          images:
            "https://m.media-amazon.com/images/G/01/digital/video/web_cats/TV-Shows.png",
        },
      ],
      otherCategories: [
        { id: 0, name: "Ödül kazananlar", href: "/" },
        { id: 1, name: "Yalnızca sınırlı bir süre için Prime’da", href: "/" },
      ],
      dropdownLeftList: [
        { id: 0, name: "İzleme Listeniz", href: "/watch-list", action: "" },
        { id: 1, name: "Hesap ve Ayarlar", href: "/profiles", action: "" },
        {
          id: 2,
          name: "Nerede İsterseniz Orada İzleyin",
          href: "/",
          action: "",
        },
        { id: 3, name: "Yardım", href: "/", action: "" },
        {
          id: 4,
          name: `${localStorage.getItem("name")}.. degil misiniz? Çıkış Yap`,
          href: "/login",
          action: function () {
            localStorage.clear();
          },
        },
      ],
    };
  },
  methods: {
    sendGenreData(e) {
      localStorage.setItem("category-name", e.name);
      this.$store.dispatch(GENRE_ID_GET_MOVIES, e).then((_) => {
        this.$router.push({ path: `/search/${e.name}` });
        localStorage.removeItem("query");
        this.query = "";
      });
    },
    search() {
      this.$store.dispatch(SEARCH_QUERY, this.query);
      localStorage.setItem("query", this.query);
      if (this.$route.fullPath !== "/search") {
        this.$router.push({ path: "/search" });
      } else return;
    },
    init() {
      this.$store.dispatch(MOVIE_GENRE_LIST);
    },
  },
  computed: {
    ...mapGetters({
      GenreList: "setGenreList",
    }),
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>