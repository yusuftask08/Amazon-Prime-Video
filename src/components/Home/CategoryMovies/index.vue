<template>
  <div>
    <Card
      :data="PopularMovieList"
      :showSeeMore="true"
      :contentName="'Amazon Orjinal ve Özel İçerikler'"
    />
    <Card :data="Comedy" :showSeeMore="true" :contentName="'Komedi Filmler'" />
    <Card :data="Action" :showSeeMore="true" :contentName="'Aksiyon Filmler'" />
    <Card :data="Horror" :showSeeMore="true" :contentName="'Korku Filmler'" />
    <Card
      :data="Thriller"
      :showSeeMore="true"
      :contentName="'Gerilim Filmler'"
    />
    <Card
      :data="Crime"
      :showSeeMore="true"
      :contentName="'Suç Konulu Filmler'"
    />
    <Card :data="Drama" :showSeeMore="true" :contentName="'Drama Filmler'" />
    <Card
      :data="Adventure"
      :showSeeMore="true"
      :contentName="'Macera Filmleri'"
    />
  </div>
</template>

<script>
import Card from "@/components/Home/Card/index.vue";
import TrailerCard from "@/components/Home/Card/TrailerCard/index.vue";
import { mapGetters } from "vuex";
import { GET_CATEGORY_MOVIES } from "@/store/actions.type";

export default {
  components: { Card, TrailerCard },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch(GET_CATEGORY_MOVIES);
    },
  },
  computed: {
    ...mapGetters({
      PopularMovieList: "setPopularMovieList",
      Comedy: "setComedy",
      Action: "setAction",
      Horror: "setHorror",
      Thriller: "setThriller",
      Crime: "setCrime",
      Drama: "setDrama",
      Adventure: "setAdventure",
    }),
  },
};
</script>

<style>
</style>