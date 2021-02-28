<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="128">{{errorIcon}}</v-icon>
      </v-col>
      <v-col cols="12" class="text-h6 text-center">{{errorLabel}}</v-col>
      <v-col cols="12" class="text-title text-center">{{errorMessage}}</v-col>
      <v-col cols="12" class="text-center">
        <v-btn to="/" nuxt exact text class="accent">Go to Homepage</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    errorIcon() {
      switch (this.error.statusCode) {
        case 404:
          return "mdi-alien";
          break;
        case 500:
          return "mdi-water-alert";
          break;
        default:
          return "mdi-ghost";
          break;
      }
    },
    errorLabel() {
      switch (this.error.statusCode) {
        case 404:
          return "Area 404, Alien Zone!";
          break;
        case 500:
          return "Maintenance Work!";
          break;
        default:
          return "Aww! Ghosted";
          break;
      }
    },
    errorMessage() {
      switch (this.error.statusCode) {
        case 404:
          return "Page moved or doesn't exist.";
          break;
        case 500:
          return "Have patience, Try in an hour.";
          break;
        default:
          return "Unknown request";
          break;
      }
    },
    title() {
      switch (this.error.statusCode) {
        case 404:
          return "Page Not Found";
          break;
        case 500:
          return "Server Maintenance";
          break;
        default:
          return "Unknown Request";
          break;
      }
    }
  },
  head() {
    const title = this.title;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
