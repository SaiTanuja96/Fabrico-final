import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBndhv9mzn9_-hRgtbGFIUBAmrRrFsy6qM",
    libraries: "places"
  }
});
