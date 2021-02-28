<template>
<div class="mission-page my-5">
    
    <Banner :image_url="require('../assets/Missionimg/colorclothes.jpg')" :title="'Mission & Vission'" :subtitle="'Fabrico - #1 Choice for Laundry'" />

   <div class="cards">
       <Cards/>
   </div>
  
<Footer/>
</div>

</template>

<script>
import Cards from '../components/Mission-cards'
import Banner from '../components/Banner'
import Footer from '../components/parts/default/Footer'

  export default {
  components:{
      Cards,
      Banner,
      Footer
  }
 
  }
</script>

<style scoped>
/* 