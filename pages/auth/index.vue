<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Login / Signup</v-toolbar-title>
      </v-toolbar>
      <div>
        <div class="d-flex flex-column ma-4 mt-8">
          <span class="m-fs-t">ALMOST THERE</span>
          <span class="m-fs-s">Login/ Create account quickly</span>
          <v-text-field
            class="mt-8"
            autofocus
            prefix="+91"
            label="Mobile No."
            autocomplete="off"
            v-model="mobile"
            :loading="loading"
            type="tel"
          ></v-text-field>
          <v-expand-transition>
            <div v-show="showOtpInput">
              <v-text-field autofocus label="Enter OTP" v-model="otp" type="tel" autocomplete="off"></v-text-field>
              <div class="d-flex align-center">
                <span class="m-fs-s">Didn't receive the OTP?</span>
                <v-btn text class="accent--text" :disabled="resendDisabled" @click="sendOTP">RESEND</v-btn>
                <span class="accent--text" v-if="resendDisabled">{{countDown}}</span>
              </div>
              <v-text-field
                class="mt-4"
                v-model="name"
                :loading="loading"
                label="Enter full name"
                v-if="isNewUser"
              ></v-text-field>
              <v-btn
                class="mt-8"
                color="accent"
                block
                v-if="otp.length == 6 && !nameChecker()"
                :loading="loading"
                @click="verifyOTP"
              >VERIFY AND PROCEED</v-btn>
            </div>
          </v-expand-transition>
          <v-fade-transition>
            <v-btn
              v-show="!showOtpInput && mobile.length == 10"
              outlined
              class="accent white--text mt-8"
              @click="sendOTP"
              :loading="loading"
            >CONTINUE</v-btn>
          </v-fade-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isMobile",
  layout: "mobile",
  data() {
    return {
      mobile: "",
      otp: "",
      name: "",
      resendDisabled: true,
      countDown: 25,
      isNewUser: false,
      loading: false,
      showOtpInput: false
    };
  },
  methods: {
    nameChecker() {
      if (this.isNewUser && this.name.length < 5) {
        return true;
      } else {
        return false;
      }
    },
    async sendOTP() {
      this.loading = true;
      this.resendDisabled = true;
      //let res = await this.$axios.$get("/otp/request/" + this.mobile);
      let res = { success: true, isNewUser: false };
      console.log(res);
      this.loading = false;
      if (res.success) {
        this.isNewUser = res.isNewUser;
        this.showOtpInput = true;
      } else {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Something went wrong! Retry Again.",
          color: "red"
        });
      }
      this.countDownTimer();
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDown = 25;
        this.resendDisabled = false;
      }
    },
    async verifyOTP() {
      this.loading = true;
      let res = await this.$store.dispatch("authorize", {
        username: this.mobile,
        password: this.otp + "~" + this.name
      });
      this.loading = false;
      if (res) {
        this.$router.go(-1);
      } else {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Invalid OTP!",
          color: "red"
        });
      }
    }
  }
};
</script>
<style lang="scss">
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px 0 0;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
  &:focus {
    border: 1px solid var(--v-accent);
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>