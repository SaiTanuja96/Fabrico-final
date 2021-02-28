<template>
    <div :style="{ 'background-image': 'url(' + image_url + ')' }" class="banner">
        <div class="parallax-content">
            <h1 class="main-heading">{{title}}</h1><br/>
            <h2 class="heading" >{{subtitle}}</h2><br/>
          </div>
    </div>
</template>

<script>
export default {
    props: ['image_url', 'title', 'subtitle']
}
</script>

<style scoped>
.banner{
    height: 50vh;
    width: 100vw;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.parallax-content{
  color: white;
  text-align: center;
  margin: auto;
  height: 50vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>