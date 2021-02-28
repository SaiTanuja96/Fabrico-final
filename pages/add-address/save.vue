<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.replace('/add-address/locate')">
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
        <v-text-field autofocus v-model="flatNo" label="HOUSE/ FLAT NO"></v-text-field>
        <v-text-field v-model="landmark" label="LANDMARK"></v-text-field>
        <span class="m-fs-s">SAVE AS</span>
        <v-fade-transition>
          <v-chip-group mandatory v-model="label" active-class="accent">
            <v-chip class="text-caption font-weight-bold" value="Home">HOME</v-chip>
            <v-chip class="text-caption font-weight-bold" value="Office">OFFICE</v-chip>
            <v-chip class="text-caption font-weight-bold" value="Other">OTHER</v-chip>
          </v-chip-group>
        </v-fade-transition>
        <v-expand-transition>
          <v-text-field v-show="label == 'Other'" hide-details autofocus v-model="otherLabel">
            <template v-slot:append>
              <v-btn color="accent" text @click="label = 'Home'">CANCEL</v-btn>
            </template>
          </v-text-field>
        </v-expand-transition>
        <v-expand-transition>
          <v-btn
            class="mt-8"
            color="accent"
            block
            v-show="!invalidForm"
            @click="saveAddress"
            :loading="loading"
          >SAVE ADDRESS</v-btn>
        </v-expand-transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "isMobile",
  layout: "mobile",
  validate({ store, redirect }) {
    if (
      store.state.addressForm.address &&
      store.state.addressForm.lat &&
      store.state.addressForm.lng
    )
      return true;
    redirect("/add-address");
  },
  data() {
    return {
      label: "Home",
      otherLabel: "",
      flatNo: "",
      landmark: "",
      loading: false
    };
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
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Address Added",
          color: "accent"
        });
        this.$router.replace({
          path: this.$store.state.addressForm.redirectOnSave,
          query: { addressId: res.address.id }
        });
      } else {
        //TODO: snackbar
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