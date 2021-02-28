<template>
  <div class="d-flex flex-column">
    <div class="m-fs-s">{{heading}}</div>
    <v-textarea
      class="ma-4"
      v-model="instruction"
      :label="'Enter ' + type + ' instruction'"
      filled
      auto-grow
      :rules="[rules.maxChar, rules.required]"
      rows="4"
      row-height="30"
      counter="200"
    ></v-textarea>
    <v-btn
      class="accent"
      @click="submit"
      :loading="loading"
      :disabled="instruction.length < 5 || instruction.length > 200"
    >Send Instruction</v-btn>
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
          return "Give any instruction that will be useful for our rider to carry out pickup process.";
          break;
        case "processing":
          return "Give any instruction that you required to be taken care of while washing and pressing of your garments.";
          break;
        case "delivery":
          return "Give any instruction that will be useful for our rider to carry out delivery of your garments";
        default:
          break;
      }
    }
  },
  data() {
    return {
      loading: false,
      instruction: "",
      rules: {
        maxChar: v =>
          (v || "").length <= 200 ||
          "Description must be 200 characters or less",
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      this.$axios.setToken(this.$store.state.token, "Bearer");
      let key = this.type + "Instruction";
      let updateField = {};
      updateField[key] = this.instruction;
      const res = await this.$axios.$patch(
        "/orders/" + this.$route.params.id + "/instruction/update",
        updateField
      );
      this.loading = false;
      if (res.success) {
        this.$store.dispatch("addSnackbar", {
          value: true,
          message: "Instruction noted.",
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