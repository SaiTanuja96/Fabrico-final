<template>
  <v-app-bar fixed :elevate-on-scroll="elevateOnScroll" color="white">
    <a
      href="/"
      class="d-flex align-center ml-lg-16 ml-md-8"
      aria-label="Fabrico Home Page"
      title="Fabrico Home Page"
      style="text-decoration: none;"
    >
      <v-img
        src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/logo/logo-full-black.png"
        width="136"
        height="60"
        class="shrink"
        contain
      ></v-img>
    </a>
    <v-spacer />
    <div class="ml-16 px-4 rounded grey lighten-3" v-if="hasBookingToolbar">
      <BookingToolbar height="48px" color="grey lighten-3" />
    </div>

    <v-btn text class="ml-4">
      <v-icon class="mr-1">mdi-receipt</v-icon>Pricing
    </v-btn>
    <v-btn text class="ml-4">
      <v-icon class="mr-1">mdi-clipboard-text</v-icon>Bookings
    </v-btn>
    <v-btn text class="ml-4">
      <v-icon class="mr-1">mdi-wallet-giftcard</v-icon>Rewards
    </v-btn>
    <v-btn text class="ml-4 mr-lg-16 mr-md-8">
      <v-icon class="mr-1">mdi-account-circle</v-icon>
      {{$store.state.token ? $store.state.user.name : 'Login / Signup'}}
    </v-btn>
  </v-app-bar>
</template>

<script>
import BookingToolbar from "@/components/parts/BookingToolbar";
export default {
  props: {
    hasBookingToolbar: {
      type: Boolean,
      default: true
    },
    elevateOnScroll: {
      type: Boolean,
      default: true
    }
  },
  components: {
    BookingToolbar
  }
};
</script>