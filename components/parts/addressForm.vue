<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.replace('/add-address/map')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Save Address</v-toolbar-title>
      </v-toolbar>
      <div class="ma-4 mt-8">
        <v-text-field
          :value="$store.state.addressForm.address"
          label="ADDRESS"
          readonly
          @click="$router.replace('/add-address')"
        ></v-text-field>
        <v-text-field ref="flat" v-model="flatNo" label="HOUSE/ FLAT NO"></v-text-field>
        <v-text-field v-model="landmark" label="LANDMARK"></v-text-field>
        <span class="m-fs-s">SAVE AS</span>
        <v-fade-transition hide-on-leave v-if="label != 'Other'">
          <v-chip-group mandatory v-model="label" active-class="accent">
            <v-chip class="text-caption font-weight-bold" value="Home">HOME</v-chip>
            <v-chip class="text-caption font-weight-bold" value="Office">OFFICE</v-chip>
            <v-chip class="text-caption font-weight-bold" value="Other">OTHER</v-chip>
          </v-chip-group>
        </v-fade-transition>
        <v-fade-transition hide-on-leave v-else>
          <v-text-field dense hide-details append-icon="mdi-close" autofocus v-model="otherLabel">
            <template v-slot:append>
              <v-btn color="accent" text @click="label = 'Home'">CANCEL</v-btn>
            </template>
          </v-text-field>
        </v-fade-transition>
        <v-btn
          class="mt-8"
          color="accent"
          block
          v-if="!invalidForm"
          @click="saveAddress"
          :loading="loading"
        >SAVE ADDRESS</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: "Home",
      otherLabel: "",
      flatNo: "",
      landmark: "",
      loading: false
    };
  },
  mounted() {
    this.$nextTick(this.$refs.flat.focus);
  },
  computed: {
    invalidForm() {
      if (this.flatNo == "" || this.landmark == "") return true;
      if (this.label == "Other" && this.otherLabel == "") return true;
      return false;
    }
  },
  methods: {
    async saveAddress() {
      this.loading = true;
      let _label = this.label;
      if (_label == "Other") _label = this.otherLabel;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      const res = await this.$axios.$post("/address", {
        address: this.$store.state.addressForm.address,
        label: _label,
        flatNo: this.flatNo,
        landmark: this.landmark,
        lat: this.$store.state.addressForm.lat,
        lng: this.$store.state.addressForm.lng
      });
      this.loading = false;
      if (res.success) {
        this.$store.dispatch("addAddress", res.address);
        this.$store.dispatch("addOrderAddressId", res.address.id);
        this.$router.go(-3);
      } else {
        //TODO: snackbar
      }
    }
  }
};
</script>