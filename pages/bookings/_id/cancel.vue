<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Cancel #{{$route.params.id}}</v-toolbar-title>
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending" class="d-flex align-center justify-center">
          <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
          <div class="m-fs-t">Cancellation not allowed for this order</div>
        </div>
        <div v-else>
          <div class="d-flex align-center justify-space-between ma-4">
            <div class="m-fs-s">Scheduled Pickup</div>
            <div
              class="m-fs-t"
            >{{($dateFormat(order.pickup_date) + ' (' + order.pickup_timeslot.timeslot + ')' )}}</div>
          </div>
          <div class="d-flex align-center justify-space-between ma-4">
            <div class="m-fs-t">Reschedule your booking and avoid cancellation</div>
          </div>
          <v-divider />
          <timeslotSelector
            :timeslots="timeslots"
            @date="setDate"
            @timeslotId="setTimeslotId"
            :isDelivery="false"
          />
        </div>
        <div class="white elevation-8 d-flex" style="position: fixed; bottom:0; left:0; right:0;" v-if="!$fetchState.error">
          <div class="flex-grow-1">
            <v-btn depressed @click.stop="fetchCancelReasons" height="52px" block tile>Cancel</v-btn>
          </div>
          <div class="flex-grow-1">
            <v-btn
              :disabled="!selectedTimeslotId"
              class="accent"
              @click="reschedule"
              block
              height="52px"
              tile
              :loading="loading"
            >Reschedule</v-btn>
          </div>
        </div>
      </div>
      <v-dialog v-model="cancelDialog" scrollable>
        <v-card :loading="loadingReason">
          <v-card-title>Any reason to cancel?</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-radio-group v-model="selectedReasonId" column>
              <v-radio
                v-for="reason in cancelReasons"
                :key="reason.id"
                :value="reason.id"
                :label="reason.reason"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="red"
              text
              @click="cancel"
              :disabled="selectedReasonId == null"
              :loading="loadingReason"
            >cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import timeslotSelector from "@/components/parts/timeslotSelector";
export default {
  layout: "mobile",
  middleware: "isMobile",
  validate({ params }) {
    //TODO: add integer only validation
    return true;
  },
  async fetch() {
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get("/timeslot/" + this.$route.params.id);
    if (res.success && [1, 2, 3, 4, 16].includes(+res.order.order_status_id)) {
      this.timeslots = res.timeslots;
      this.order = res.order;
    } else {
      this.$fetchState.error = res.error;
    }
  },
  computed: {},
  components: {
    timeslotSelector
  },
  data() {
    return {
      order: null,
      timeslots: null,
      selectedDate: null,
      selectedTimeslotId: null,
      loading: false,
      loadingReason: false,
      cancelDialog: false,
      selectedReasonId: null,
      cancelReasons: null
    };
  },
  methods: {
    setDate(date) {
      this.selectedDate = date;
    },
    setTimeslotId(timeslotId) {
      this.selectedTimeslotId = timeslotId;
    },
    async reschedule() {
      this.loading = true;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      const res = await this.$axios.$patch("/reschedule", {
        id: this.order.id,
        date: this.selectedDate,
        timeslotId: this.selectedTimeslotId
      });
      this.loading = false;
      if (res.success) {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Booking Rescheduled!",
          color: "accent"
        });
        this.$router.go(-1);
      } else {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Something went wrong! Retry Again.",
          color: "red"
        });
      }
    },
    async fetchCancelReasons() {
      this.cancelDialog = true;
      if (this.cancelReasons == null) {
        this.loadingReason = true;
        this.$axios.setToken(this.$store.state.token, "Bearer");
        const res = await this.$axios.$get("/reason-cancel");
        this.cancelReasons = res.reasons;
        this.loadingReason = false;
      }
    },
    async cancel() {
      this.loadingReason = true;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      const res = await this.$axios.$patch("/cancel", {
        id: this.order.id,
        reasonId: this.selectedReasonId
      });
      this.loadingReason = false;
      if (res.success) {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Booking cancelled!",
          color: "accent"
        });
        this.$router.go(-1);
      } else {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Something went wrong! Retry Again.",
          color: "red"
        });
      }
    }
  }
};
</script>
