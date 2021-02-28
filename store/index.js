import Cookies from "js-cookie";

export const state = () => ({
  services: [],
  rates: [],
  banners: [],
  cities: [],
  user: null,
  token: null,
  order: {
    services: [2],
    addons: [],
    pickupDate: null,
    pickupTimeslotId: null,
    couponId: null,
    estimatedClothes: "< 20",
    heavyItems: [],
    pickupInstruction: null,
    addressId: null
  },
  timeslots: null,
  coupon: null, //corrosponding to order couponId
  cityId: 1,
  addressForm: {
    sessionToken: null,
    placeId: null,
    address: null,
    lat: null,
    lng: null,
    query: null,
    predictions: [],
    redirectOnSave: "/"
  },
  snackbar: {
    value: false,
    message: null,
    color: "accent"
  }
});

export const mutations = {
  SET_SERVICES(state, payload) {
    state.services = payload;
  },
  SET_BANNERS(state, payload) {
    state.banners = payload;
  },
  SET_CITIES(state, payload) {
    state.cities = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  ADD_ADDRESS(state, payload) {
    state.user.addresses.unshift(payload);
  },
  SET_ORDER_SERVICES(state, payload) {
    //payload must be array
    state.order.services = payload;
  },
  SET_ORDER_ADDONS(state, payload) {
    state.order.addons = payload;
  },
  SET_ORDER_PICKUPDATE(state, payload) {
    state.order.pickupDate = payload;
  },
  SET_ORDER_PICKUPTIMESLOTID(state, payload) {
    state.order.pickupTimeslotId = payload;
  },
  SET_ORDER_COUPONID(state, payload) {
    state.order.couponId = payload;
  },
  SET_ORDER_ESTIMATEDCLOTHES(state, payload) {
    state.order.estimatedClothes = payload;
  },
  SET_ORDER_HEAVYITEMS(state, payload) {
    state.order.heavyItems = payload;
  },
  SET_ORDER_PICKUPINSTRUCTION(state, payload) {
    state.order.pickupInstruction = payload;
  },
  SET_ORDER_ADDRESSID(state, payload) {
    state.order.addressId = payload;
  },
  SET_TIMESLOTS(state, payload) {
    state.timeslots = payload;
  },
  SET_COUPON(state, payload) {
    state.coupon = payload;
  },
  SET_CITYID(state, payload) {
    state.cityId = payload;
  },
  SET_ADDRESS_FORM_SESSIONTOKEN(state, payload) {
    state.addressForm.sessionToken = payload;
  },
  SET_ADDRESS_FORM_PLACEID(state, payload) {
    state.addressForm.placeId = payload;
  },
  SET_ADDRESS_FORM_ADDRESS(state, payload) {
    state.addressForm.address = payload;
  },
  SET_ADDRESS_FORM_LAT(state, payload) {
    state.addressForm.lat = payload;
  },
  SET_ADDRESS_FORM_LNG(state, payload) {
    state.addressForm.lng = payload;
  },
  SET_ADDRESS_FORM_QUERY(state, payload) {
    state.addressForm.query = payload;
  },
  SET_ADDRESS_FORM_PREDICTIONS(state, payload) {
    state.addressForm.predictions = payload;
  },
  SET_ADDRESS_FORM_REDIRECTONSAVE(state, payload) {
    state.addressForm.redirectOnSave = payload;
  },
  SET_SNACKBAR(state, payload) {
    state.snackbar = payload;
  },
  SET_RATES(state, payload) {
    state.rates = payload;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    //context to use req/res //vuexcontext to use store commit and all
    let token = null;
    if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("token="));
      if (tokenCookie) {
        const expirationDateCookie = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("expirationDate="));
        const expirationDate = expirationDateCookie.split("=")[1];
        if (new Date().getTime() < +expirationDate) {
          token = tokenCookie.split("=")[1];
          $axios.setToken(token, "Bearer");
        }
      }
    }
    // const init = await $axios.$get("/init");
    // commit("SET_BANNERS", init.banners);
    // commit("SET_SERVICES", init.services);
    // commit("SET_CITIES", init.cities);
    // if (init.user) {
    //   commit("SET_TOKEN", token);
    //   commit("SET_USER", init.user);
    // }
  },
  async authorize({ commit }, { username, password }) {
    let res = await this.$axios.$post("/otp-verify", {
      username: username,
      password: password,
      client_id: "1",
      client_secret: "t45qBVex5qDX8FdMJxYpIgMixMrRq3zNK6jfsaqj",
      grant_type: "password",
      scope: "*"
    });
    if (res) {
      commit("SET_USER", res.user);
      commit("SET_TOKEN", res.access_token);
      Cookies.set("token", res.access_token);
      Cookies.set(
        "expirationDate",
        new Date().getTime() + res.expires_in * 1000
      );
      return true;
    } else {
      return false;
    }
  },
  //making initAuth only for server ie first page render through server (nuxtserverinit)
  async initAuth(commit, req, $axios) {},
  addAddress({ commit }, payload) {
    commit("ADD_ADDRESS", payload);
  },
  addOrderServices({ commit }, payload) {
    commit("SET_ORDER_SERVICES", payload);
  },
  addOrderAddons({ commit }, payload) {
    commit("SET_ORDER_ADDONS", payload);
  },
  addOrderPickupDate({ commit }, payload) {
    commit("SET_ORDER_PICKUPDATE", payload);
  },
  addOrderPickupTimeslotId({ commit }, payload) {
    commit("SET_ORDER_PICKUPTIMESLOTID", payload);
  },
  addOrderCouponId({ commit }, payload) {
    commit("SET_ORDER_COUPONID", payload);
  },
  addOrderEstimatedClothes({ commit }, payload) {
    commit("SET_ORDER_ESTIMATEDCLOTHES", payload);
  },
  addOrderHeavyItems({ commit }, payload) {
    commit("SET_ORDER_HEAVYITEMS", payload);
  },
  addOrderPickupInstruction({ commit }, payload) {
    commit("SET_ORDER_PICKUPINSTRUCTION", payload);
  },
  addOrderAddressId({ commit }, payload) {
    commit("SET_ORDER_ADDRESSID", payload);
  },
  addTimeslots({ commit }, payload) {
    commit("SET_TIMESLOTS", payload);
  },
  addCoupon({ commit }, payload) {
    commit("SET_COUPON", payload);
  },
  addCityId({ commit }, payload) {
    commit("SET_CITYID", payload);
  },

  addAddressFormSessionToken({ commit }, payload) {
    commit("SET_ADDRESS_FORM_SESSIONTOKEN", payload);
  },
  addAddressFormPlaceId({ commit }, payload) {
    commit("SET_ADDRESS_FORM_PLACEID", payload);
  },
  addAddressFormAddress({ commit }, payload) {
    commit("SET_ADDRESS_FORM_ADDRESS", payload);
  },
  addAddressFormLat({ commit }, payload) {
    commit("SET_ADDRESS_FORM_LAT", payload);
  },
  addAddressFormLng({ commit }, payload) {
    commit("SET_ADDRESS_FORM_LNG", payload);
  },
  addAddressFormQuery({ commit }, payload) {
    commit("SET_ADDRESS_FORM_QUERY", payload);
  },
  addAddressFormPredictions({ commit }, payload) {
    commit("SET_ADDRESS_FORM_PREDICTIONS", payload);
  },
  addAddressFormRedirectOnSave({ commit }, payload) {
    commit("SET_ADDRESS_FORM_REDIRECTONSAVE", payload);
  },
  addSnackbar({ commit }, payload) {
    commit("SET_SNACKBAR", payload);
  },
  addRates({ commit }, payload) {
    commit("SET_RATES", payload);
  }
};

export const getters = {
  isAuthenticated(state) {
    if (state.token != null) return true;
    else return false;
  },
  getSelectedCityName({ cities, cityId }) {
    let l = cities.length;
    for (let i = 0; i < l; i++) {
      if (cities[i].id == cityId) return cities[i].name;
    }
    return null;
  }
};
