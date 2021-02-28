<template>
  <div style="padding-top: 64px">
    <Appbar />
    <div
      class="d-flex overflow-x-auto carousel grey lighten-5 align-center justify-space-around"
      style="width:100%; height: 328px"
    >
      <div v-for="(banner, i) in $store.state.banners" :key="banner.id">
        <v-card
          flat
          class="ml-4"
          :class="{'mr-4': i == $store.state.banners.length-1}"
          outlined
          @click="handleBookingClick(null)"
        >
          <v-img :src="banner.url" height="260" width="260" contain></v-img>
        </v-card>
      </div>
    </div>
    <div class="d-flex justify-center" style="position:relative">
      <div class="d-flex flex-column align-center mt-8">
        <h1 class="text-h3 font-weight-bold">Laundry & Dryclean Expert</h1>
        <div class="mt-8" style="min-height: 32px;">
          <vue-typer caret-animation='expand' :text="['Free Pickup & Delivery','Shoes & Backpack Dryclean','Antiseptic Wash', 'Next Day Delivery']">
          </vue-typer>
        </div>
      </div>
      <div style="position:absolute; right: 88px;">
        <div style="position:relative">
          <svg id="organic-blob" width="300" height="300" xmlns="http://www.w3.org/2000/svg" filter="url(#goo)">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
              </defs>
              <circle id="Circle1"></circle>
              <circle id="Circle2"></circle>
              <circle id="Circle3"></circle>
              <circle id="Circle4"></circle>
            </svg>
            <div style="position: absolute; top:40%; bottom: 50%: left: 70%; right: 30%" class="d-flex flex-column justify-center align-center">
              <div class="text-body-1 white--text font-weight-black">Welcome Offer</div>
              <div class="text-body-1 white--text font-weight-black">Upto <span class="black--text">FLAT 50 % OFF</span>  </div>
              <div class="text-body-1 white--text font-weight-black">Use coupon <span class="black--text">FIRST50</span></div>
            </div>
        </div>
      </div>
    </div>    
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#33cc99" fill-opacity="1" d="M0,64L48,90.7C96,117,192,171,288,160C384,149,480,75,576,58.7C672,43,768,85,864,128C960,171,1056,213,1152,197.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
    <v-row justify="center" style="border-top:16px solid #f2f4f6;">
      <div class="font-weight-bold text-h4 mt-16">
        Multiple reasons to choose
        <span class="text-decoration-underline">FABRICO!</span>
      </div>
    </v-row>
    <v-container class="my-16">
      <v-row jusitfy="center" no-gutters>
        <v-col cols-12 sm-6>
          <v-list three-line>
            <template v-for="(item) in whyFabrico">
              <v-list-item :key="item.title">
                <v-list-item-avatar size="64">
                  <v-icon size="48" color="accent">{{item.avatar}}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 font-weight-medium" v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle class="text-subtitle-1 font-weight-medium" v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols-12 sm-6>
          <v-row align="center" justify="end" class="fill-height">
            <v-card color="accent" width="80%" class="pa-8">
              <v-row justify="center">
                <v-icon size="128" color="white">mdi-tshirt-crew-outline</v-icon>
              </v-row>
              <v-row justify="center">
                <div class="white--text text-h4 font-weight-bold">100% Cleaniness Guranteed</div>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center" style="border-top: 16px solid #f2f4f6;">
      <div class="font-weight-bold text-h4 mt-16">How easy it is?</div>
    </v-row>
    <v-container class="my-16">
      <v-timeline>
        <v-timeline-item
          v-for="(orderStep,i) in orderSteps"
          :key="i"
          :icon="'mdi-numeric-'+(i+1)"
          color="accent"
        >
          <v-card class="elevation-2">
            <v-card-title class="text-h5 font-weight-medium">{{orderStep.title}}</v-card-title>
            <v-card-text class="text-subtitle-1 font-weight-medium">{{orderStep.description}}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-row style="border-top: 16px solid #f2f4f6;">
      <v-container class="pb-0" style="max-height: 500px">
        <v-row no-gutters>
          <v-col cols="6" class="mt-16">
            <div class="font-weight-bold text-h4">Refer and get free laundry</div>
            <div
              class="text-subtitle-1 font-weight-medium mt-6"
            >Invite your friends to Fabrico Laundry. They get 100 FabCash and you get upto 5000 FabCash. ( 1 FabCash = 1 INR )</div>
            <v-col cols="9" class="pl-0">
              <v-text-field solo prefix="+91" autocomplete="off" class="mt-8">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular v-if="loading" size="24" color="primary" indeterminate></v-progress-circular>
                    <v-btn @click="loading = true" v-else color="accent" class="white--text">Send</v-btn>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-col>
            <div class="d-flex mt-4">
              <div>
                <v-img src="/appstore.png" width="144" height="48"></v-img>
              </div>
              <div class="ml-4">
                <v-img src="/googleplay.png" width="144" height="48"></v-img>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <v-row justify="end">
              <v-col cols="6">
                <v-img src="/appscreen2.png" height="500"></v-img>
              </v-col>
              <v-col cols="6">
                <v-img src="/appscreen.png" height="600"></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/parts/default/Footer";
import Appbar from "@/components/parts/default/Appbar";
export default {
  components: {
    Footer,
    Appbar
  },
  methods: {
    changeSlogan() {
      if (this.sloganIndex < this.slogans.length - 1) this.sloganIndex++;
      else this.sloganIndex = 0;
    }
  },
  mounted() {
    this.sloganInterval = setInterval(this.changeSlogan, 3000);
  },
  data() {
    return {
      isIntersecting: false,
      sloganInterval: "",
      sloganIndex: 0,
      loading: false,
      selectedCity: "Delhi",
      selectedService: "Wash & Iron",
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
      ],
      slogans: [
        "Free Pickup & Delivery",
        "Shoes & Backpack Dryclean",
        "Antiseptic Wash",
        "Next Day Delivery"
      ]
    };
  },
  computed: {}
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.vue-typer {
  font-size: 2rem;
  font-weight: 500;
}
svg,
svg circle {
  fill: #33cc99;
}

@keyframes from0to360 {
  from{transform:rotate(0);}
  to{transform:rotate(360deg);}
}

#Circle1 {
  animation: from0to360 1s linear infinite;
  cx: 150;
  cy: 145;
  r: 100;
  transform-origin: 145px 150px;
}

@keyframes from360to0 {
  from{transform:rotate(360deg);}
  to{transform:rotate(0deg);}
}

#Circle2 {
  animation: from360to0 2s linear infinite;
  cx: 150;
  cy: 155;
  r: 100;
  transform-origin: 155px 150px;
}

#Circle3 {
  animation: from0to360 3s linear infinite;
  cx: 145;
  cy: 150;
  r: 100;
  transform-origin: 150px 145px;
}

#Circle4 {
  animation: from360to0 2.5s linear infinite;
  cx: 155;
  cy: 150;
  r: 100;
  transform-origin: 150px 155px;
}
</style>