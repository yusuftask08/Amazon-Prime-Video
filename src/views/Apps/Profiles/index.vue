<template>
  <div>
    <div class="profiles-page">
      <div class="pt-3 page-title">
        <router-link to="/">
          <span class="text-white ml-5 mt-5 logo"> prime video </span>
        </router-link>
      </div>
      <div class="who-is-watching d-flex justify-content-center py-5">
        <span class="text-white font-weight-bold h2">Kim izliyor?</span>
      </div>
      <div class="user d-flex justify-content-center">
        <router-link to="/">
          <div class="user-image d-flex flex-column align-items-center">
            <img
              src="https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-1.png"
              alt=""
            />
            <span class="user-name text-white mt-2 font-weight-bolder h5">{{
              name
            }}</span>
          </div></router-link
        >

        <div class="user-image d-flex flex-column align-items-center ml-4">
          <button
            type="button"
            class="btn button-plus"
            style="
              width: 200px !important;
              height: 200px !important;
              margin-top: 0px !important;
            "
          >
            <i class="fas fa-plus fa-4x"></i>
          </button>
          <span class="user-name text-white mt-2 font-weight-bolder h5"
            >Yeni ekle</span
          >
        </div>
      </div>
    </div>
    <footer id="pv-footer" class="DVWebNode-footer-wrapper DVWebNode pv-footer">
      <div class="pv-brand-logo"></div>
      <ul>
        <li>
          <a href="/ww-av-legal-home/ref=atv_ftr_ter" class="_1NNx6V"
            >Koşullar ve Gizlilik Bildirimi</a
          >
        </li>
        <li>
          <a href="/contactus/ref=atv_ftr_cu" class="_1NNx6V"
            >Geri bildirimde bulunun</a
          >
        </li>
        <li><a href="/help/ref=atv_ftr_hp" class="_1NNx6V">Yardım</a></li>
        <li>
          <a
            href="/help/ref=atv_hp_nd_cnt?nodeId=GZVH7DTWNBGPRPDS"
            class="_1NNx6V"
            >Çerez Bildirimi</a
          >
        </li>
        <li>© 1996-2022, Amazon.com, Inc. veya bağlı kuruluşları</li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("name"),
    };
  },
  beforeCreate() {
    document
      .querySelector(".navbar")
      .setAttribute("style", "display:none!important");
  },
  beforeDestroy() {
    document.querySelector(".navbar").setAttribute("style", "display:block");
  },
};
</script>

<style>
.user-image img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-image img:hover {
  box-shadow: 0 0 0 3px #fff;
  transition: opacity 0.2s ease-in-out, border 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    outline 0.2s ease-in-out;
}
.user-image button:hover {
  box-shadow: 0 0 0 3px #fff;
  transition: opacity 0.2s ease-in-out, border 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out, color 0.2s ease-in-out,
    outline 0.2s ease-in-out;
}
.logo {
  font-weight: 700;
  line-height: 24px;
  font-size: 24px;
}
.page-title a {
  text-decoration: none;
}
.profiles-page {
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
  height: 85vh;
}
</style>