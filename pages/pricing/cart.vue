<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Cart</v-toolbar-title>
      </v-toolbar>
      <div>
        <v-list class="pa-0">
          <template v-for="(rate,i) in selectedRates">
            <v-list-item :key="rate.id">
              <v-list-item-content>
                <v-list-item-title class="m-fs-t">{{rate.label}}</v-list-item-title>
                <v-list-item-subtitle
                  class="m-fs-s"
                >{{ '&#8377; ' + rate.rate + '/' + rate.rate_unit}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div class="d-flex align-center">
                  <div
                    class="d-flex grey lighten-4 mx-auto tile align-center justify-space-between v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--light v-size--default"
                  >
                    <v-icon @click="rate.count = --rate.count">mdi-minus-box</v-icon>
                    <div class="text-lowercase mx-2">{{rate.count}}{{rate.rate_unit}}</div>
                    <v-icon @click="rate.count = ++rate.count">mdi-plus-box</v-icon>
                  </div>
                  <div class="ml-2 m-fs-t">&#8377; {{rate.count * rate.rate}}</div>
                </div>
              </v-list-item-action>
            </v-list-item>
            <v-list-item :key="rate.id + '-AW'" v-if="rate.antisepticWash">
              <v-list-item-content>
                <v-list-item-title class="m-fs-t">Antiseptic Wash : &#8377; 5 / kg</v-list-item-title>
                <v-list-item-subtitle class="m-fs-s">Remove 99.9% Germs</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="m-fs-t">&#8377; {{rate.count * 5}}</v-list-item-action>
            </v-list-item>
            <v-list-item :key="rate.id + '-FS'" v-if="rate.fabricSoftener">
              <v-list-item-content>
                <v-list-item-title class="m-fs-t">Fabric Softener : &#8377; 5 / kg</v-list-item-title>
                <v-list-item-subtitle class="m-fs-s">Unbeatable shine & fragrance</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="m-fs-t">&#8377; {{rate.count * 5}}</v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider'+rate.id" class="mx-4" v-if="i < rateLength-1"></v-divider>
          </template>
        </v-list>
        <div style="border-top:16px solid #f2f4f6;">
          <v-list-item v-if="!$store.state.order.couponId" to="/checkout/coupon">
            <v-list-item-icon>
              <v-icon>mdi-offer</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="m-fs-t">Apply Coupon</v-list-item-title>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list two-line v-else>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-offer</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="m-fs-t">{{$store.state.coupon.coupon_code}}</v-list-item-title>
                <v-list-item-subtitle class="m-fs-s">{{$store.state.coupon.description}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="$store.dispatch('addOrderCouponId', null)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>
        <div style="border-top:16px solid #f2f4f6;">
          <div class="ma-4">
            <div class="m-fs-t">Bill Details</div>
            <div class="d-flex justify-space-between align-center mt-4">
              <div class="m-fs-s">Sub Total</div>
              <div class="m-fs-t">&#8377; {{subTotal}}</div>
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">GST (18%)</div>
              <div class="m-fs-t">&#8377; {{gst}}</div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="couponDiscount > 0">
              <div class="m-fs-s">Discount</div>
              <div class="m-fs-t">&#8377; {{couponDiscount}}</div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="expressCharge > 0">
              <div class="m-fs-s">Express Charge</div>
              <div class="m-fs-t">&#8377; {{expressCharge}}</div>
            </div>
            <v-divider class="my-4" />
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">Total</div>
              <div class="m-fs-t">&#8377; {{total}}</div>
            </div>

            <v-divider class="my-4" />
            <div class="d-flex align-center justify-center">
              <div class="m-fs-s">Minimum Bill Amount is &#8377; 250</div>
            </div>
          </div>
        </div>
      </div>
      <v-btn
        class="ss-bottom-toolbar accent elevation-8"
        @click="handleCheckoutClick"
        block
        height="52px"
        tile
      >
        Book
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  layout: "mobile",
  middleware: ["isMobile"],
  validate({ store, redirect }) {
    if (store.state.rates.length > 0) return true;
    else redirect("/pricing");
  },
  computed: {
    subTotal() {
      let price = 0;
      for (let i = 0; i < this.rateLength; i++) {
        price += this.selectedRates[i].count * this.selectedRates[i].rate;
        if (
          this.selectedRates[i].id == 1 ||
          this.selectedRates[i].id == 2 ||
          this.selectedRates[i].id == 3
        ) {
          if (this.selectedRates[i].antisepticWash)
            price += 5 * this.selectedRates[i].count;
          if (this.selectedRates[i].fabricSoftener)
            price += 5 * this.selectedRates[i].count;
        }
      }
      return +price.toFixed(2);
    },
    gst() {
      return +(this.subTotal * 0.18).toFixed(2);
    },
    couponDiscount() {
      let discount = 0;
      if (this.$store.state.order.couponId) {
        switch (this.$store.state.coupon.discount_type) {
          case "percentage":
            discount =
              (this.subTotal * this.$store.state.coupon.discount_value) / 100 >
              100
                ? 100
                : (this.subTotal * this.$store.state.coupon.discount_value) /
                  100;
            break;
          case "flat":
            discount =
              this.$store.state.coupon.discount_value > 100
                ? 100
                : this.$store.state.coupon.discount_value;
            break;
          case "launch":
            discount =
              (this.subTotal * this.$store.state.coupon.discount_value) / 100;
            break;
          default:
            break;
        }
      }
      return +discount.toFixed(2);
    },
    expressCharge() {
      let price = 0;
      if (
        this.$store.state.order.couponId &&
        this.$store.state.coupon.discount_type == "express"
      ) {
        price = (this.subTotal * this.$store.state.coupon.discount_value) / 100;
      }
      return +price.toFixed(2);
    },
    total() {
      let amt = Math.round(
        this.subTotal + this.gst + this.expressCharge - this.couponDiscount
      );
      if (amt > 250) {
        return amt;
      } else {
        return 250;
      }
    },
    rateLength() {
      return this.selectedRates.length;
    },
    selectedRates() {
      let _rates = [];
      let l = this.rates.length;
      for (let i = 0; i < l; i++) {
        if (this.rates[i].count > 0) {
          _rates.push(this.rates[i]);
        }
      }
      return _rates;
    }
  },
  data() {
    return {
      rates: JSON.parse(JSON.stringify(this.$store.state.rates))
    };
  },
  methods: {
    handleCheckoutClick() {
      let serviceIds = [];
      let addonIds = [];
      for (let i = 0; i < this.rateLength; i++) {
        if (this.selectedRates[i].id > 3 && serviceIds.indexOf(4) == -1) {
          serviceIds.push(4);
        } else {
          serviceIds.push(this.selectedRates[i].id);
        }
        if (this.selectedRates[i].antisepticWash) {
          addonIds.push(this.selectedRates[i].id + "-" + 1);
        }
        if (this.selectedRates[i].fabricSoftener) {
          addonIds.push(this.selectedRates[i].id + "-" + 2);
        }
      }
      this.$store.dispatch("addOrderServices", serviceIds);
      this.$store.dispatch("addOrderAddons", addonIds);
      this.$router.push("/checkout/pickup-timeslot");
    }
  }
};
</script>