<template>
  <div style="padding-top: 56px; height:100%;">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon to="/checkout/review" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Apply Coupon</v-toolbar-title>
      </v-toolbar>
      <div>
        <v-card class="grey lighten-4" elevation="0">
          <v-card-text>
            <v-text-field
              solo
              label="Enter Coupon Code"
              v-model="couponCode"
              autofocus
              @keyup="upperCase"
              :loading="loadingCheck"
            >
              <template v-slot:append>
                <v-btn
                  :disabled="couponCode.length == 0"
                  :loading="loadingCheck"
                  text
                  color="accent"
                  @click="checkCoupon(couponCode)"
                >APPLY</v-btn>
              </template>
            </v-text-field>
            <span class="m-fs-s">Available Coupons</span>
          </v-card-text>
        </v-card>
        <v-card :loading="loading" elevation="0">
          <v-card-text>
            <div v-for="coupon in coupons" :key="coupon.id">
              <v-row align="center" justify="space-between" no-gutters>
                <span class="m-fs-t">{{coupon.coupon_code}}</span>
                <v-btn text color="accent" @click="checkCoupon(coupon.coupon_code)">APPLY</v-btn>
              </v-row>
              <p class="m-fs-s">{{coupon.description}}</p>
              <v-divider></v-divider>
            </div>
          </v-card-text>
        </v-card>
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
      couponCode: "",
      coupons: [],
      showCouponComponent: true,
      loading: false,
      loadingCheck: false
    };
  },
  methods: {
    upperCase() {
      this.couponCode = this.couponCode.toUpperCase();
    },
    async checkCoupon(couponCode) {
      this.couponCode = couponCode;
      this.loadingCheck = true;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      const res = await this.$axios.$get("/coupon/check/" + this.couponCode);
      if (res.coupon) {
        this.$store.dispatch("addOrderCouponId", res.coupon.id);
        this.$store.dispatch("addCoupon", res.coupon);
        this.$router.go(-1);
      } else {
        //todo:toast
        this.couponCode = "";
        alert("Invalid Coupon!");
      }
      this.loadingCheck = false;
    }
  },
  async created() {
    this.loading = true;
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get("/coupon");
    this.coupons = res.coupons;
    this.loading = false;
  }
};
</script>