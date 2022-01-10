<template>
  <div class="loginPage">
    <div class="d-flex flex-row justify-content-center">
      <div class="row">
        <div class="col-md">
          <img class="img" src="@/assets/prime.png" alt="amazon-logo" />
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-content-center">
      <div class="row">
        <div class="col-md">
          <!-- Card -->
          <form>
            <div class="sign-in">
              {{ title }}
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" style="font-weight: 700">{{
                label
              }}</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
                v-model="user.email"
              />
              <small class="form-text text-muted" />
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="exampleInputPassword1" style="font-weight: 700"
                  >Şifre</label
                >
                <a href="" class="" v-if="!signUp">Şifremi unuttum</a>
              </div>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder=""
              />
              <div class="form-group">
                <button
                  @click="sendData"
                  type="button"
                  class="btn btn-warning"
                  id="sign-in"
                >
                  {{ buttonText }}
                </button>
              </div>
              <div class="info" v-if="!signUp">
                Oturum açarak, Amazon'un
                <a class="a-link">Kullanım ve Satış Koşulları'nı</a> kabul etmiş
                olursunuz. Kişisel verilerinizin Amazon tarafından nasıl
                işlendiğine ilişkin detaylı bilgi için
                <a class="a-link"> Gizlilik Bildirimi</a>,
                <a class="a-link">Çerez Bildirimi</a> ve
                <a class="a-link">İlgi Alanına Dayalı Tanıtımları</a>
                inceleyebilirsiniz.
              </div>
              <div class="info" v-else>
                Bir hesap oluşturduğunuzda, Amazon'un
                <a class="a-link">Kullanım ve Satış Koşulları'nı</a> kabul etmiş
                olursunuz. Daha fazla bilgi için <a>Gizlilik Bildirimi</a>,
                <a class="a-link">Çerez Bildirimi</a> ve
                <a class="a-link">İlgi Alanına Dayalı Tanıtımları</a>
                inceleyebilirsiniz.
              </div>
              <div
                class="d-flex align-content-center justify-center mt-2"
                v-if="!signUp"
              >
                <input
                  type="checkbox"
                  class="form-check-input checkbox"
                  id="exampleCheck1"
                />
                <p class="keep-sign-in">
                  Oturumum açık kalsın.
                  <a class="a-link ml-1"> Ayrıntılar </a>
                </p>
                <i class="fas fa-sort-down ml-2 mt-2" style="color: grey" />
              </div>
            </div>
            <div class="flex-column">
              <div
                class="a-divider a-divider-break d-flex justify-content-center"
                :style="!signUp ? '' : 'margin-top:20px;margin-bottom:5px;'"
              >
                <h5
                  :style="
                    !signUp ? 'margin-bottom:0px' : 'margin-bottom:-20px;'
                  "
                >
                  {{ isAuth }}
                </h5>
              </div>
              <button
                type="button"
                class="btn btn-sign-up btn-warning"
                id="grey-button"
                @click="signUp = !signUp"
              >
                {{ isAuthButton }}
              </button>
            </div>
          </form>
          <!-- Card -->
        </div>
      </div>
    </div>
    <!--Footer-->
    <div class="a-divider-inner mt-4" />
    <div class="d-flex justify-content-center footer">
      <div>
        <div class="col">
          <a class="a-link mr-5">Kullanım Koşulları </a>
          <a class="a-link mr-5">Gizlilik Bildirimi </a>
          <a class="a-link ml-2">Yardım </a>
        </div>
        <div>
          <span class="d-flex justify-content-center mt-2 lead">
            <small>
              © 1996-2021, Amazon.com, Inc. veya bağlı ortaklıkları</small
            >
          </span>
        </div>
      </div>
    </div>
    <!-- Footer -->
  </div>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
export default {
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#fff");
  },
  beforeDestroy() {
    document.querySelector("body").setAttribute("style", "");
  },
  data() {
    return {
      user: {
        password: "",
        email: "",
      },
      signUp: false,
    };
  },
  methods: {
    sendData() {
      this.$store
        .dispatch(LOGIN, {
          data: this.user,
          signUp: this.signUp,
        })
        .then((_) => {
          this.$router.push("/");
        });
    },
  },
  computed: {
    title() {
      return this.signUp ? "Hesap Oluşturun" : "Giriş yap";
    },
    buttonText() {
      return this.signUp ? "Amazon hesabınızı oluşturun" : "Giriş yap";
    },
    label() {
      return this.signUp ? "E-posta" : "E-posta adresi veya telefon numarası";
    },
    isAuth() {
      return this.signUp
        ? "Zaten bir hesabınız var mı?"
        : "Amazon hesabınız yok mu?";
    },
    isAuthButton() {
      return this.signUp ? "Giriş yap" : "Amazon hesabınızı oluşturun";
    },
  },
};
</script>

<style>
</style>