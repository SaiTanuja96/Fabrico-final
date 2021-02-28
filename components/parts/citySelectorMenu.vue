<template>
  <v-menu bottom origin="center center" color="white" transition="scale-transition" eager>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" class="mr-2">
        {{$store.getters.getSelectedCityName}}
        <v-icon>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="cityId" mandatory>
        <v-list-item v-for="(city) in $store.state.cities" :key="city.id" :value="city.id" dense>
          <v-list-item-title>{{ city.name }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  computed: {
    cityId: {
      get() {
        return this.$store.state.cityId;
      },
      set(val) {
        this.$store.dispatch("addCityId", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mobile {
  .v-btn {
    padding: 0;
    font-size: 0.8rem;
  }
}
.v-btn {
  padding: 0;
}
</style>