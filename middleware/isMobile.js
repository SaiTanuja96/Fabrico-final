export default function({ redirect, isDesktop }) {
  if (isDesktop) redirect("/");
}
