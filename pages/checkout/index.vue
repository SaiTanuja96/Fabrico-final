<template>
  <component :is="$device.isDesktop ? 'default' : 'mobile'" />
</template>

<script>
export default {
  layout: context => (context.isDesktop ? "default" : "mobile"),
  components: {
    mobile: () => import("@/components/mobile/checkout"),
    default: () => import("@/components/default/checkout")
  }
};
</script>