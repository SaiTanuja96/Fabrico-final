<template>
  <div style="padding-top: 56px; height:100%;">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar" height="52px">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Schedule</v-toolbar-title>
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
      <div v-if="$fetchState.pending" class="d-flex align-center justify-center">
        <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
      </div>
      <div v-else>
        <timeslotSelector :timeslots="timeslots" @date="setDate" @timeslotId="setTimeslotId" />
      </div>
      <v-btn
        v-if="selectedTimeslotId"
        class="ss-bottom-toolbar accent elevation-8"
        to="/checkout/review"
        block
        height="52px"
        nuxt
        tile
      >
        continue
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import timeslotSelector from "@/components/parts/timeslotSelector";
export default {
  components: {
    timeslotSelector
  },
  middleware: "isMobile",
  layout: "mobile",
  async fetch() {
    const res = await this.$axios.$get("/timeslot");
    this.$store.dispatch("addTimeslots", res.timeslots);
    this.timeslots = res.timeslots;
  },
  computed: {
    selectedDate: {
      get() {
        return this.$store.state.order.pickupDate;
      },
      set(value) {
        this.$store.dispatch("addOrderPickupDate", value);
      }
    },
    selectedTimeslotId: {
      get() {
        return this.$store.state.order.pickupTimeslotId;
      },
      set(value) {
        this.$store.dispatch("addOrderPickupTimeslotId", value);
      }
    }
  },
  methods: {
    setDate(date) {
      this.selectedDate = date;
    },
    setTimeslotId(timeslotId) {
      this.selectedTimeslotId = timeslotId;
    }
  }
};
</script>