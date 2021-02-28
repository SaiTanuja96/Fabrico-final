<template>
  <component :is="$device.isDesktop ? 'default' : 'mobile'" />
</template>

<script>
export default {
  layout: context => (context.isDesktop ? "default" : "mobile"),
  components: {
    mobile: () => import("@/components/mobile/Index"),
    default: () => import("@/components/default/Index")
  }
};
</script>