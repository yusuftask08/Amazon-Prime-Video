<template>
  <div>
    <div>
      <Slider :data="popularMovieList" />
    </div>
    <div class="ml-5 mt-5">
      <CategoryMovies />
    </div>
    <Footer v-if="!$route.meta.hideNavbar" />
  </div>
</template>

<script>
import Slider from "@/components/Home/Slider/index.vue";
import CategoryMovies from "@/components/Home/CategoryMovies/index.vue";
import Footer from "@/components/Home/Footer/index.vue";
import { MOVIE_POPULAR_RATED } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Movies",
  components: {
    Slider,
    CategoryMovies,
    Footer,
  },
  methods: {
    init() {
      this.$store.dispatch(MOVIE_POPULAR_RATED, true);
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      popularMovieList: "getPopularMovieList",
    }),
  },
};
</script>

<style>
</style>