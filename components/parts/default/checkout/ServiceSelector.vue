<template>
  <v-list flat class="pa-0">
    <v-list-item-group v-model="selectedServices" multiple>
      <template v-for="(service,i) in services">
        <v-list-item :key="service.id" :value="service.id" :ripple="false">
          <template v-slot:default="{active}">
            <v-list-item-action>
              <v-checkbox :ripple="false" :input-value="active" readonly color="accent"></v-checkbox>
            </v-list-item-action>
            <v-list-item-avatar>
              <v-img :src="service.image" />
            </v-list-item-avatar>
            <v-list-item-content class="ml-4">
              <v-list-item-title class="m-fs-t">{{service.name}}</v-list-item-title>
              <v-list-item-subtitle
                class="m-fs-s"
              >{{ ((service.id == 4) ? 'starting ' : '') + '&#8377; ' + service.rate + '/' + service.rate_unit + ' | ' + service.turnaround_time_hr + ' Hrs'}}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-expand-transition :key="'trans' + service.id">
          <div
            :key="'div'+service.id"
            v-show="isServiceSelected(service.id) && service.addons.length"
          >
            <div :key="'addon'+service.id" class="ml-4 m-fs-s">{{service.name + ' Addons'}}</div>
            <v-list flat>
              <v-list-item-group multiple v-model="selectedAddons">
                <v-list-item
                  v-for="addon in service.addons"
                  :key="service.id + '-' +addon.id"
                  :value="service.id + '-' + addon.id"
                  :ripple="false"
                >
                  <template v-slot:default="{active}">
                    <v-list-item-action>
                      <v-checkbox :ripple="false" readonly :input-value="active" color="accent"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title class="m-fs-t">
                        {{addon.name }}
                        <span
                          class="m-fs-s"
                        >| {{ '&#8377; ' + addon.rate + '/' + addon.rate_unit}}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle class="m-fs-s">{{ addon.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </v-expand-transition>
        <v-divider :key="'d-'+service.id" class="mx-4" v-if="i < services.length - 1"/>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<<script>
import { mapState } from "vuex";
export default {
  computed: {
    selectedServices: {
      get() {
        return this.$store.state.order.services;
      },
      set(services) {
        this.$store.dispatch("addOrderServices", services);
      }
    },
    selectedAddons: {
      get() {
        return this.$store.state.order.addons;
      },
      set(addons) {
        this.$store.dispatch("addOrderAddons", addons);
      }
    },
    ...mapState(["services"])
  },
  methods: {
    isServiceSelected(serviceId) {
      if (this.selectedServices.includes(serviceId)) return true;
      else return false;
    }
  }
};
</script>