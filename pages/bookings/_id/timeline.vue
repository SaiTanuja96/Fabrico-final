<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Timeline</v-toolbar-title>
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending" class="d-flex align-center justify-center">
          <v-progress-linear height="6" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else class="ma-4 d-flex justify-center">
          <div
            v-if="order && order.order_status_id == 0"
            class="m-fs-t"
          >Order Cancelled on {{listCancelMissed["0"] ? listCancelMissed["0"]["value"] : ''}}</div>
          <div
            v-if="order && order.order_status_id == 16"
            class="m-fs-t"
          >Pickup Missed {{listCancelMissed["16"] ? listCancelMissed["16"]["value"] : ''}}</div>
          <div
            v-if="order && order.order_status_id == 17"
            class="m-fs-t"
          >Delivery Missed {{listCancelMissed['17'] ? listCancelMissed["17"]["value"] : ''}}</div>
          <div
            v-if="order && order.order_status_id < 5 && order.order_status_id != 0"
            class="m-fs-t"
          >
            <span class="m-fs-s">Pickup on:</span>
            {{$dateFormat(order.pickup_date) + ' ( ' + order.pickup_timeslot.timeslot +' )'}}
          </div>
          <div
            v-if="order && order.order_status_id >= 7 && order.order_status_id < 14"
            class="m-fs-t"
          >
            <span class="m-fs-s">Delivery on:</span>
            {{$dateFormat(order.delivery_date) + ' ( ' + order.delivery_timeslot.timeslot + ' )'}}
          </div>
        </div>
        <v-timeline left dense align-top v-if="!loading">
          <v-timeline-item
            v-for="(statusArr,statusId) in statusList"
            :key="statusId"
            dense
            small
            :icon="statusArr[0]['icon']"
          >
            <template v-for="status in statusArr">
              <div class="m-fs-s" :key="status.value">{{status.text}}</div>
              <div
                class="m-fs-t"
                :key="'date' +status.value"
              >{{status.value == null ? '----' : status.value}}</div>
            </template>
          </v-timeline-item>
        </v-timeline>
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
  fetchOnServer: true,
  async fetch() {
    this.loading = true;
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get(
      "/orders/" + this.$route.params.id + "/timeline"
    );
    if (res.success) {
      this.order = res.order;
    } else {
      this.$store.dispatch("addSnackbar", {
        value: true,
        message: "Something went wrong! Retry Again.",
        color: "red"
      });
    }
    this.loading = false;
  },
  data() {
    return {
      loading: false,
      order: null,
      listCancelMissed: {}
    };
  },
  computed: {
    statusList() {
      let list = {
        "1": [
          {
            text: this.order.source_id == 4 ? "Booked / Confirmed" : "Booked",
            value: this.$dateFormat(this.order.created_at, true),
            icon: "mdi-check"
          }
        ]
      };
      //0 online 1//walkin
      if (this.order.order_type == 0) {
        if (this.order.source_id != 4) {
          list["2"] = [
            {
              text: "Confirmed",
              value: null,
              icon:
                this.order.order_status_id == 1 ? "mdi-progress-clock" : null
            }
          ];
        }
        list["3"] = [
          {
            text: "Rider Assigned For Pickup",
            value: null,
            icon: this.order.order_status_id == 2 ? "mdi-progress-clock" : null
          }
        ];

        list["4"] = [
          {
            text: "Rider Out For Pickup",
            value: null,
            icon: this.order.order_status_id == 3 ? "mdi-progress-clock" : null
          }
        ];
        list["5"] = [
          {
            text: "Pickup Completed",
            value: null,
            icon: this.order.order_status_id == 4 ? "mdi-progress-clock" : null
          }
        ];
        list["6"] = [
          {
            text: "Received At Center",
            value: null,
            icon: this.order.order_status_id == 5 ? "mdi-progress-clock" : null
          }
        ];
      }
      list["7"] = [
        {
          text: "Tagged / Bill Generated",
          value: null,
          icon: this.order.order_status_id == 6 ? "mdi-progress-clock" : null
        }
      ];
      if (this.order.vendor_id) {
        list["9"] = [
          {
            text: "Wash / Press Started",
            value: null,
            icon: this.order.order_status_id == 7 ? "mdi-progress-clock" : null
          }
        ];
      } else {
        list["8"] = [
          {
            text: "Wash / Press Started",
            value: null,
            icon: this.order.order_status_id == 7 ? "mdi-progress-clock" : null
          }
        ];
      }
      list["11"] = [
        {
          text: "Ready For Delivery",
          value: null,
          icon:
            this.order.order_status_id == 8 || this.order.order_status_id == 9
              ? "mdi-progress-clock"
              : null
        }
      ];
      if (this.order.home_delivery == 1) {
        list["12"] = [
          {
            text: "Delivery Assigned To Rider",
            value: null,
            icon: this.order.order_status_id == 11 ? "mdi-progress-clock" : null
          }
        ];
        list["13"] = [
          {
            text: "Rider Out For Delivery",
            value: null,
            icon: this.order.order_status_id == 12 ? "mdi-progress-clock" : null
          }
        ];
      }
      list["14"] = [
        {
          text: "Delivered",
          value: null,
          icon: this.order.order_status_id == 13 ? "mdi-progress-clock" : null
        }
      ];
      let l = this.order.logs.length;
      for (let i = 0; i < l; i++) {
        if (
          this.order.logs[i]["to"] == 0 ||
          this.order.logs[i]["to"] == 16 ||
          this.order.logs[i]["to"] == 17
        ) {
          this.listCancelMissed["" + this.order.logs[i]["to"]] = {
            text: this.$getOrderStatus(this.order.logs[i]["to"]),
            value: this.$dateFormat(this.order.logs[i]["created_at"], true),
            icon: "mdi-alert"
          };
        } else {
          if (list[this.order.logs[i]["to"]][0]["value"]) {
            list[this.order.logs[i]["to"]].push({
              text: list[this.order.logs[i]["to"]]["text"],
              value: this.$dateFormat(this.order.logs[i]["created_at"], true)
            });
          } else {
            list[this.order.logs[i]["to"]][0]["value"] = this.$dateFormat(
              this.order.logs[i]["created_at"],
              true
            );
          }
          if (
            +this.order.order_status_id >= +this.order.logs[i]["to"] &&
            list[this.order.logs[i]["to"]][0]["icon"] == null
          ) {
            list[this.order.logs[i]["to"]][0]["icon"] = "mdi-check";
          }
        }
      }
      return list;
    }
  }
};
</script>