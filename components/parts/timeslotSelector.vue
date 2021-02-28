<template>
  <div>
    <div class="ma-4 flex-center">
      <div class="m-fs-s">{{dateHeading}}</div>
    </div>
    <div class="overflow-x-auto ml-4 d-flex">
      <v-card
        v-for="(timeslot, timeslotDate) in timeslots"
        :key="timeslotDate"
        outlined
        ripple
        class="mr-4"
        width="56"
        :color="timeslotDate == selectedDate ? 'accent' : ''"
        @click="selectedDate = timeslotDate"
      >
        <v-card-text>
          <div class="d-flex flex-column justify-center align-center">
            <span class="m-fs-t">{{getDateDay(timeslotDate)}}</span>
            <span class="m-fs-s">{{getDateInitial(timeslotDate)}}</span>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div class="ma-4">
      <div class="m-fs-s">{{timeHeading}}</div>
    </div>
    <div class="d-flex flex-wrap">
      <div
        style="flex: 0 0 50%;
    max-width: 50%;"
        v-for="timeslot in timeslots[selectedDate]"
        :key="timeslot.id"
      >
        <v-card
          class="mx-4 mb-4"
          outlined
          ripple
          @click="selectedTimeslotId = timeslot.id"
          :color="selectedTimeslotId == timeslot.id ? 'accent': ''"
        >
          <v-card-title class="m-fs-t">{{ timeslot.timeslot }}</v-card-title>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    isDelivery: {
      type: Boolean,
      default: false,
      required: false
    },
    timeslots: {
      type: Object,
      required: true
    }
  },
  created () {
    for (const timeslotDate in this.timeslots) {
      if (this.timeslots.hasOwnProperty(timeslotDate)) {
        this.selectedDate = timeslotDate;
        this.selectedTimeslotId = null;
        break;
      }
    };
  },
  computed: {
    dateHeading() {
      if (this.isDelivery) {
        return "When would you like your clothes to be delivered?";
      } else {
        return "When would you like your clothes to be picked up?";
      }
    },
    timeHeading() {
      if (this.isDelivery) {
        return "At what time should the rider deliver your clothes?";
      } else {
        return "At what time should the rider arrive?";
      }
    }
  },
  data() {
    return {
      selectedDate: null,
      selectedTimeslotId: null
    };
  },
  methods: {
    getDateInitial(date) {
      let _date = moment(date, "YYYY-MM-DD");
      return _date.format("D");
    },
    getDateDay(date) {
      let _date = moment(date, "YYYY-MM-DD");
      return _date.format("ddd");
    }
  },
  watch: {
    selectedDate(newValue) {
      this.selectedTimeslotId = null;
      this.$emit("date", newValue);
    },
    selectedTimeslotId(newValue) {
      this.$emit("timeslotId", newValue);
    }
  }
};
</script>