<template>
  <div style="padding-top: 56px; height:100%">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <citySelectorMenu />
      </v-toolbar>
      <div class="ma-4 mt-8">
        <v-text-field
          flat
          label="Enter area, street ..."
          hint="Eg: Orchid Petals, Sector 40"
          persistent-hint
          v-model="query"
          clearable
          :loading="loading"
        ></v-text-field>
        <template v-for=" prediction in predictions">
          <addressTile
            class="my-4"
            :key="prediction.place_id"
            :address="{label: prediction.structured_formatting.main_text, address: prediction.description}"
            @click.native="handlePlaceClick(prediction.place_id)"
            v-ripple="{ center: true }"
          />
          <v-divider :key="prediction.place_id+'divider'" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from "vue-uuid";
import addressTile from "@/components/parts/addressTile";
import citySelectorMenu from "@/components/parts/citySelectorMenu";
export default {
  layout: "mobile",
  middleware: ["isMobile", "redirectOnAddressSave"],
  components: { addressTile, citySelectorMenu },
  data() {
    return {
      _timerId: null,
      loading: false
    };
  },
  created() {
    this.sessionToken = uuid.v4();
  },
  computed: {
    sQuery() {
      return (
        this.$store.getters.getSelectedCityName +
        " " +
        (this.query ? this.query : "")
      );
    },
    predictions: {
      get() {
        return this.$store.state.addressForm.predictions;
      },
      set(val) {
        this.$store.dispatch("addAddressFormPredictions", val);
      }
    },
    query: {
      get() {
        return this.$store.state.addressForm.query;
      },
      set(val) {
        this.$store.dispatch("addAddressFormQuery", val);
      }
    },
    sessionToken: {
      get() {
        return this.$store.state.addressForm.sessionToken;
      },
      set(val) {
        this.$store.dispatch("addAddressFormSessionToken", val);
      }
    },
    placeId: {
      get() {
        return this.$store.state.addressForm.placeId;
      },
      set(val) {
        this.$store.dispatch("addAddressFormPlaceId", val);
      }
    }
  },
  watch: {
    sQuery(newValue, oldValue) {
      if (
        newValue &&
        newValue.length > this.$store.getters.getSelectedCityName.length + 4
      ) {
        this.fetchAutocompleteDebounced();
      }
    }
  },
  methods: {
    fetchAutocompleteDebounced() {
      if (this._timerId) clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        this.fetchAutocomplete();
      }, 500);
    },
    async fetchAutocomplete() {
      this.loading = true;
      const res = await this.$axios.$get(
        "/mapi/autocomplete?input=" +
          this.sQuery +
          "&sessiontoken=" +
          this.sessionToken
      );
      this.loading = false;
      this.predictions = res.predictions;
    },
    handlePlaceClick(placeId) {
      this.placeId = placeId;
      this.$router.push({
        name: "add-address-locate"
      });
    }
  }
};
</script>