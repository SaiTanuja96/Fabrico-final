<template>
  <div>
    <div style="position: relative; height: 210px">
      <div style="height: 100%">
        <v-img
          src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/website/home/hero3.jpg"
          height="210px"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="accent"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div
          style="position: absolute; height: 50%; width: 100%; bottom: 0; left: 0; text-align: center; z-index: 3;"
        >
          <div
            style="height: 101%; width: 100%; background: #020024; background: linear-gradient(180deg,transparent,#000);"
          ></div>
          <div
            style="width: 136px; height: 48px; position: absolute; bottom: 0; left: 0; right: 0; margin: 0 auto; z-index: 3;"
          >
            <v-img src="/logo.png" contain></v-img>
          </div>
        </div>
      </div>
    </div>
    <div class="primary py-8 text-center" v-intersect="onIntersect">
      <h1 class="white--text m-fs-h">Laundry & Dryclean Expert</h1>
    </div>
    <div class="accent m-fs-t pt-4 text-center text-capitalize">
      <span class="m-fs-s">Upto</span> FLAT 50% OFF
      <span class="m-fs-s">, Use Coupon</span> FIRST50
    </div>
    <BookingToolbar :extraClass="toolbarFixed" />
    <div style="height: 64px" :class="isToolbarFixed"></div>
    <div class="my-4 d-flex overflow-x-auto carousel" style="width:100%">
      <div v-for="(banner, i) in banners" :key="banner.id">
        <v-card
          flat
          class="ml-4"
          :class="{'mr-4': i == banners.length-1}"
          outlined
          @click="handleBookingClick(null)"
        >
          <v-img :src="banner.url" height="128" width="248" contain></v-img>
        </v-card>
      </div>
    </div>
    <div style="border-top:16px solid #f2f4f6;">
      <v-row align="center" class="ml-4 mt-8 mb-6">
        <h2>Laundry services tailored for you</h2>
      </v-row>
      <v-row class="ma-4" v-for="service in services" :key="service.id">
        <v-card
          flat
          outlined
          class="mb-4"
          min-height="180"
          width="100%"
          @click="handleBookingClick(service.id)"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="m-fs-t" v-text="service.name"></v-card-title>
              <v-card-subtitle class="m-fs-s" v-text="service.description"></v-card-subtitle>
              <v-card-title
                class="m-fs-t"
              >{{ ((service.id == 4) ? 'starting ' : '') + '&#8377; ' + service.rate + '/' + service.rate_unit}}</v-card-title>
              <v-card-subtitle
                class="m-fs-s"
              >{{'Delivers in ' + service.turnaround_time_hr + ' Hrs'}}</v-card-subtitle>
            </div>
            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="service.image"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-row>
    </div>
    <div style="border-top:16px solid #f2f4f6;">
      <v-row align="center" class="mt-8 ml-4">
        <h2>Why Fabrico Laundry?</h2>
      </v-row>
      <v-list three-line>
        <template v-for="(item) in whyFabrico">
          <v-list-item :key="item.title">
            <v-icon color="accent" class="mr-4">{{item.avatar}}</v-icon>
            <v-list-item-content>
              <v-list-item-title class="m-fs-t" v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle class="m-fs-s" v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
    <div style="border-top:16px solid #f2f4f6;">
      <v-row align="center" class="my-6 ml-4">
        <h2>How easy it is?</h2>
      </v-row>
      <template v-for="(item, i) in orderSteps">
        <div class="d-flex mx-4 align-end" :key="item.title">
          <v-icon color="accent" class="mr-3">{{'mdi-numeric-' + (i+1) + '-box'}}</v-icon>
          <div class="m-fs-t">{{item.title}}</div>
        </div>
        <div class="m-fs-s mx-4 mb-4 mt-2" :key="'desc-'+item.title">{{item.description}}</div>
      </template>
      <div class="align-center justify-center d-flex">
        <v-card color="accent" class="mt-8 pb-4" width="100%">
          <v-row justify="center">
            <v-icon size="128" color="white">mdi-tshirt-crew-outline</v-icon>
          </v-row>
          <v-row justify="center">
            <h1 class="white--text text-h6 font-weight-bold">100% Cleaniness Guranteed</h1>
          </v-row>
        </v-card>
      </div>
    </div>
    <div class="pb-14">
      <Footer></Footer>
    </div>
    <BottomNavigation />
  </div>
</template>

<script>
import BookingToolbar from "@/components/parts/BookingToolbar";
import Footer from "@/components/parts/default/Footer";
import BottomNavigation from "@/components/parts/BottomNavigation";
import { mapState } from "vuex";

export default {
  components: { BookingToolbar, Footer, BottomNavigation },
  watch: {},
  computed: {
    isToolbarFixed() {
      if (this.toolbarFixed == "") {
        return "d-none";
      } else if (this.toolbarFixed == "toolbar-sticky") {
        return "d-flex";
      }
    },
    ...mapState(["banners", "services"])
  },
  methods: {
    onIntersect(entries, observer) {
      if (entries[0].isIntersecting) {
        this.toolbarFixed = "";
      } else {
        this.toolbarFixed = "toolbar-sticky";
      }
    },
    handleBookingClick(serviceId) {
      if (serviceId) this.$store.dispatch("addOrderServices", [serviceId]);
      this.$router.push("/checkout");
    }
  },
  mounted() {},
  data() {
    return {
      toolbarFixed: "",
      whyFabrico: [
        {
          avatar: "mdi-timeline-check",
          title: "Timeslot based pickup and drop",
          subtitle: "Guranteed pickup and drop at your convenient timeslots."
        },
        {
          avatar: "mdi-tag-heart-outline",
          title: "No more missing garments and color bleed",
          subtitle:
            "Be assured, Each and every clothes are barcode tagged and seggarated based on color."
        },
        {
          avatar: "mdi-cash-check",
          title: "Pay as per your convenience",
          subtitle:
            "Pay through net banking, card, wallet, or cash. Choice is yours."
        },
        {
          avatar: "mdi-professional-hexagon",
          title: "Experienced laundry and dryclean experts",
          subtitle:
            "Don't wrestle with a stubborn stain on your clothes, let us take care of that."
        }
      ],
      orderSteps: [
        {
          title: "Book your order",
          description:
            "Select one or more services, appropriate pickup timeslot, and the pickup address."
        },
        {
          title: "Rider comes for pickup",
          description:
            "Rider comes to your pickup address and pickup your laundry. An online pickup slip is sent to your mobile."
        },
        {
          title: "Order is being processed",
          description:
            "Your order is tagged and simultaneously invoice is generated. You are being notified to make payment and your clothes are washed."
        },
        {
          title: "Rider delivers your order",
          description:
            "After proper washing and packaging of your clothes, Rider delivers to your address at your specified given timeslot."
        }
      ]
    };
  }
};
</script>