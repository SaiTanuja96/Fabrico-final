<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="m-fs-t">{{heading}}</div>
    <div class="m-fs-s mt-1">{{description}}</div>
    <div class="d-flex my-8 align-center">
      <v-rating
        color="accent"
        background-color="grey lighten-1"
        hover
        size="32"
        v-model="rating"
        half-increments
      ></v-rating>
      ({{rating.toFixed(1)}})
    </div>
    <v-btn class="accent my-8" @click="submit" :loading="loading" :disabled="!rating">Rate {{type}}</v-btn>
  </div>
</template> 
<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    heading() {
      switch (this.type) {
        case "pickup":
          return "Rate your pickup experience with us";
          break;
        case "processing":
          return "Rate how well were your clothes cleaned and pressed";
          break;
        case "delivery":
          return "Rate your delivery experience with us";
        default:
          break;
      }
    },
    description() {
      switch (this.type) {
        case "pickup":
          return "Your pickup rating directly influence the performance of store and the rider. This in turn help us in improving the quality and experience of Fabrico with you.";
          break;
        case "processing":
          return "Your processing rating directly influence the performance of processing store. This in turn help us in improving the quality and experience of Fabrico with you.";
          break;
        case "delivery":
          return "Your delivery rating directly influence the performance of store and the rider. This in turn help us in improving the quality and experience of Fabrico with you.";
        default:
          break;
      }
    },
  },
  data() {
    return {
      loading: false,
      rating: 0.0,
      rules: {
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      let key = this.type + "Rating";
      let updateField = {};
      updateField[key] = this.rating;
      const res = await this.$axios.$patch(
        "/orders/" + this.$route.params.id + "/rating/update",
        updateField
      );
      this.loading = false;
      if (res.success) {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Rated",
          color: "accent"
        });
        this.$router.go(-1);
      } else {
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