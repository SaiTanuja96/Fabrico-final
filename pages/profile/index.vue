<template>
  <div>
    <div class="ma-4">
      <div class="m-fs-h text-capitalize">{{$store.state.user.name}}</div>
      <div class="m-fs-s">{{$store.state.user.mobile}}</div>
      <v-divider class="mt-4"></v-divider>
      <div
        class="d-flex align-center justify-space-between py-4"
        @click="$router.push('/profile/fabCash')"
      >
        <div class="d-flex flex-column">
          <div class="m-fs-t">FabCash</div>
          <div class="m-fs-s">By referral, cashback and rating</div>
        </div>
        <div class="d-flex align-center">
          <div class="m-fs-t">{{$store.state.user.fabCash}}</div>
          <v-icon class="ml-2">mdi-chevron-right</v-icon>
        </div>
      </div>
      <v-divider />
      <div class="d-flex align-center justify-space-between py-4">
        <div class="d-flex flex-column">
          <div class="m-fs-t">Manage Address</div>
          <div class="m-fs-s">Edit or delete saved addresses</div>
        </div>
        <div class="d-flex align-center">
          <div class="m-fs-t">{{$store.state.user.addresses.length}}</div>
          <v-icon class="ml-2">mdi-chevron-right</v-icon>
        </div>
      </div>
      <v-divider />
      <div class="d-flex align-center justify-space-between py-4">
        <div class="d-flex flex-column">
          <div class="m-fs-t">Add GST detail</div>
          <div class="m-fs-s">For B2B gst invoice</div>
        </div>
        <div class="d-flex align-center">
          <div class="m-fs-t">{{$store.state.user.gstin ? 'Added' : ''}}</div>
          <v-icon class="ml-2">mdi-chevron-right</v-icon>
        </div>
      </div>
      <v-divider />
      <div class="d-flex align-center justify-space-between py-4">
        <div class="d-flex flex-column">
          <div class="m-fs-t">Help</div>
          <div class="m-fs-s">FAQs and links</div>
        </div>
        <div class="d-flex align-center">
          <v-icon class="ml-2">mdi-chevron-right</v-icon>
        </div>
      </div>
      <v-divider />
      <div class="d-flex align-center justify-center py-8">
        <v-btn depressed>
          <v-icon>mdi-logout</v-icon>Logout
        </v-btn>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>
<script>
import BottomNavigation from "@/components/parts/BottomNavigation";
export default {
  layout: "mobile",
  middleware: "isMobile",
  validate({ store, redirect }) {
    if (store.state.token) {
      return true;
    } else {
      redirect("/auth");
    }
  },
  components: { BottomNavigation }
};
</script>