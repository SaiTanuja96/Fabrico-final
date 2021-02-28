<template>
  <div style="height:100%; position: relative">
    <div class="absolute-top d-flex align-center">
      <v-btn icon @click="$router.replace('/add-address')" class="ml-1">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span class="text-subtitle-2 font-weight-bold ml-4">Adjust your location</span>
    </div>
    <div style="position:relative; height: 100%; overflow: hidden">
      <GmapMap
        @center_changed="handleCenterChange"
        :center="iCenter"
        :zoom="18"
        style="width: 100%; height: 100%"
        :options="{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy',
            clickableIcons: false
            }"
      ></GmapMap>
      <div class="animated-div"></div>
      <div class="map-marker"></div>
      <div class="continue d-flex align-center">
        <v-text-field
          class="ml-4"
          dense
          solo
          hide-details
          readonly
          @click="$router.replace('/add-address')"
          :value="$store.state.addressForm.address"
        />
        <v-btn
          color="accent"
          fab
          class="mr-4 ml-2"
          :loading="loading"
          to="/add-address/save"
          nuxt
          exact
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  fetchOnServer: true,
  async fetch() {
    this.loading = true;
    const res = await this.$axios.$get(
      "/mapi/place-detail?place_id=" +
        this.$store.state.addressForm.placeId +
        "&sessiontoken=" +
        this.$store.state.addressForm.sessionToken
    );
    this.loading = false;
    this.address = res["result"]["formatted_address"];
    this.iCenter.lat = res["result"]["geometry"]["location"]["lat"];
    this.iCenter.lng = res["result"]["geometry"]["location"]["lng"];
    this.center.lat = res["result"]["geometry"]["location"]["lat"];
    this.center.lng = res["result"]["geometry"]["location"]["lng"];
    this.lat = res["result"]["geometry"]["location"]["lat"];
    this.lng = res["result"]["geometry"]["location"]["lng"];
  },
  data() {
    return {
      iCenter: { lat: 0, lng: 0 },
      center: { lat: 0, lng: 0 },
      _timerId: null,
      loading: false
    };
  },
  computed: {
    lat: {
      get() {
        console.log(this.$store.state.addressForm.lat);
      },
      set(val) {
        this.$store.dispatch("addAddressFormLat", val);
      }
    },
    lng: {
      get() {
        this.$store.state.addressForm.lng;
      },
      set(val) {
        this.$store.dispatch("addAddressFormLng", val);
      }
    },
    address: {
      get() {
        this.$store.state.addressForm.address;
      },
      set(val) {
        this.$store.dispatch("addAddressFormAddress", val);
      }
    }
  },
  methods: {
    handleCenterChange(_center) {
      this.center.lat = _center.lat();
      this.center.lng = _center.lng();
      this.fetchGeocodeDebounced();
    },
    fetchGeocodeDebounced() {
      if (this._timerId) clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.fetchGeocode();
      }, 500);
    },
    async fetchGeocode() {
      this.loading = true;
      const res = await this.$axios.$get(
        "/mapi/geocode?latlng=" + this.center.lat + "," + this.center.lng
      );
      this.address = res.results[0].formatted_address;
      this.loading = false;
    }
  }
};
</script>
<style scoped>
.absolute-top {
  z-index: 6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 12px 0 0;
  height: 52px;
  background: white;
}
.animated-div {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  height: 8px;
  width: 8px;
  transform: translate(-50%, -50%);
  animation: flow-out 1.2s ease-out infinite;
  animation-delay: 1s;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid #000;
  border-radius: 100%;
  pointer-events: none;
  box-sizing: border-box;
  will-change: transform;
}
@keyframes flow-out {
  from {
    width: 8px;
    height: 8px;
  }
  to {
    width: 64px;
    height: 64px;
  }
}
.map-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 36px;
  background-image: url("/map_marker.png");
  transform: translate(-50%, -100%);
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none;
  will-change: transform;
}
.continue {
  position: absolute;
  bottom: 128px;
  left: 0;
  right: 0;
}
</style>