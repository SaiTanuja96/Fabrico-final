<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Price Estimator</v-toolbar-title>
      </v-toolbar>
      <div v-if="$fetchState.pending || loading" class="d-flex align-center justify-center">
        <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
      </div>
      <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
        <div class="m-fs-t">Invalid Booking</div>
      </div>
      <div v-else>
        <div id="laundryItems" class="m-fs-h mb-8 ma-4">Laundry</div>
        <div v-for="(rate, i) in laundryItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider v-if="i < laundryItems.length - 1" />
        </div>
        <div id="drycleanItems" style="border-top:16px solid #f2f4f6;">
          <div class="m-fs-h mb-8 ma-4">Dryclean</div>
        </div>
        <div id="menItems" class="ma-4 m-fs-h">Men</div>
        <div v-for="rate in menItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider />
        </div>
        <div id="womenItems" class="ma-4 m-fs-h">Women</div>
        <div v-for="rate in womenItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider />
        </div>
        <div id="woolenItems" class="ma-4 m-fs-h">Woolen</div>
        <div v-for="rate in woolenItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider />
        </div>
        <div id="kidItems" class="ma-4 m-fs-h">Kid</div>
        <div v-for="rate in kidItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider />
        </div>
        <div id="accessoryItems" class="ma-4 m-fs-h">Accessories</div>
        <div v-for="rate in accessoryItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider />
        </div>
        <div id="householdItems" class="ma-4 m-fs-h">Household</div>
        <div v-for="(rate,i) in householdItems" :key="rate.id" class="ma-4">
          <rateCard :item="rate" @changed="handleRateCardChange" />
          <v-divider v-if="i < householdItems.length - 1" />
        </div>
        <v-bottom-sheet v-model="sheetCategory" scrollable width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="accent mx-auto"
              width="35%"
              rounded
              v-bind="attrs"
              v-on="on"
              style="position:fixed; bottom:64px; left:0px; right:0px;"
            >Category</v-btn>
          </template>
          <v-card class="text-center">
            <v-card-text style="height: 300px">
              <v-btn class="mt-6" text color="error" @click="sheetCategory = !sheetCategory">close</v-btn>
              <div class="d-flex flex-column">
                <v-btn text class="my-3" @click="scrollTo('#laundryItems')">Laundry</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#menItems')">Men</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#womenItems')">Women</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#woolenItems')">Woolen</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#kidItems')">Kids</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#accessoryItems')">Accessories</v-btn>
                <v-btn text class="my-3" @click="scrollTo('#householdItems')">Household</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
        <div
          class="ss-bottom-toolbar accent elevation-8 d-flex justify-space-between align-center pa-4 white--text"
          style="height:52px"
          v-if="subTotal > 0"
        >
          <div class="d-flex align-center">
            <div class="font-weight-bold">{{itemCount.items}} Items</div>
            <div class="ml-1 text-caption" v-if="itemCount.kg > 0">({{itemCount.kg}} kg)</div>
            <div class="ml-1 text-caption" v-if="itemCount.pc > 0">({{itemCount.pc}} pc)</div>
            <div class="ml-1 text-caption" v-if="itemCount.sqft > 0">({{itemCount.sqft}} sqft)</div>
            <v-divider vertical class="mx-2 white" />
            <div class="font-weight-bold">&#8377; {{subTotal}}</div>
          </div>
          <div>
            <v-btn text color="white" class="pr-0" @click="handleCartClick">
              Details
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import rateCard from "@/components/parts/rateCard";
export default {
  layout: "mobile",
  middleware: ["isMobile"],
  async fetch() {
    let res = await this.$axios.$get("/rates");
    if (res.success) {
      this.rates = res.rates;
      for (let i = 0; i < this.rateLength; i++) {
        this.$set(this.rates[i], "count", 0);
        if (
          this.rates[i].id == 1 ||
          this.rates[i].id == 2 ||
          this.rates[i].id == 3
        ) {
          this.$set(this.rates[i], "antisepticWash", false);
          this.$set(this.rates[i], "fabricSoftener", false);
        }
      }
    } else this.$fetchState.error = res.error;
  },
  components: {
    rateCard
  },
  computed: {
    laundryItems() {
      return this.rates.filter(function(rate) {
        return rate.category == 0;
      });
    },
    menItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Men";
      });
    },
    womenItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Women";
      });
    },
    woolenItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Woolen";
      });
    },
    kidItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Kids";
      });
    },
    accessoryItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Accessories";
      });
    },
    householdItems() {
      return this.rates.filter(function(rate) {
        return rate.sub_category == "Household";
      });
    },
    itemCount() {
      let kg = 0;
      let sqft = 0;
      let pc = 0;
      let items = 0;
      this.rates.forEach(rate => {
        if (rate.count > 0) items++;
        switch (rate.rate_unit) {
          case "kg":
            kg += rate.count;
            break;
          case "pc":
            pc += rate.count;
            break;
          case "sq ft":
            sqft += rate.count;
            break;
          default:
            break;
        }
      });
      return { items, kg, sqft, pc };
    },
    subTotal() {
      let price = 0;
      for (let i = 0; i < this.rateLength; i++) {
        price += this.rates[i].count * this.rates[i].rate;
        if (
          this.rates[i].id == 1 ||
          this.rates[i].id == 2 ||
          this.rates[i].id == 3
        ) {
          if (this.rates[i].antisepticWash) price += 5 * this.rates[i].count;
          if (this.rates[i].fabricSoftener) price += 5 * this.rates[i].count;
        }
      }
      return price;
    },
    rateLength() {
      return this.rates.length;
    }
  },
  data() {
    return {
      rates: null,
      sheetCategory: false,
      loading: false
    };
  },
  methods: {
    scrollTo(selector) {
      this.sheetCategory = false;
      console.log(this.$vuetify, selector);
      this.$vuetify.goTo(selector, {
        duration: 300,
        offset: 120
      });
    },
    handleRateCardChange(data) {
      for (let i = 0; i < this.rateLength; i++) {
        if (this.rates[i].id == data.id) {
          this.rates[i].count = data.count;
          if (
            this.rates[i].id == 1 ||
            this.rates[i].id == 2 ||
            this.rates[i].id == 3
          ) {
            this.rates[i].antisepticWash = data.antisepticWash;
            this.rates[i].fabricSoftener = data.fabricSoftener;
          }
          break;
        }
      }
    },
    handleCartClick() {
      this.$store.dispatch("addRates", this.rates);
      this.$router.push("/pricing/cart");
    }
  }
};
</script>