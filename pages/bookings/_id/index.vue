<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Detail #{{$route.params.id}}</v-toolbar-title>
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending || loading" class="d-flex align-center justify-center">
          <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
          <div class="m-fs-t">Invalid Booking</div>
        </div>
        <div v-else>
          <div class="d-flex justify-space-between ma-4">
            <v-btn
              class="accent--text"
              text
              :to="'/bookings/' +$route.params.id+ '/pickup-slip'"
              nuxt
              exact
              :disabled="order.order_status_id < 5 || order.order_status_id == 17 ||  order.order_type == 1"
            >Pickup Slip</v-btn>
            <v-btn
              class="accent--text"
              text
              :to="'/bookings/' +$route.params.id+ '/invoice'"
              nuxt
              exact
              :disabled="order.order_status_id < 7 || order.order_status_id == 17"
            >Invoice</v-btn>
            <v-btn
              class="accent--text"
              text
              :to="'/bookings/' +$route.params.id+ '/reschedule'"
              nuxt
              exact
            >Reschedule</v-btn>
          </div>
          <v-divider />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="$router.push('/bookings/' +  $route.params.id + '/timeline')"
          >
            <div class="m-fs-t">Status</div>
            <div class="d-flex align-center">
              <div class="m-fs-s">{{$getOrderStatus(order.order_status_id)}}</div>
              <v-btn icon class="ml-1">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex flex-column ma-4"
            v-if="order.address"
            @click="(order.order_status_id == 1 || order.order_status_id == 2 )? showAddressSelector = true : ''"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="m-fs-t">Address</div>
              <v-bottom-sheet v-model="showAddressSelector" scrollable hide-overlay>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="ml-1"
                    icon
                    v-if="order.order_status_id == 1 || order.order_status_id == 2"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
                <address-selector
                  @address-selected="addressSelectedCallback"
                  @close="showAddressSelector = false"
                />
              </v-bottom-sheet>
            </div>
            <div class="m-fs-s">{{order.address.plot_no + ', ' + order.address.address}}</div>
          </div>
          <v-divider class="mx-4" v-if="order.address" />
          <div class="d-flex justify-space-between align-center ma-4">
            <div class="m-fs-t">Booked on</div>
            <div class="m-fs-s">{{$dateFormat(order.created_date, true)}}</div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="(order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 16) ? $router.push('/bookings/' + $route.params.id + '/reschedule') : null"
          >
            <div class="m-fs-t">Pickup date</div>
            <div class="d-flex align-center">
              <div class="m-fs-s">{{$dateFormat(order.pickup_date)}}</div>
              <v-btn
                icon
                class="ml-1"
                v-if="order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 16"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="(order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 16) ? $router.push('/bookings/' + $route.params.id + '/reschedule') : null"
          >
            <div class="m-fs-t">Pickup timeslot</div>
            <div class="d-flex align-center">
              <div class="m-fs-s">{{order.pickup_timeslot.timeslot}}</div>
              <v-btn
                class="ml-1"
                icon
                v-if="order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 16"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="((order.order_status_id > 6 && order.order_status_id < 14) || order.order_status_id == 17 ) ? $router.push('/bookings/' + $route.params.id + '/reschedule') : null"
          >
            <div class="m-fs-t">Delivery date</div>
            <div class="d-flex align-center">
              <div
                class="m-fs-s"
              >{{order.delivery_date ? $dateFormat(order.delivery_date) : 'Not yet tagged.'}}</div>
              <v-btn
                class="ml-1"
                icon
                v-if="(order.order_status_id > 6 && order.order_status_id < 14) || order.order_status_id == 17"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="((order.order_status_id > 6 && order.order_status_id < 14) || order.order_status_id == 17 ) ? $router.push('/bookings/' + $route.params.id + '/reschedule') : null"
          >
            <div class="m-fs-t">Delivery timeslot</div>
            <div class="d-flex align-center">
              <div
                class="m-fs-s"
              >{{order.delivery_timeslot ? order.delivery_timeslot.timeslot : 'Not yet tagged'}}</div>
              <v-btn
                class="ml-1"
                icon
                v-if="(order.order_status_id > 6 && order.order_status_id < 14) || order.order_status_id == 17"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex flex-column ma-4"
            @click="(order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 3 || order.order_status_id == 16) ? $router.push('/bookings/'+ $route.params.id + '/instruction/pickup') : null"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="m-fs-t">Pickup instruction</div>
              <v-btn
                class="ml-1"
                icon
                v-if="order.order_status_id == 1 || order.order_status_id == 2 || order.order_status_id == 3 || order.order_status_id == 16"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div
              class="m-fs-s"
            >{{order.pickup_instruction ? order.pickup_instruction : 'Add pickup instruction for rider'}}</div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex flex-column ma-4"
            @click="((order.order_status_id >= 1 && order.order_status_id <=7) || order.order_status_id == 16) ? $router.push('/bookings/'+ $route.params.id + '/instruction/processing') : null"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="m-fs-t">Processing instruction</div>
              <v-btn
                class="ml-1"
                icon
                v-if="(order.order_status_id >= 1 && order.order_status_id <=7) || order.order_status_id == 16"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div
              class="m-fs-s"
            >{{order.processing_instruction ? order.processing_instruction : 'Add wash and press instruction'}}</div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex flex-column ma-4"
            @click="((order.order_status_id >= 1 && order.order_status_id <=12) || order.order_status_id == 17) ? $router.push('/bookings/' + $route.params.id + '/instruction/delivery') : null"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="m-fs-t">Delivery instruction</div>

              <v-btn
                class="ml-1"
                icon
                v-if="(order.order_status_id >= 1 && order.order_status_id <=12) || order.order_status_id == 17"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div
              class="m-fs-s"
            >{{order.delivery_instruction ? order.delivery_instruction : 'Add delivery instruction for rider'}}</div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="(order.order_status_id >= 5 && order.order_status_id != 16 && order.pickup_rating == null) ? $router.push('/bookings/' + $route.params.id + '/rating/pickup') : null"
          >
            <div class="m-fs-t">Pickup rating</div>
            <div class="m-fs-s">
              <v-rating
                readonly
                color="accent"
                background-color="grey lighten-1"
                :value="+(+order.pickup_rating).toFixed(1)"
                v-if="order.order_status_id >= 5 && order.order_status_id != 17"
              />
              <div v-else>Waiting for pickup</div>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="(order.order_status_id == 14 && order.delivery_rating == null) ? $router.push('/bookings/' + $route.params.id + '/rating/delivery') : null"
          >
            <div class="m-fs-t">Delivery rating</div>
            <div class="m-fs-s">
              <v-rating
                readonly
                color="accent"
                background-color="grey lighten-1"
                :value="+(+order.delivery_rating).toFixed(1)"
                v-if="order.order_status_id == 14"
              />
              <div v-else>Waiting for delivery</div>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div
            class="d-flex justify-space-between align-center ma-4"
            @click="(order.order_status_id == 14 && order.processing_rating == null) ? $router.push('/bookings/' + $route.params.id + '/rating/processing') : null"
          >
            <div class="m-fs-t">Wash / Press rating</div>
            <div class="m-fs-s">
              <v-rating
                readonly
                color="accent"
                background-color="grey lighten-1"
                :value="order.processing_rating"
                v-if="order.order_status_id == 14"
              />
              <div v-else>Waiting for delivery</div>
            </div>
          </div>
          <v-divider class="mx-4" />
          <div class="d-flex justify-space-between align-center ma-4">
            <div class="m-fs-t">Walkin / Pickup</div>
            <div class="m-fs-s">{{order.order_type == 1 ? 'Walkin' : 'Pickup'}}</div>
          </div>
          <v-divider class="mx-4" />
          <div class="d-flex justify-space-between align-center ma-4">
            <div class="m-fs-t">Home delivery</div>
            <div class="m-fs-s">{{order.home_delivery == 1 ? 'Yes' : 'No'}}</div>
          </div>
          <v-divider class="mx-4" />
          <div
            v-if="[1, 2, 3, 4, 16].includes(+order.order_status_id)"
            class="d-flex justify-space-between align-center ma-4"
            @click="$router.push('/bookings/' +$route.params.id+ '/cancel')"
          >
            <div class="m-fs-t">Cancel</div>
            <v-btn class="ml-1" icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
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
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get("/orders/" + this.$route.params.id);
    if (res.success) this.order = res.order;
    else this.$fetchState.error = res.error;
  },
  mounted() {
    if (this.$route.query.addressId) {
      this.showAddressSelector = true;
    }
  },
  data() {
    return {
      order: null,
      showAddressSelector: false,
      loading: false
    };
  },
  computed: {
    isPayNow() {}
  },
  methods: {
    async addressSelectedCallback(addressId) {
      this.showAddressSelector = false;
      if (addressId == 0) {
        this.$router.push("/add-address");
      } else {
        this.loading = true;
        this.$axios.setToken(this.$store.state.token, "Bearer");
        const resUpdate = await this.$axios.$patch(
          "/orders/" + this.$route.params.id + "/address/update",
          { addressId: addressId }
        );
        this.loading = false;
        if (resUpdate.success) {
          this.$nuxt.refresh();
        } else {
          this.$store.dispatch("addSnackbar", {
            value: true,
            message: resUpdate.error,
            color: "red"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.ss-detail-container {
  background-color: #f2f4f6;
}
</style>