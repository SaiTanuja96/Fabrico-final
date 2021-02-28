<template>
  
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    totalCount() {
      var total = 0;
      this.order.tags.forEach(tag => {
        total += parseInt(tag.item_count);
      });
      return total;
    },
    subTotal() {
      var _data = 0;
      this.order.tags.forEach(tag => {
        var cRate = parseInt(this.getRate(tag));
        switch (tag.rate.rate_unit) {
          case "pc":
            _data += parseFloat(tag.item_count * cRate);
            break;
          case "kg":
            _data += parseFloat(tag.item_kg * cRate);
            break;
          case "sq_ft":
            _data += parseFloat(tag.item_sq_ft * cRate);
          default:
            break;
        }
      });

      return _data.toFixed(2);
    },
    expressAmount() {
      let amt = 0;
      if (this.order.coupon.discount_type == "express") {
        amt = (this.subTotal * this.order.coupon.discount_value) / 100;
      }
      return amt.toFixed(2);
    },
    gst() {
      let gst = parseFloat(this.order.gst);
      var _data = (this.subTotal * gst) / 100;
      return _data.toFixed(2);
    },
    couponDiscount() {
      var discount = 0;
      if (this.order.coupon) {
        switch (this.order.coupon.discount_type) {
          case "percentage":
            discount =
              (this.subTotal * this.order.coupon.discount_value) / 100 > 100
                ? 100
                : (this.subTotal * this.order.coupon.discount_value) / 100;
            break;
          case "flat":
            discount =
              this.order.coupon.discount_value > 100
                ? 100
                : this.order.coupon.discount_value;
            break;
          case "launch":
            discount = (this.subTotal * this.order.coupon.discount_value) / 100;
            break;
          default:
            break;
        }
      }
      return discount.toFixed(2);
    },
    total() {
      var amt = parseFloat(
        parseFloat(this.subTotal) +
          parseFloat(this.gst) -
          parseFloat(this.couponDiscount) +
          parseFloat(this.expressAmount)
      );
      if (amt < 250 && this.order.home_delivery == 1) {
        amt = 250;
      }
      amt = Math.round(amt);
      return amt;
    }
  },
  methods: {
    getRate(tag) {
      var rate = parseInt(tag.rate.rate);
      if (tag.has_antiseptic_wash) {
        rate += 5;
      }
      if (tag.has_fabric_softener) {
        rate += 5;
      }
      return rate;
    }
  }
};
</script>