<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container d-print-none">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Invoice #{{$route.params.id}}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending || loading" class="d-flex align-center justify-center">
          <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
          <div class="m-fs-t">Invalid Booking</div>
        </div>
        <div v-else>
          <div>
            <v-card flat>
              <v-card-title>
                <span class="mx-auto">Tax Invoice</span>
              </v-card-title>
              <v-card-text>
                <v-row class="flex-column">
                  <v-img
                    src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/company-logo/fabrico.png"
                    max-height="100"
                    max-width="200"
                    class="mx-auto mb-2"
                  />
                  <span class="mx-auto">{{order.franchise.preferences.firm_name}}</span>
                  <span class="mx-auto">{{order.franchise.preferences.firm_address}}</span>
                  <v-row justify="center">
                    <v-icon>mdi-web</v-icon>
                    <span>{{order.franchise.preferences.company_website}}</span>
                    <v-icon class="ml-4">mdi-phone</v-icon>
                    <span>{{order.franchise.preferences.customer_support_no}}</span>
                  </v-row>
                  <span class="mx-auto">GSTIN No.: {{order.franchise.preferences.gstin}}</span>
                </v-row>
              </v-card-text>
            </v-card>
            <div class="d-flex flex-column ma-4">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <span class="m-fs-s">Customer ID:</span>
                  <span class="m-fs-t">{{$store.state.user.id}}</span>
                </div>
                <div>
                  <span class="m-fs-s">Order No.:</span>
                  <span class="m-fs-t">#{{order.id}}</span>
                </div>
              </div>
              <div
                class="m-fs-s text-capitalize"
              >{{$store.state.user.gstin ? $store.state.user.firm_name : $store.state.user.name}}</div>
              <div
                class="m-fs-s text-capitalize"
              >{{$store.state.user.gstin ? $store.state.user.firm_address : (order.address) ? (order.address.plot_no + ',' + order.address.address) : ''}}</div>
              <div
                class="m-fs-s text-capitalize"
                v-if="$store.state.user.gstin"
              >GST No.- {{$store.state.user.gstin}}</div>
              <v-divider />
            </div>
          </div>
          <div v-for="tag in order.tags" :key="tag.id" class="ma-4">
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">{{tag.rate.label}}</div>
              <div>
                &#8377; {{ tag.rate.rate + ' / ' + tag.rate.rate_unit}} x {{ tag.rate.rate_unit == 'pc' ? tag.item_count + ' pc' : (tag.rate.rate_unit == 'kg' ? tag.item_kg + ' kg' : tag.item_sq_ft + ' sq ft') }} =
                <span
                  class="m-fs-t"
                >&#8377; {{tag.rate.rate_unit == 'pc' ? (tag.item_count * tag.rate.rate).toFixed(2) : (tag.rate.rate_unit == 'kg' ? (tag.item_kg * tag.rate.rate).toFixed(2) : (tag.item_sq_ft * tag.rate.rate).toFixed(2)) }}</span>
              </div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="tag.has_antiseptic_wash">
              <div class="m-fs-s">Antiseptic Wash</div>
              <div>
                &#8377; 5 / kg x {{ tag.item_kg + ' kg' }} =
                <span
                  class="m-fs-t"
                >&#8377; {{ (tag.item_kg * 5).toFixed(2) }}</span>
              </div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="tag.has_fabric_softener">
              <div class="m-fs-s">Fabric Softener</div>
              <div>
                &#8377; 5 / kg x {{ tag.item_kg + ' kg' }} =
                <span
                  class="m-fs-t"
                >&#8377; {{ (tag.item_kg * 5).toFixed(2) }}</span>
              </div>
            </div>
            <v-divider />
          </div>
          <div class="ma-4">
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">Sub Total</div>
              <div class="m-fs-t">&#8377; {{subTotal}}</div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="expressAmount > 0">
              <div class="m-fs-s">Express Charge ({{order.coupon.discount_value}}%)</div>
              <div class="m-fs-t">&#8377; {{expressAmount}}</div>
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">GST ({{order.gst}}%)</div>
              <div class="m-fs-t">&#8377; {{gst}}</div>
            </div>
            <div class="d-flex justify-space-between align-center" v-if="couponDiscount > 0">
              <div class="m-fs-s">Discount</div>
              <div class="m-fs-t">&#8377; {{couponDiscount}}</div>
            </div>
            <div class="d-flex justify-space-between align-center">
              <div class="m-fs-s">Total</div>
              <div class="m-fs-t">&#8377; {{total}}</div>
            </div>
          </div>
          <v-btn
            class="ss-bottom-toolbar accent elevation-8"
            block
            height="52px"
            tile
            :disabled="unpaidAmount == 0"
            target="_blank"
            :href="'https://api.fabrico.in/payment/' + $store.state.user.mobile + '/' + order.id"
          >{{unpaidAmount > 0 ? 'Pay Now ( &#8377; ' + unpaidAmount + ' )' : 'Paid'}}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "mobile",
  middleware: "isMobile",
  validate({ params }) {
    //TODO: add integer only validation
    return true;
  },
  async fetch() {
    this.loading = true;
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get(
      "/orders/" + this.$route.params.id + "/invoice"
    );
    this.loading = false;
    if (res.success) this.order = res.order;
    else this.$fetchState.error = res.error;
  },
  data() {
    return {
      order: null,
      loading: false
    };
  },
  computed: {
    subTotal() {
      var _data = 0;
      this.order.tags.forEach(tag => {
        var cRate = parseInt(this.getRate(tag));
        switch (tag.rate.rate_unit) {
          case "pc":
            _data += parseFloat(tag.item_count * cRate);
            break;
          case "kg":
            _data += parseFloat(tag.item_kg * cRate);
            break;
          case "sq_ft":
            _data += parseFloat(tag.item_sq_ft * cRate);
          default:
            break;
        }
      });

      return _data.toFixed(2);
    },
    gst() {
      let gst = parseFloat(this.order.gst);
      var _data = (this.subTotal * gst) / 100;
      return _data.toFixed(2);
    },
    couponDiscount() {
      var discount = 0;
      if (this.order.coupon) {
        switch (this.order.coupon.discount_type) {
          case "percentage":
            discount =
              (this.subTotal * this.order.coupon.discount_value) / 100 > 100
                ? 100
                : (this.subTotal * this.order.coupon.discount_value) / 100;
            break;
          case "flat":
            discount =
              this.order.coupon.discount_value > 100
                ? 100
                : this.order.coupon.discount_value;
            break;
          case "launch":
            discount = (this.subTotal * this.order.coupon.discount_value) / 100;
            break;
          default:
            break;
        }
      }
      return discount.toFixed(2);
    },
    expressAmount() {
      let amt = 0;
      if (this.order.coupon && this.order.coupon.discount_type == "express") {
        amt = (this.subTotal * this.order.coupon.discount_value) / 100;
      }
      return amt.toFixed(2);
    },
    total() {
      var amt = parseFloat(
        parseFloat(this.subTotal) +
          parseFloat(this.gst) -
          parseFloat(this.couponDiscount) +
          parseFloat(this.expressAmount)
      );
      if (amt < 250 && this.order.home_delivery == 1) {
        amt = 250;
      }
      amt = Math.round(amt);
      return amt;
    },
    unpaidAmount() {
      if (this.order.payment_medium_id) {
        let mediums = this.order.payment_medium_id
          .split(",")
          .map(function(item) {
            return item.trim();
          });
        let partialAmt = 0;
        for (medium in mediums) {
          partialAmt += +medium.split(":")[1];
        }
        let unpaidAmt = this.total - partialAmt;
        if (unpaidAmt < 0) return 0;
        else return unpaidAmt;
      } else {
        return this.total;
      }
    }
  },
  methods: {
    getRate(tag) {
      var rate = parseInt(tag.rate.rate);
      if (tag.has_antiseptic_wash) {
        rate += 5;
      }
      if (tag.has_fabric_softener) {
        rate += 5;
      }
      return rate;
    }
  }
};
</script>