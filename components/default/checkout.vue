<template>
  <div class="window">
    <Appbar :hasBookingToolbar="false" :elevateOnScroll="false" class="appbar-shadow" />
    <div class="main-content-outer-container">
      <div v-if="$fetchState.pending">
        <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
      </div>
      <div v-else class="main-content-inner-container">
        <div class="ss-stepper">
          <v-stepper v-model="step" vertical>
            <v-stepper-step :complete="step > 1" step="1">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div class="text-h4 font-weight-bold">Services & Addons</div>
                  <div class="text-subtitle-1 font-weight-bold" v-if="step > 1">
                    <div v-for="service in selectedServices" :key="service.id">
                      {{service.name}}
                      <span
                        v-for="addon in service.selectedAddons"
                        :key="addon.id"
                      >| {{addon.name}}</span>
                    </div>
                  </div>
                </div>
                <div v-if="step > 1" class="ml-4">
                  <v-btn text class="accent--text" @click="step = 1">Change</v-btn>
                </div>
              </div>
            </v-stepper-step>

            <v-stepper-content step="1">
              <ServiceSelector />
              <v-btn class="mt-8" color="accent" block @click="step = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div class="text-h4 font-weight-bold">Pickup Date & Time</div>
                  <div
                    class="text-subtitle-1 font-weight-bold"
                    v-if="step > 2"
                  >{{$dateFormat($store.state.order.pickupDate)}} | {{pickupTimeslot}}</div>
                </div>
                <div v-if="step > 2" class="ml-4">
                  <v-btn text class="accent--text" @click="step = 2">Change</v-btn>
                </div>
              </div>
            </v-stepper-step>

            <v-stepper-content step="2">
              <TimeslotSelector
                :timeslots="$store.state.timeslots"
                @date="setDate"
                @timeslotId="setTimeslotId"
              />
              <v-btn
                class="mt-8"
                color="accent"
                block
                :disabled="$store.state.order.pickupTimeslotId == null"
                @click="step = $store.state.token ? 4 : 3"
              >Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3" v-if="!$store.state.token">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div class="text-h4 font-weight-bold">Account</div>
                </div>
                <div v-if="step > 3" class="ml-4">
                  <v-btn text class="accent--text" @click="step = 3">Change</v-btn>
                </div>
              </div>
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
              <v-btn color="primary" @click="step = 4">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <!-- <v-stepper-step :complete="step > 4" step="4">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <div class="text-h4 font-weight-bold">Pickup Address</div>
                    <div v-if="step > 4" class="ml-4">
                      <v-btn text class="accent--text" @click="step = 4">Change</v-btn>
                    </div>
                  </div>
                  <div
                    class="text-subtitle-2 font-weight-light"
                    v-if="step = 4"
                  >{{`You have ${$store.state.user.addresses.length} saved addresses`}}</div>
                  <div
                    class="text-capitalize text-subtitle-1 font-weight-bold"
                    v-if="step > 4"
                  >{{selectedAddress.label}}</div>
                  <div
                    v-if="step>4"
                    class="text-subtitle-2 font-weight-light"
                  >{{`${selectedAddress.plot_no}, ${selectedAddress.address}`}}</div>
                </div>
              </div>
            </v-stepper-step>
            <v-stepper-content step="4">
              <div class="d-flex flex-wrap">
                <v-card
                  outlined
                  hover
                  v-for="address in $store.state.user.addresses"
                  :key="address.id"
                  width="324px"
                  class="mr-8 mb-8"
                >
                  <v-card-title>
                    <div class="d-flex align-center">
                      <v-icon class="mr-2">{{addressIcon(address.label)}}</v-icon>
                      <div class="text-capitalize">{{address.label}}</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div>{{`${address.plot_no}, ${address.address}`}}</div>
                  </v-card-text>
                  <v-card-actions class="address-action-btn">
                    <v-spacer />
                    <v-btn
                      depressed
                      color="accent"
                      @click="selectAddress(address.id)"
                    >Pickup from here</v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
                <v-card outlined hover width="324px" class="mr-8 mb-8">
                  <div class="d-flex flex-column justify-space-between">
                    <v-card-title>
                      <div class="d-flex align-center">
                        <v-icon class="mr-2">{{addressIcon('add new address')}}</v-icon>
                        <div class="text-capitalize">Add new address</div>
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <div></div>
                    </v-card-text>
                    <v-card-actions class="address-action-button">
                      <v-spacer />
                      <v-btn depressed color="accent" @click="selectAddress(address.id)">Add New</v-btn>
                      <v-spacer />
                    </v-card-actions>
                  </div>
                </v-card>
              </div>
            </v-stepper-content> -->
          </v-stepper>
        </div>
        <div class="ss-review">
          <div class="pa-4">
            <div class="text-h6 font-weight-bold text-center">Minimum Bill Amount is &#8377; 250</div>
            <v-divider />
            <div v-if="$store.state.token">
              <div class="ma-4" style="border: 2px dotted #ccc">
                <v-list-item v-if="!$store.state.order.couponId" to="/checkout/coupon">
                  <v-list-item-icon>
                    <v-icon>mdi-offer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="m-fs-t">Apply Coupon</v-list-item-title>
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
            </div>
            <div>
              <v-textarea
                class="ma-4"
                v-model="pickupInstruction"
                label="Any Pickup instruction ?"
                filled
                auto-grow
                rows="4"
                row-height="30"
                counter="200"
              ></v-textarea>
              <div class="ma-4 mb-0 m-fs-s">Estimated number of clothes?</div>
              <v-chip-group
                mandatory
                active-class="accent"
                class="mx-4"
                v-model="selectedEnoc"
                column
              >
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
                <v-chip
                  v-for="item in heavyItems"
                  :key="item"
                  :value="item"
                  class="m-fs-t"
                >{{ item }}</v-chip>
              </v-chip-group>
            </div>
            <v-btn class="mt-8" block color="accent" v-if="step>4">Book</v-btn>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Appbar from "@/components/parts/default/Appbar";
import Footer from "@/components/parts/default/Footer";
import ServiceSelector from "@/components/parts/default/checkout/ServiceSelector";
import timeslotSelector from "@/components/parts/timeslotSelector";
export default {
  components: {
    Appbar,
    Footer,
    ServiceSelector,
    TimeslotSelector: timeslotSelector
  },
  async fetch() {
    const res = await this.$axios.$get("/timeslot");
    this.$store.dispatch("addTimeslots", res.timeslots);
  },
  data() {
    return {
      step: 1,
      // rules: {
      //   maxChar: v =>
      //     (v || "").length <= 200 ||
      //     "Description must be 200 characters or less",
      //   required: v => !!v || "This field is required"
      // },
      enocs: ["< 20", "20 - 40", "> 40"],
      heavyItems: ["Blanket / Quilt", "Carpet", "Curtain"],
      loading: false
    };
  },
  methods: {
    setDate(date) {
      this.$store.dispatch("addOrderPickupDate", date);
    },
    setTimeslotId(timeslotId) {
      this.$store.dispatch("addOrderPickupTimeslotId", timeslotId);
    },
    addressIcon(label) {
      let addressIcon = "mdi-map-marker";
      // if (label.toLowerCase() == "home") addressIcon = "mdi-home-map-marker";
      // if (label.toLowerCase() == "office")
      //   addressIcon = "mdi-office-building-marker";
      // if (label.toLowerCase() == "add new address")
      //   addressIcon = "mdi-map-marker-plus";
      return addressIcon;
    },
    async selectAddress(addressId) {
      await this.$store.dispatch("addOrderAddressId", addressId);
      this.step = 5;
    }
  },
  computed: {
    selectedEnoc: {
      get() {
        return this.$store.state.order.estimatedClothes;
      },
      set(val) {
        this.$store.dispatch("addOrderEstimatedClothes", val);
      }
    },
    selectedHeavyItems: {
      get() {
        return this.$store.state.order.heavyItems;
      },
      set(val) {
        this.$store.dispatch("addOrderHeavyItems", val);
      }
    },
    pickupInstruction: {
      get() {
        return this.$store.state.order.pickupInstruction;
      },
      set(val) {
        this.$store.dispatch("addOrderPickupInstruction", val);
      }
    },
    selectedAddress() {
      let l = this.$store.state.user.addresses.length;
      console.log("outer", l);
      for (let i = 0; i < l; i++) {
        console.log("out");
        if (
          this.$store.state.user.addresses[i].id ==
          this.$store.state.order.addressId
        ) {
          console.log("in");
          return this.$store.state.user.addresses[i];
        }
      }
      return null;
    },
    pickupTimeslot() {
      if (!this.$store.state.order.pickupDate) return null;
      let l = this.$store.state.timeslots[this.$store.state.order.pickupDate]
        .length;
      for (let i = 0; i < l; i++) {
        if (
          this.$store.state.timeslots[this.$store.state.order.pickupDate][i]
            .id == this.$store.state.order.pickupTimeslotId
        )
          return this.$store.state.timeslots[
            this.$store.state.order.pickupDate
          ][i].timeslot;
      }
    },
    selectedServices() {
      let _services = [];
      this.$store.state.services.forEach(service => {
        if (this.$store.state.order.services.includes(service.id)) {
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
      this.$store.state.order.addons.forEach(addon => {
        let _addon = addon.split("-");
        if (_selectedAddons[_addon[0]] == undefined)
          _selectedAddons[_addon[0]] = [_addon[1]];
        else _selectedAddons[_addon[0]].push(_addon[1]);
      });
      return _selectedAddons;
    }
  }
};
</script>
<style scoped>
.window {
  position: relative;
  padding-top: 64px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 1240px;
}
.main-content-outer-container {
  min-height: 100%;
  background: #e9ecee;
}
.main-content-inner-container {
  max-width: 1200px;
  min-width: 1200px;
  position: relative;
  margin: 0 auto;
  display: flex;
  margin-top: 31px;
  margin-bottom: 150px;
}
.ss-stepper {
  flex: 1;
  margin-right: 30px;
  position: relative;
}
.ss-review {
  width: 366px;
  background-color: #fff;
}
.v-stepper {
  box-shadow: unset;
  border-radius: 0px;
}
.address-action-btn {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>