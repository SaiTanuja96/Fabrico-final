<template>
  <div style="padding-top: 56px; height:100%; ">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Review</v-toolbar-title>
        <v-spacer />
        <v-badge
          color="accent black--text"
          left
          inline
          :value="$store.state.order.services.length"
          :content="$store.state.order.services.length"
        >
          <v-icon @click="$router.replace('/checkout')">mdi-cart</v-icon>
        </v-badge>
      </v-toolbar>
      <div>
        <div class="ma-4 mt-6 flex-center">
          <div class="m-fs-t text-decoration-underline">Minimum Bill Amount is &#8377; 250</div>
          <div class="m-fs-s">Review your order to avoid cancellation</div>
        </div>
        <v-list class="pa-0">
          <template v-for="(service,i) in selectedServices">
            <v-list-item :key="service.id">
              <v-list-item-avatar tile>
                <v-img :src="service.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="m-fs-t">{{service.name}}</v-list-item-title>
                <v-list-item-subtitle
                  class="m-fs-s"
                >{{ ((service.id == 4) ? 'starting ' : '') + '&#8377; ' + service.rate + '/' + service.rate_unit + ' | ' + service.turnaround_time_hr + ' Hrs'}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <template v-if="service.selectedAddons.length > 0">
              <v-list-item
                v-for="addon in service.selectedAddons"
                :key="service.id + '-' + addon.id"
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="m-fs-t"
                  >{{addon.name + ' : &#8377; ' + addon.rate + '/' + addon.rate_unit}}</v-list-item-title>
                  <v-list-item-subtitle class="m-fs-s">{{ addon.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-divider
              :key="'divider'+service.id"
              class="mx-4"
              v-if="i < selectedServices.length-1"
            ></v-divider>
          </template>
        </v-list>
        <div style="border-top:16px solid #f2f4f6;">
          <v-row class="mx-4 mt-4" align="center" justify="space-between">
            <span class="m-fs-s">Pickup date</span>
            <span class="m-fs-t">{{pickupDate}}</span>
          </v-row>
          <v-row class="mx-4 mb-4" align="center" justify="space-between">
            <span class="m-fs-s">Pickup timeslot</span>
            <span class="m-fs-t">{{pickupTimeslot}}</span>
          </v-row>
        </div>
        <div style="border-top:16px solid #f2f4f6;" v-if="user">
          <v-list-item v-if="!order.couponId" to="/checkout/coupon">
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
                <v-list-item-title class="m-fs-t">{{coupon.coupon_code}}</v-list-item-title>
                <v-list-item-subtitle class="m-fs-s">{{coupon.description}}</v-list-item-subtitle>
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
          <v-textarea
            class="ma-4"
            v-model="pickupInstruction"
            label="Any Pickup instruction ?"
            filled
            auto-grow
            :rules="[rules.maxChar]"
            rows="4"
            row-height="30"
            counter="200"
          ></v-textarea>
          <div class="ma-4 mb-0 m-fs-s">Estimated number of clothes?</div>
          <v-chip-group mandatory active-class="accent" class="mx-4" v-model="selectedEnoc" column>
            <v-chip v-for="enoc in enocs" :key="enoc" :value="enoc" class="m-fs-t">{{ enoc }}</v-chip>
          </v-chip-group>
          <div class="ma-4 mb-0 m-fs-s">Heavy items?</div>
          <v-chip-group
            multiple
            active-class="accent"
            class="mx-4"
            v-model="selectedHeavyItems"
            column
          >
            <v-chip v-for="item in heavyItems" :key="item" :value="item" class="m-fs-t">{{ item }}</v-chip>
          </v-chip-group>
        </div>
      </div>
      <div style="position: fixed; bottom:0; left:0; right:0;" class="white elevation-8">
        <div class="d-flex flex-column ma-4" v-if="!user">
          <span class="m-fs-t">ALMOST THERE</span>
          <span class="m-fs-s">Login/ Create account quickly</span>
          <v-btn exact outlined class="accent white--text mt-4" to="/auth">PROCEED WITH MOBILE NO.</v-btn>
        </div>
        <div v-else class="d-flex flex-column ma-4">
          <addressTile :address="selectedAddress" v-if="selectedAddress" class="mb-4" />
          <div class="d-flex align-center justify-center">
            <v-bottom-sheet
              v-model="showAddressSelector"
              scrollable
              hide-overlay
              v-if="user && user.addresses.length > 0"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  class="flex-grow-0 flex-shrink-1"
                  v-bind="attrs"
                  v-on="on"
                >SELECT ADDRESS</v-btn>
              </template>
              <address-selector
                @address-selected="addressSelectedCallback"
                @close="showAddressSelector = false"
              />
            </v-bottom-sheet>
            <v-btn outlined class="flex-grow-0 flex-shrink-1" v-else>ADD ADDRESS</v-btn>
            <v-btn
              class="flex-grow-1 flex-shrink-0 ml-4"
              depressed
              v-if="selectedAddress"
              :loading="loading"
              color="accent"
              @click="createOrder"
            >BOOK</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import addressTile from "@/components/parts/addressTile";
import addressSelector from "@/components/parts/addressSelector";
export default {
  middleware: "isMobile",
  layout: "mobile",
  validate({ store, redirect }) {
    if (store.state.order.pickupDate && store.state.order.pickupTimeslotId) {
      return true;
    }
    redirect("/checkout");
  },
  components: {
    addressTile,
    addressSelector
  },
  computed: {
    selectedEnoc: {
      get() {
        return this.order.estimatedClothes;
      },
      set(val) {
        this.$store.dispatch("addOrderEstimatedClothes", val);
      }
    },
    selectedHeavyItems: {
      get() {
        return this.order.heavyItems;
      },
      set(val) {
        this.$store.dispatch("addOrderHeavyItems", val);
      }
    },
    pickupInstruction: {
      get() {
        return this.order.pickupInstruction;
      },
      set(val) {
        this.$store.dispatch("addOrderPickupInstruction", val);
      }
    },
    pickupDate() {
      let _date = moment(this.order.pickupDate, "YYYY-MM-DD");
      return _date.format("ddd, Do MMM");
    },
    pickupTimeslot() {
      let l = this.timeslots[this.order.pickupDate].length;
      for (let i = 0; i < l; i++) {
        if (
          this.timeslots[this.order.pickupDate][i].id ==
          this.order.pickupTimeslotId
        )
          return this.timeslots[this.order.pickupDate][i].timeslot;
      }
    },
    selectedServices() {
      let _services = [];
      this.services.forEach(service => {
        if (this.order.services.includes(service.id)) {
          let _tService = Object.assign({}, service);
          _tService.selectedAddons = [];
          _tService.addons.forEach(addon => {
            if (
              this.selectedAddons[service.id] != undefined &&
              this.selectedAddons[service.id].includes("" + addon.id)
            ) {
              _tService.selectedAddons.push(addon);
            }
          });
          _services.push(_tService);
        }
      });
      return _services;
    },
    selectedAddons() {
      let _selectedAddons = {};
      this.order.addons.forEach(addon => {
        let _addon = addon.split("-");
        if (_selectedAddons[_addon[0]] == undefined)
          _selectedAddons[_addon[0]] = [_addon[1]];
        else _selectedAddons[_addon[0]].push(_addon[1]);
      });
      return _selectedAddons;
    },
    selectedAddress() {
      if (this.order.addressId) {
        let l = this.user.addresses.length;
        for (let i = 0; i < l; i++) {
          if (this.user.addresses[i].id == this.order.addressId) {
            return this.user.addresses[i];
          }
        }
      }
      return null;
    },
    ...mapState(["services", "user", "token", "timeslots", "order", "coupon"])
  },
  methods: {
    addressSelectedCallback(addressId) {
      this.showAddressSelector = false;
      if (addressId == 0) {
        this.$router.push("/add-address");
      } else {
        this.$store.dispatch("addOrderAddressId", addressId);
      }
    },
    async createOrder() {
      this.loading = true;
      this.$axios.setToken(this.token, "Bearer");
      const res = await this.$axios.$post("/order", this.order);
      this.loading = false;
      this.$store.dispatch("addSnackbar", {
        value: true,
        message: "Order Booked!",
        color: "accent"
      });
      this.$router.replace("/bookings/" + res.order.id);
    }
  },
  created() {
    if (this.user && !this.order.addressId) {
      let l = this.user.addresses.length;
      for (let i = 0; i < l; i++) {
        if (
          this.user.addresses[i].address
            .trim()
            .toLowerCase()
            .includes(this.$store.getters.getSelectedCityName.toLowerCase())
        ) {
          this.$store.dispatch("addOrderAddressId", this.user.addresses[i].id);
          break;
        }
      }
    }
  },
  data() {
    return {
      enocs: ["< 20", "20 - 40", "> 40"],
      heavyItems: ["Blanket / Quilt", "Carpet", "Curtain"],
      loading: false,
      showAddressSelector: false,
      rules: {
        maxChar: v =>
          (v || "").length <= 200 ||
          "Description must be 200 characters or less",
        required: v => !!v || "This field is required"
      }
    };
  }
};
</script>