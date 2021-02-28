<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Pickup Slip #{{$route.params.id}}</v-toolbar-title>
      </v-toolbar>
      <div>
        <div v-if="$fetchState.pending || loading" class="d-flex align-center justify-center">
          <v-progress-linear height="4" indeterminate rounded color="accent"></v-progress-linear>
        </div>
        <div v-else-if="$fetchState.error" class="d-flex align-center justify-center ma-4 mt-10">
          <div class="m-fs-t">Invalid Booking</div>
        </div>
        <div v-else>
          <div class="m-fs-s ma-4">{{$dateFormat(pickupSlips[0].created_at, true)}}</div>
          <div class="ma-4" v-for="pickupSlip in pickupSlips" :key="pickupSlip.id">
            <div class="m-fs-t text-decoration-underline">{{pickupSlip.service.name}}</div>
            <div class="d-flex justify-space-between">
              <div class="m-fs-s">Clothes Count</div>
              <div class="m-fs-t">{{pickupSlip.count}} pc</div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="m-fs-s">Clothes Weight</div>
              <div class="m-fs-t">{{pickupSlip.weight}} kg</div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="m-fs-s">Antiseptic Wash</div>
              <div class="m-fs-t">{{pickupSlip.antiseptic_wash ? 'Yes' : 'No'}}</div>
            </div>
            <div class="d-flex justify-space-between">
              <div class="m-fs-s">Fabric Softener</div>
              <div class="m-fs-t">{{pickupSlip.fabric_softener ? 'Yes' : 'No'}}</div>
            </div>
            <div class="d-flex flex-column" v-if="pickupSlip.remark">
              <div class="m-fs-s">Remark</div>
              <div class="m-fs-t">{{pickupSlip.remark}}</div>
            </div>
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
    this.loading = true;
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const res = await this.$axios.$get(
      "/orders/" + this.$route.params.id + "/pickup-slip"
    );
    this.loading = false;
    console.log(res);
    if (res.success) this.pickupSlips = res.pickupSlips;
    else this.$fetchState.error = res.error;
  },
  data() {
    return {
      pickupSlips: null,
      loading: false
    };
  }
};
</script>