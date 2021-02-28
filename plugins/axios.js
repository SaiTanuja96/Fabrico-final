export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {});

  $axios.onError(error => {
    console.log(error.response);
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      console.log(code);
      redirect("/auth");
    } else {
      return null;
    }
  });
}
