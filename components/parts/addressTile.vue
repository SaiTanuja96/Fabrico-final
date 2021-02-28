<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-center">
      <v-icon>{{addressIcon}}</v-icon>
      <span class="ml-2 m-fs-t">{{address.label}}</span>
    </div>
    <div
      class="ml-1 mt-1 m-fs-s"
    >{{(address.plot_no ? (address.plot_no + ', ') : '') + address.address}}</div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  computed: {
    addressIcon() {
      let addressIcon = "mdi-map-marker";
      if (this.address.label.toLowerCase() == "home")
        addressIcon = "mdi-home-map-marker";
      if (this.address.label.toLowerCase() == "office")
        addressIcon = "mdi-office-building-marker";
      if (this.address.label.toLowerCase() == "add new address")
        addressIcon = "mdi-map-marker-plus";
      return addressIcon;
    }
  }
};
</script>