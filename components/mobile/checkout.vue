<template>
  <div style="padding-top: 56px; height:100%;">
    <div class="ss-nav-container">
      <v-toolbar class="ss-toolbar" height="52px">
        <v-btn icon to="/" nuxt>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="m-fs-t">Services & Addons</v-toolbar-title>
        <v-spacer />
        <v-badge
          color="accent black--text"
          left
          inline
          :value="$store.state.order.services.length"
          :content="$store.state.order.services.length"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-toolbar>
      <div>
        <div class="ma-4 mt-6 d-flex align-center">
          <div class="m-fs-s">Select one or more services and addons</div>
        </div>
        <v-list flat class="pa-0">
          <v-list-item-group v-model="selectedServices" multiple>
            <template v-for="service in services">
              <v-list-item :key="service.id" :value="service.id" :ripple="false">
                <template v-slot:default="{active}">
                  <v-list-item-action>
                    <v-checkbox :ripple="false" :input-value="active" readonly color="accent"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
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
                            <v-checkbox
                              :ripple="false"
                              readonly
                              :input-value="active"
                              color="accent"
                            ></v-checkbox>
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
              <v-divider :key="'d-'+service.id" class="mx-4" />
            </template>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
    <v-btn
      v-if="selectedServices.length > 0"
      class="ss-bottom-toolbar accent elevation-8"
      to="/checkout/pickup-timeslot"
      block
      height="52px"
      nuxt
      tile
    >
      continue
      <v-icon right>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
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