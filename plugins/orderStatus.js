export default (context, inject) => {
  const orderStatus = function(orderStatusId) {
    switch (+orderStatusId) {
      case 0:
        return "Cancelled";
      case 1:
        return "Waiting For Confirmation";
      case 2:
        return "Confirmed";
      case 3:
        return "Pickup Assigned To Rider";
      case 4:
        return "Rider Out For Pickup";
      case 5:
        return "Pickup Completed";
      case 6:
        return "Received At Center";
      case 7:
        return "Tagged / Bill Generated";
      case 8:
      case 9:
      case 10:
        return "Wash / Press Started";
      case 11:
        return "Ready For Delivery";
      case 12:
        return "Delivery Assigned To Rider";
      case 13:
        return "Rider Out For Delivery";
      case 14:
      case 15:
        return "Delivered";
      case 16:
        return "Pickup Missed";
      case 17:
        return "Delivery Missed";
      default:
        break;
    }
  };
  // Inject $hello(msg) in Vue, context and store.
  inject("getOrderStatus", orderStatus);
};
