<template>
   <div class="about-page">
       <section class="banner">
           <!-- <h2>About Us</h2> -->
           <div class="overlay"></div>
           <div class="banner-content">
               <!-- <h3>About Us</h3> -->
               <h5>We take care of your dry cleaning and Laundry every day!!</h5>
           </div>
       </section>
       <section class="about-description">
           <div class="left">
               <img src="../assets/About2.png" alt="" class="mobile-image">
               <img src="../assets/About2.png" alt="" class="desktop-image">
           </div>
           <div class="right">
               <h2>About Us</h2>
               <h5>We Take Care of Your dry cleaning and Laundry every day</h5>
               <p class="blue">Fabrico is an on-Demand Laundry and dry cleaning services company, presently
                  operating in the states of Kerala, Haryana and Uttar Pradesh.</p><br/><p> We are providing
                  an affordable solution for all your Laundry and dry-cleaning requirement. Book
                  your laundry and dry-cleaning requirement through our mobile App –FABRICO.</p><br/>
                  <p>Today we offer the best online laundry service and help you get rid of the
                  nightmare of washing dirty clothes and deliver you fresh ones after the wash.
                  Your laundry boy from Fabrico picks up, cleans and supplies at your door, and
                  you get the quality times that matter the most.</p><br/>
                  <p>Fabrico is a technology company in the domain of Laundry and dry cleaning
                  services. We have the best of in-class laundry products, a robust CRM and a
                  user-friendly Fabrico mobile application to support your cloth washing
                  requirement.</p><br/>
                 
           </div>
       </section>
         <section class="mobile-description">
           <div class="left">
               <img src="../assets/About3.png" alt="" class="app-image">
               <!-- <div class="img-playstore">
                  <img  class="mobilegp" src="../assets/About1.png">
                 
                  </div> -->
           </div>
           <div class="right">
                              <h4 class="connect">Connect with us!</h4>

            
                  <p class="downloaddesc">Fabrico Mobile Application is available in Android and IOS app store, and you
                  may download anytime to connect with Team – Fabrico. It helps you to discover a life without laundry day and an ultimate life hack for your lifestyle.
                  Fabrico mobile app is your "24X7 laundry boy" for on-demand pick-up and
                  delivery of your requirement. We work in close partnership with local service
                  providers. You can also place your cloth ironing in our toll-free no or walk into
                  any of our outlet, nearby to your home.</p>
                  <div class="playstore">
                  <img class="gp" src="../assets/gp.png">
                  <img class="ap" src="../assets/ap.png">
                  </div>
                  
           </div>
       </section>
<Footer/>
   </div>
</template>
<script>
import Footer from '../components/parts/default/Footer'
export default {
  components:{
      Footer
  }  
}
</script>



<style scoped>

/* Mobile Devices */

@media screen and (min-width:300px){
   
   .banner{
        background-image: url('../assets/About1.png');
        height: 40vh;
        background-size: cover;
        z-index: 0;
   }

   .overlay{
       height: 40vh;
       width: 100vw;
       background-image: linear-gradient(to top, #4DB6AC , rgba(255,205,210,0));
       z-index: 1;
       opacity: 0.4;
       position: absolute;
   }

   .banner-content{
       display: none;
   }
   .playstore{
     display: none;
   }

.img-playstore{
  display: grid;
  grid-template-rows: 50% 50%;
}
.mobilegp{
  justify-self: center;
  margin: auto;
}

    .about-description{
        display: flex;
        flex-direction: column-reverse;
    }
    .mobile-description{
      display: flex;
      flex-direction: column-reverse;
    }

    .mobile-image{
        display: block;
        width: 90vw;
        height: auto;
        display: block;
        margin: 5vh auto;
        border-radius: 2rem;
    }
    .app-image{
     display: block;
        width: 90vw;
        height: auto;
        display: block;
        margin: 5vh auto;
        border-radius: 2rem; 
    }

    .desktop-image{
        display: none;
    }

    .right{
        width: 80%;
        display: block;
        margin: auto;
        margin-top: 5vh;
    }

    .right h2{
        text-align: center;
        padding: 1rem;
        padding-top: none;
    }

    .right h5{
        font-size: 1.3rem;
        color: #4DB6AC;
        text-align: center;
        margin: 3vh 0;
        display: block;
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
    .gp{
      margin-right: 2rem;
    }

}


/* Tablets and Landscape Mobile View */

@media screen and (min-width:600px){
  .mobile-image{
      display: block;
  }
  .desktop-image{
      display: none;
  }

  .right h5{
      font-size: 1.5rem;
      text-align: left;
      display: block;
  }
}

@media screen and (min-width: 900px){

    .banner{
        display: flex;
    }

    .banner-content{
        display: block;
        z-index: 2;
        width: 100vw;
        align-self: flex-end;

    }

    .banner-content h5{
        color: white;
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 3vh;
    }

    .right h5{
        display: none;
    }
    
}


@media screen and (min-width:1200px){
  .about-description{
        display: flex;
        flex-direction: row;
        width: 80%;
        margin: auto;
        margin-bottom: 5vh;
    }
    .mobile-description{
      display: flex;
      flex-direction: row;
      flex-flow: row-reverse;
      width: 85%;
      margin: auto;
      margin-bottom: 5vh;
    }
    .mobile-description .right p{
      line-height: 2.5rem;
    }
    .app-image{
       border-radius: 2rem; 

    }

    .left{
        align-self: center;
    }

    .left img{
        width: 40vw;
        margin: 2rem;
    }

    .mobile-image{
        display: none;
    }
     .img-playstore{
     display: none;
   }
   .playstore{
     display: block;
   }

    .desktop-image{
        display: block;
        /* filter: brightness(90%); */
    }

    .right h2{
        text-align: left;
        padding-left: 0;
        font-size: 2.5rem;
        font-family: 'Poppins', sans-serif;
        margin-bottom: 2vh;

    }

    .right p{
        line-height: 2rem;
        font-family: 'Poppins', sans-serif;

    }
    .banner{
      height: 50vh;
    }

   .overlay{
       height: 50vh;
       width: 100vw;
       background-image: linear-gradient(to top, #4DB6AC , rgba(255,205,210,0));
       z-index: 1;
       opacity: 0.4;
       position: absolute;
   }
   .blue{
     color: #4caf50;
     line-height: 1rem;
     font-size: 1.25rem;
    font-family: 'Poppins', sans-serif;

   }
   .banner-content h5{
     font-size: 2.5rem;
     font-family: 'Lato', sans-serif;
   }
   .mobile-description .right p{
align-self: center;
   }
   .downloaddesc{
     padding-right: 5rem;
   }
}




</style>