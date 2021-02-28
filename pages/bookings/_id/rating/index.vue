<template>
  <div style="padding-top: 56px; height:100%; ">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Rating</v-toolbar-title>
      </v-toolbar>
      <div class="ma-4">
        <rating :type="'processing'" />
      </div>
    </div>
  </div>
</template>
<script>
import rating from "@/components/parts/rating";
export default {
  middleware: "isMobile",
  layout: "mobile",
  components: {
    rating
  }
};
</script>