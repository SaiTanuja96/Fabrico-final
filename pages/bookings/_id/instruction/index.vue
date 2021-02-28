<template>
  <div style="padding-top: 56px; height:100%; ">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Instruction</v-toolbar-title>
      </v-toolbar>
      <div class="ma-4">
        <instruction :type="'processing'" />
      </div>
    </div>
  </div>
</template>
<script>
import instruction from "@/components/parts/instruction";
export default {
  middleware: "isMobile",
  layout: "mobile",
  components: {
    instruction
  }
};
</script>