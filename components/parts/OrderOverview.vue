<template>
  <v-card outlined :ripple="false">
    <div class="d-flex align-end justify-space-between">
      <div class="d-flex">
        <div class="m-fs-s">Booking #</div>
        <div class="m-fs-t">{{order.id}}</div>
      </div>
      <div class="d-flex">
        <div class="m-fs-s">{{$dateFormat(order.created_at, true)}}</div>
      </div>
    </div>
    <v-divider />
    <div class="d-flex justify-center flex-column align-center ma-4">
      <div class="m-fs-t">{{orderStatusText(order.order_status_id)}}</div>
      <v-btn text color="accent" :to="'/bookings/' + order.id + '/timeline'">View Timeline</v-btn>
    </div>
    <!-- <div class="d-flex justify-center align-center mb-4">
      <v-chip v-if="order.order_type == 0" outlined :ripple="false">Pickup</v-chip>
      <v-chip v-if="order.order_type == 1" outlined :ripple="false">Walkin</v-chip>
      <v-chip v-if="order.home_delivery == 1" class="ml-2" outlined :ripple="false">Home Delivery</v-chip>
    </div>-->
    <v-divider />
    <div class="d-flex justify-space-between">
      <div class="flex-grow-1 flex-shrink-1">
        <v-btn tile :ripple="false" text block :to="'/bookings/' + order.id + '/help'">NEED HELP ?</v-btn>
      </div>
      <div class="flex-grow-1 flex-shrink-1 d-flex">
        <v-divider vertical />
        <v-btn tile :ripple="false" text block :to="'/bookings/' + order.id">VIEW DETAIL</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    orderStatusText(orderStatusId) {
      switch (orderStatusId) {
        case 0:
          return "Cancelled";
          break;
        case 1:
          return "Waiting For Confirmation";
          break;
        case 2:
          return "Confirmed";
          break;
        case 3:
          return "Pickup Assigned To Rider";
          break;
        case 4:
          return "Rider Out For Pickup";
          break;
        case 5:
          return "Pickup Completed";
          break;
        case 6:
          return "Received At Center";
          break;
        case 7:
          return "Tagged / Bill Generated";
          break;
        case 8:
        case 9:
        case 10:
          return "Wash / Press Started";
          break;
        case 11:
          return "Ready For Delivery";
          break;
        case 12:
          return "Delivery Assigned To Rider";
          break;
        case 13:
          return "Rider Out For Delivery";
          break;
        case 14:
        case 15:
          return "Delivered";
          break;
        case 16:
          return "Pickup Missed";
          break;
        case 17:
          return "Delivery Missed";
          break;
        default:
          break;
      }
    }
  }
};
</script>