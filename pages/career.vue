<template>
    <div class="career-content">

    <Banner :image_url="require('../assets/Services/career-head.jpg')" :title="'Careers'" :subtitle="'Join The Fastest Growing Laundry Startup'" />

    <section class="career-description">

        <div class="left">
            <img src="../assets/Services/career-section.jpg" alt="" class="career-image">
        </div>
        <div class="right">
            <h4 class="section-heading">Together, we can build a better future. Work with Us</h4>
            <p class="career-text">Fabrico - India's Best Tech-Driven Laundry & Dry Leaning Brand has
                revolutionized the clutter of laundry space in the country. The company is
                expanding fast across India and always on the lookout for talented individuals
                for online laundry service.
            </p>

            <br/>

            <p> Please send your CV and register in our talent bank. Our HR department will be
                in touch with you after the initial screening.
            </p>

            <br>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas quia animi laudantium ad est nobis, laborum fugit, quidem consectetur nihil voluptatibus voluptatum ratione natus et, eum cumque nulla at aperiam dolorem officia facilis earum expedita. Facere veniam fugit corporis voluptatibus!</p>
        </div>
    </section>

    <h3 class="section-heading">Available Opportunities</h3>
     
    <Careeropp/>

<Footer/>
    </div>
</template>
<script>
import Careeropp from '../components/Careeropp'
import Banner from '../components/Banner'
import Footer from '../components/parts/default/Footer'

export default {
  components:{
      Careeropp,
      Banner,
      Footer
  }  
}
</script>
<style scoped>
@media screen and (min-width:300px){
   

    .career-heading{
       display: none;

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
        margin-top: 5vh;
    }
    .right p{
        text-align: justify;
        line-height: 30px;

    }
    .connect{
         font-size: 2rem;
        color: #4DB6AC;
        text-align: left;
        margin: 3vh 0;
        display: block;
    }

    .section-heading{
        text-align: center;
        color: #4DB6AC;
        font-size: 1.7rem;
        margin:3vh 0;
    }

   
}
@media screen and (min-width:600px){
    .career-description .right p{
      line-height: 2.5rem;
      margin: auto;
      font-size: 1.5rem;
    }
   
    .career-image{
        align-items: center;
        justify-content: center;
        width: 80vw;
    }

    .section-heading{
        font-size: 2rem;
    }
}
@media screen and (min-width:900px){
    .career-image{
        width: 60vw;
    }

}
@media screen and (min-width:1200px){
     .banner{
        /* background-image: url('../assets/Career/career1.png'); */
        height: 50vh;
        background-size: cover;
        z-index: 0;
   }
       .career-description{
      display: flex;
      flex-direction: row;
      /* flex-flow: row-reverse; */
      width: 85%;
      margin: auto;
      margin-bottom: 5vh;
      margin-top: 5vh;
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
    .career-heading{
        /* color: #4DB6AC; */
           float: left;
        text-align: left;
        margin: auto;
        margin-top: 20vh;
        font-size: 2rem;
        color: white;

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
</style>