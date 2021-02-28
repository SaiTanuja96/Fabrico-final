<template>
  <v-toolbar style="position: fixed; bottom:0" width="100%">
    <v-row justify="space-around" align="center">
      <nuxt-link v-ripple="{ center: true }" to="/" exact>
        <v-icon>mdi-washing-machine</v-icon>
        <div>
          <p class="font-weight-bold">Fabrico</p>
        </div>
      </nuxt-link>

      <nuxt-link v-ripple="{ center: true }" to="/pricing">
        <v-icon>mdi-receipt</v-icon>
        <div>
          <p class="font-weight-bold">Pricing</p>
        </div>
      </nuxt-link>
      <nuxt-link v-ripple="{ center: true }" to="/bookings">
        <v-icon>mdi-clipboard-text</v-icon>
        <div>
          <p class="font-weight-bold">Bookings</p>
        </div>
      </nuxt-link>
      <nuxt-link v-ripple="{ center: true }" to="/refer-and-earn">
        <v-icon>mdi-wallet-giftcard</v-icon>
        <div>
          <p class="font-weight-bold">Rewards</p>
        </div>
      </nuxt-link>
      <nuxt-link v-ripple="{ center: true }" to="/profile">
        <v-icon>mdi-account-circle</v-icon>
        <div>
          <p class="font-weight-bold">Profile</p>
        </div>
      </nuxt-link>
    </v-row>
  </v-toolbar>
</template>
<style lang="scss" scoped>
p {
  font-size: 11px;
  margin: 0;
}
a {
  text-decoration: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #bdbdbd;
  .v-icon {
      color: #bdbdbd;
  }
}
.nuxt-link-active {
  color: #000;
  .v-icon {
      color: #000;
  }
}
</style>