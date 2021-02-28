import colors from "vuetify/es5/util/colors";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  loading: false,
  head: {
    title: "Fabrico - Laundry & Dryclean",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Order laundry and dryclean services online and get clean clothes delivered at your doorstep with free pickup and delivery. Serving in Gurugram, Gurgaon, Noida, Jaunpur, Coimbatore, Perintalmanna(Kerala). Book wash and fold, wash and steam iron, premium laundry or dryclean."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["~/css/global.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/google-maps", ssr: true },
    { src: "~/plugins/typer", ssr: false },
    "~/plugins/axios",
    "~/plugins/dateFormat.js",
    "~/plugins/orderStatus.js"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/device", "@nuxtjs/axios", "@nuxtjs/proxy"],
  axios: {
    proxy: true,
    prefix: "/api/web/v1/", // Used as fallback if no runtime config is provided
    headers: {
      common: {
        Accept: "application/json"
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    }
  },

  proxy: {
    "/api/web/v1/otp-verify": {
      target: process.env.OAUTH_URL,
      pathRewrite: { "^/api/web/v1/otp-verify": "" }
    },
    "/api/web/v1/mapi/autocomplete": {
      target: process.env.MAP_AUTOCOMPLETE_URL,
      pathRewrite: function(path, req) {
        return path.replace(
          "/api/web/v1/mapi/autocomplete?",
          "?components=country:in&key=" + process.env.GOOGLE_MAP_KEY + "&"
        );
      }
    },
    "/api/web/v1/mapi/place-detail": {
      target: process.env.MAP_PLACE_DETAIL_URL,
      pathRewrite: function(path, req) {
        return path.replace(
          "/api/web/v1/mapi/place-detail?",
          "?fields=name,formatted_address,geometry&key=" +
            process.env.GOOGLE_MAP_KEY +
            "&"
        );
      }
    },
    "/api/web/v1/mapi/geocode": {
      target: process.env.MAP_GEOCODE_URL,
      pathRewrite: function(path, req) {
        return path.replace(
          "/api/web/v1/mapi/geocode?",
          "?key=" + process.env.GOOGLE_MAP_KEY + "&"
        );
      }
    },
    "/api/web/v1/": {
      target: process.env.API_URL,
      pathRewrite: { "^/api/web/v1/": "" }
    }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: "https://api.fabrico.in/api/web/v1"
    }
  },

  router: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#000",
          accent: "#33cc99",
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
};
