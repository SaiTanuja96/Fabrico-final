import moment from "moment";
export default (context, inject) => {
  const dateFormat = function(date, time = false) {
    if (time) {
      return moment(date).format("ddd, Do MMM hh:mm A");
    }
    return moment(date).format("ddd, Do MMM");
  };
  // Inject $hello(msg) in Vue, context and store.
  inject("dateFormat", dateFormat)
};
