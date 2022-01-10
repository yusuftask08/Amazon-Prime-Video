<template>
  <div>
    <footer class="pv-footer">
      <img class="pv-brand-logo" src="@/assets/Prime_video.png" alt="" />
      <ul>
        <li v-for="item in footerList" :key="item.id">
          <a href="#" class="_1NNx6V">{{ item.name }}</a>
        </li>
        <li>© 1996-2021, Amazon.com, Inc. veya bağlı kuruluşları</li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerList: [
        { id: 0, name: "Koşullar ve Gizlilik Bildirimi", href: "#" },
        { id: 1, name: "Geri bildirimde bulunun", href: "#" },
        { id: 2, name: "Yardım", href: "#" },
        { id: 3, name: "Çerez Bildirimi", href: "#" },
      ],
    };
  },
};
</script>

<style>
html ol,
html ul {
  list-style: none;
}
._1NNx6V {
  color: #79b8f3;
  -webkit-transition: color 0.2s ease-in-out;
  transition: color 0.2s ease-in-out;
  text-decoration: none;
}
._1NNx6V:hover {
  text-decoration: none;
  color: #90dffe;
}

.pv-footer ul {
  margin: 0;
  padding: 0;
}
.pv-footer ul li {
  display: inline-block;
  white-space: normal;
  padding: 4px;
  color: #8197a4;
}
.pv-footer .pv-brand-logo {
  width: 107px;
  height: 32px;
  vertical-align: bottom;
  top: 0;
}
.pv-footer {
  position: static;
  bottom: 0;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  padding: 24px;
  margin: 0 auto;
  width: 100%;
  color: #8197a4;
  background-color: #0f171e;
  -webkit-font-smoothing: antialiased;
}
</style>