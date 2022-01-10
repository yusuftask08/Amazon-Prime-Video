<template>
  <div>
    <div>
      <Slider :data="tvTopRated" />
    </div>
    <div class="ml-5 mt-5">
      <CategoryTV />
    </div>
    <Footer v-if="!$route.meta.hideNavbar" />
  </div>
</template>

<script>
import Slider from "@/components/Home/Slider/index.vue";
import CategoryTV from "@/components/Home/CategoryTV/index.vue";
import Footer from "@/components/Home/Footer/index.vue";
import { TV_POPULAR_RATED } from "@/store/actions.type";
import { mapGetters } from "vuex";
export default {
  name: "Movies",
  components: {
    Slider,
    CategoryTV,
    Footer,
  },
  methods: {
    init() {
      this.$store.dispatch(TV_POPULAR_RATED);
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      tvTopRated: "setTvTopRated",
    }),
  },
};
</script>

<style>
</style>