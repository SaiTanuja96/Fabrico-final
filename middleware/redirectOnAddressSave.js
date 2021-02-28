export default function({ store, from }) {
  store.dispatch("addAddressFormRedirectOnSave", from && from.fullPath ? from.fullPath : '/');
}
