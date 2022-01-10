<template>
  <div>
    <youtube
      :video-id="videoId"
      ref="youtube"
      :player-vars="playerVars"
      @playing="playing"
      height="500"
    />
  </div>
</template>

<script>
export default {
  props: ["videoId"],
  data() {
    return {
      playerVars: {
        autoplay: 1,
      },
    };
  },
  methods: {
    async playing(e) {
      await e.mute();
      await e.playVideo();
      this.$emit("readyVideo", true);
    },
  },
  created() {},
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
};
</script>

<style>
iframe {
  width: 100%;
  min-width: 100%;
  /* height: 490px; */
  overflow: hidden;
}
</style>