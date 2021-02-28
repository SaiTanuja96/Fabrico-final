<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon to="/" nuxt exact>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Bookings</v-toolbar-title>
      </v-toolbar>
      <div class="ma-4 d-flex align-center justify-center">
        <v-btn tile depressed large to="/bookings" nuxt exact>ONGOING</v-btn>
        <v-btn tile large depressed color="accent" to="/bookings/history" nuxt exact>
          <div class="d-flex flex-column align-center">
            <span>HISTORY</span>
            <span>{{this.total}}</span>
          </div>
        </v-btn>
      </div>
      <div v-for="order in orders" :key="order.id" class="mx-4 mb-4">
        <OrderOverview :order="order" class="pa-4 pb-0" />
      </div>
      <div class="mx-4">
        <v-btn :loading="loading" outlined color="accent" block @click="fetch">{{btnText}}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import OrderOverview from "@/components/parts/OrderOverview";
export default {
  layout: "mobile",
  middleware: "isMobile",
  components: {
    OrderOverview: OrderOverview
  },
  methods: {
    fetch() {
      this.$fetch();
    }
  },
  computed: {
    btnText() {
      let text = this.cPage < this.lPage ? "Load More" : "No More Bookings";
      return text;
    }
  },
  async fetch() {
    if (this.cPage >= this.lPage) {
      return;
    }
    this.loading = true;
    this.$axios.setToken(this.$store.state.token, "Bearer");
    const orders = await this.$axios.$get(
      "/orders?page=" + (this.cPage + 1) + "&completed=1"
    );
    if (orders) {
      let l = orders.data.length;
      for (let i = 0; i < l; i++) {
        this.orders.push(orders.data[i]);
      }
      this.cPage = orders.current_page;
      this.lPage = orders.last_page;
      this.total = orders.total;
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
      orders: [],
      loading: false,
      cPage: 0,
      lPage: 1,
      total: 0
    };
  }
};
</script>