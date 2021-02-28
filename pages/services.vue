<template>
    <div class="content">

  <Banner :image_url="require('../assets/doinglaundry.jpg')" :title="'Our Services'" :subtitle="'Fabrico - Your Laundry Boy'" />

  <h3 class="service-heading">Our Services</h3>

  <Servicecards/>

  <ServiceFlex class="faq" />

  <h3 class="service-heading">Frequently Asked Questions ( F.A.Q )</h3>

  <FAQ class="faq"/>

  <Footer/>
    </div>
</template>

<script>
import Banner from '../components/Banner'
import Servicecards from '../components/Servicecards'
import ServiceFlex from '../components/ServiceFlex'
import FAQ from './FAQ.vue'
import Footer from '../components/parts/default/Footer'


export default {
 
 components:{
   Banner,
   Servicecards,
   ServiceFlex,
   FAQ,
   Footer
 }
}
</script>


<style scoped>


@media screen and (min-width:300px){
  .main-heading{
    font-size: 3rem;
    color:#4DB6AC ;
  } 
  .service-heading{
    font-size: 2.3rem;
    color: #4DB6AC;
    text-align: center;
    width: 80%;
    margin: 5vh auto;

  }
   
.parallax {
  /* The image used */
  background-image: url("../assets/doinglaundry.jpg");

  /* Set a specific height */
  height: 40vh;

  /* Create the parallax scrolling effect */
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
  padding-top: 20%;
}

.career-image{
        display: block;
        width: 90vw;
        height: auto;
        margin: 5vh auto;
        /* margin-left: 5vh; */
        border-radius: 2rem; 
    }
        .right{
        width: 80%;
        display: block;
        margin: auto;
        /* margin-top: 5vh; */
    }
       .right h4{
      font-size: 2rem;
        color: #4DB6AC;
        text-align: left;
        margin: 3vh 0;
        display: block;
    }
    .right p{
        text-align: justify;
        line-height: 30px;

    }
   
     

}


/* Tablets and Landscape Mobile View */

@media screen and (min-width:600px){
   
.parallax-content{
  padding-top: 15%;
}
     .career-description .right p{
      line-height: 2.5rem;
      margin: auto;
      font-size: 1.5rem;
    }
   
    .career-image{
        align-items: center;
        justify-content: center;
        padding-right: 6vh;
    }
    
}


@media screen and (min-width:1200px){
  
.parallax-content{
  padding-top: 6%;
}
  .career-description{
      display: flex;
      flex-direction: row;
      width: 85%;
      margin: auto;
     
    }
    .career-description .right p{
      line-height: 2.5rem;
      margin: auto;
    }
     .career-image{
       border-radius: 2rem; 

    }
     .left{
        align-self: center;
    }

  .left img{
        width: 30vw;
        height: auto;
        margin: 2rem;
    }
    .right{
        margin: auto;
    }
  
}

.faq{
  width: 80%;
  margin: auto;
}




</style>
