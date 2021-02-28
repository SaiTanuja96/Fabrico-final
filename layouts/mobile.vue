<template>
  <v-app class="mobile" style="overflow-x: hidden;">
    <v-main>
      <nuxt />
      <v-snackbar v-model="snackbar" bottom :color="$store.state.snackbar.color" :timeout="2000">
        <div class="d-flex align-center justify-space-between">
          <div class="m-fs-t white--text">{{ $store.state.snackbar.message }}</div>
          <v-btn
            class="justify-self-end"
            icon
            @click="$store.dispatch('addSnackbar', {value:false, message:$store.state.snackbar.message, color:'accent'})"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-snackbar>
      <v-snackbar v-model="snackbarNet" bottom color="red" :timeout="-1">
        <div class="d-flex align-center justify-space-between">
          <div class="m-fs-t white--text">You are currently offline.</div>
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar.value;
      },
      set(value) {
        this.$store.dispatch("addSnackbar", {
          value: value,
          message: this.$store.state.snackbar.message,
          color: "accent"
        });
      }
    },
    snackbarNet() {
      if (this.$nuxt.isOffline) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
.m-fs-h {
  color: #3e4152 !important;
  font-weight: 600 !important;
  font-size: 1.7rem !important;
}
.m-fs-t {
  font-size: 1.07rem !important;
  font-weight: 600 !important;
  color: #3d4152 !important;
}
.m-fs-s {
  color: #282c3f !important;
  font-size: 1rem !important;
  opacity: 0.6 !important;
}
.ss-nav-container {
  padding-bottom: 300px;
  position: relative;
}
.ss-toolbar {
  z-index: 200;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1) !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.ss-bottom-toolbar {
  z-index: 200;
  box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
html {
  font-size: 14px !important;
  letter-spacing: 0;
  line-height: 1.2;
  color: #282c3f;
  font-weight: 300;
}
</style>