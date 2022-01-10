<template>
  <div>
    <Card
      :data="setTvTopRated"
      :showSeeMore="true"
      :contentName="'Amazon Orjinal ve Özel İçerikler'"
    />
    <Card :data="Comedy" :showSeeMore="true" :contentName="'Komedi TV'" />
    <Card :data="Action" :showSeeMore="true" :contentName="'Aksiyon TV'" />
    <Card :data="Horror" :showSeeMore="true" :contentName="'Korku TV'" />
    <Card :data="Thriller" :showSeeMore="true" :contentName="'Gerilim TV'" />
    <Card :data="Crime" :showSeeMore="true" :contentName="'Suç Konulu TV'" />
    <Card :data="Drama" :showSeeMore="true" :contentName="'Drama TV'" />
    <Card :data="Adventure" :showSeeMore="true" :contentName="'Macera FTV'" />
  </div>
</template>

<script>
import Card from "@/components/Home/Card/index.vue";
import { mapGetters } from "vuex";
import { GET_CATEGORY_MOVIES } from "@/store/actions.type";

export default {
  components: { Card },
  methods: {
    init() {
      this.$store.dispatch(GET_CATEGORY_MOVIES, "true");
    },
  },
  computed: {
    ...mapGetters({
      setTvTopRated: "setTvTopRated",
      Comedy: "setComedy",
      Action: "setAction",
      Horror: "setHorror",
      Thriller: "setThriller",
      Crime: "setCrime",
      Drama: "setDrama",
      Adventure: "setAdventure",
    }),
  },
  created() {
    this.init();
  },
};
</script>

<style>
</style>