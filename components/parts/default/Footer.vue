<template>
  <v-footer dark padless color="primary">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" class="py-4">
          <v-btn
            v-for="(link,i) in footerLinks"
            :key="i"
            color="white"
            text
            class="mr-8"
            :link="true"
            :to="link.link"
            nuxt
          >{{ link.label }}</v-btn>
        </v-col>
        <v-col cols="12" class="py-4" style="border-top: 1px solid #424242">
          <p class="mb-2">Serving in</p>
          <v-btn
            v-for="(city) in cities"
            :key="city.id"
            color="white--text"
            text
            :to="'laundry-dryclean-in-' + city.name"
            class="mr-8"
            nuxt
          >{{ city.name }}</v-btn>
        </v-col>
        <v-row
          style="border-top: 1px solid #424242"
          class="py-4"
          align="center"
          :justify="$device.isDesktop ? 'start' : 'center'"
          no-gutters
        >
          <a
            href="/"
            class="d-flex align-center router-link-active mr-4"
            aria-label="Fabrico Home Page"
            title="Fabrico Home Page"
            style="text-decoration: none;"
            color="white"
          >
            <v-img
              src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/logo/logo-full-white.png"
              width="128"
              height="48"
              class="shrink"
              contain
            ></v-img>
          </a>
          <div
            class="mr-4 text-caption"
          >&#169; {{new Date().getFullYear()}} Fabrico Cleaning Solutions Private Limited</div>

          <div class="mr-4">
            <v-btn text icon to="https://www.facebook.com/fabricolaundry">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn text icon to="https://www.instagram.com/fabricolaundry">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn text icon to="https://www.linkedin.com/company/fabricolaundry">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn text icon to="https://www.twitter.com/fabricolaundry">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn text icon to="https://www.facebook.com/fabricolaundry">
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
          </div>
          <div class="d-flex">
            <div>
              <v-img src="/appstore.png" width="144" height="48"></v-img>
            </div>
            <div>
              <v-img src="/googleplay.png" width="144" height="48"></v-img>
            </div>
          </div>
        </v-row>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["cities"])
  },
  data() {
    return {
      footerLinks: [
        { label: "About Us", link: "/about" },
        { label: "Services", link: "/services" },
          { label: "Mission&Vision", link: "/mission" },

        { label: "Terms & Conditions", link: "/terms" },
        { label: "Privacy Policy", link: "/privacy-policy" },
        { label: "Near Me", link: "/laundry-near-me" },
        { label: "Careers", link: "/career" },
        { label: "Contact Us", link: "/contact" },
        { label: "Franchise", link: "/laundry-franchise-business-opportunity" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.v-btn:hover:before {
  opacity: 0 !important;
}
.v-btn {
  padding: 0 !important;
  text-transform: capitalize !important;
  opacity: 0.8 !important;
  transition: opacity 0.2s;
}
.v-btn:hover {
  opacity: 1 !important;
}
.mobile {
  .v-btn {
    font-size: 0.976rem;
  }
}
</style>