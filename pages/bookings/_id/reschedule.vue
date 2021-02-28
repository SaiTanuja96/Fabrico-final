<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Reschedule #{{$route.params.id}}</v-toolbar-title>
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending" class="d-flex align-center justify-center">
          <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
          <div class="m-fs-t">Reschedule not allowed for this order</div>
        </div>
        <div v-else>
          <div v-if="isDelivery != -1">
            <div class="d-flex align-center justify-space-between ma-4">
              <div class="m-fs-s">{{isDelivery ? 'Scheduled Delivery' : 'Scheduled Pickup'}}</div>
              <div
                class="m-fs-t"
              >{{isDelivery ? ($dateFormat(order.delivery_date) + ' (' + order.delivery_timeslot.timeslot +')'): ($dateFormat(order.pickup_date) + ' (' + order.pickup_timeslot.timeslot + ')' )}}</div>
            </div>
            <v-divider />
            <timeslotSelector
              :timeslots="timeslots"
              @date="setDate"
              @timeslotId="setTimeslotId"
              :isDelivery="isDelivery"
            />
          </div>
          <div v-else class="d-flex align-center justify-center mt-10">
            <span class="m-fs-t">Reschedule not allowed for this order</span>
          </div>
        </div>
        <v-btn
          v-if="selectedTimeslotId"
          class="ss-bottom-toolbar accent elevation-8"
          @click="reschedule"
          block
          height="52px"
          tile
          :loading="loading"
        >Reschedule {{ isDelivery ? 'Delivery' : 'Pickup' }}</v-btn>
      </div>
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
    if (res.success) {
      this.timeslots = res.timeslots;
      this.order = res.order;
    } else {
      this.$fetchState.error = res.error;
    }
  },
  computed: {
    isDelivery() {
      if (this.order) {
        if ([1, 2, 3, 4, 16].includes(+this.order.order_status_id)) {
          return false;
        } else if (
          [7, 8, 9, 10, 11, 12, 13, 17].includes(+this.order.order_status_id)
        ) {
          return true;
        } else {
          return -1;
        }
      } else {
        return false;
      }
    }
  },
  components: {
    timeslotSelector
  },
  data() {
    return {
      order: null,
      timeslots: null,
      selectedDate: null,
      selectedTimeslotId: null,
      loading: false
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
    }
  }
};
</script>
