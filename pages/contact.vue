<template>
    <div class="contact-page">
        <Banner :image_url="require('../assets/Services/banner1.png')" :title="'Connect With Fabrico'" :subtitle="'India\'s Best Tech-Driven Laundry & Dry Leaning Brand.'" />

        <h3 class="section-heading">Get in Touch!</h3>

        <div class="contact-content">
            <div class="left">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62207.97837106754!2d77.61904367910157!3d12.971937999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16aace19e925%3A0x3efc2c7921a4a9ac!2sFabrico!5e0!3m2!1sen!2sin!4v1613142861507!5m2!1sen!2sin"  frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
            <div class="right">
                <div class="connect-item">
                    <img src="../assets/contact/facebook.png" alt="">
                    <div class="info">
                        <h4>Facebook</h4>
                    </div>
                    

                </div>
                <div class="connect-item">
                    <img src="../assets/contact/instagram.png" alt="">
                    <h4>Instagram</h4>
                </div>
                <div class="connect-item">
                    <img src="../assets/contact/twitter.png" alt="">
                    <h4>Twitter</h4>
                </div>
                <div class="connect-item">
                    <img src="../assets/contact/whatsapp.png" alt="">
                    <h4>Whatsapp</h4>
                </div>
                <div class="connect-item">
                    <img src="../assets/contact/telephone.png" alt="">
                    <h4>Phone</h4>
                </div>
                <div class="connect-item">
                    <img src="../assets/contact/gmail.png" alt="">
                    <h4>Email</h4>
                </div>
                <div class="connect-item">
                    <img src="../assets/contact/map.png" alt="">
                    <h4>Address</h4>
                </div>
            </div>
        </div>
        <div class="address-details">
            <div class="details">
<p> <span>Email:</span>xyz @gmail.com</p>
<p> <span>Tollfree No:</span>xyz @gmail.com</p>
<p> <span>Watsapp:</span>xyz @gmail.com</p>
 </div>
            <div class="address">
<p><span>Address:</span><br/>Lorem ipsum dolor sit amet consectetur <br/>
adipisicing elit. Asperiores, deserunt.</p>
            </div>
        </div>
        <Footer/>

    </div>
</template>

<script>
import Banner from '../components/Banner'
import Footer from '../components/parts/default/Footer'

export default {
    components: {
        Banner,
        Footer
    }
}
</script>

<style scoped>

    /* Regular Styles */

    .section-heading{
        color: #4DB6AC;
        text-align: center;
        margin: 5vh 0;
        font-size: 1.8rem;
    }


    @media screen and (min-width: 300px){

        iframe{
            width: 100vw;
            height: 50vh;
        }

        .right{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            width: 90%;
            margin: auto;
        }

        .connect-item{
            display: flex;
            align-items: center;
            margin: 1rem;
            justify-content: space-around;
        }

        img{
            height: 40px;
            width: 40px;
        }

        h4{
            text-align: left;
        }
             .address-details{
            display: grid;
            grid-template-rows: 1fr 1fr;
             width: 100%;
             height: auto;
            margin: auto;
            justify-content: center;
            align-content: center;
            text-align: center;
            margin-top: 5vh;
            /* background-image: url("../assets/contact.jpeg"); */
       background-color: black;
    color: white;
        }
        .address, .details{
            line-height: 6vh;
        }
        

    }


    @media screen and (min-width: 900px) {
        .contact-content{
            display: flex;
            width: 90%;
            margin: auto;
        }

        iframe{
            width: 60vw;
        }
        .address-details{
            display: grid;
            grid-template-columns: 1fr 1fr;
             width: 100%;
             height: 30vh;
            margin: auto;
            margin-top: 5vh;
            justify-content: center;
            align-content: center;
            text-align: center;
            /* background-image: url("../assets/contact.jpeg"); */
       background-color: black;
    color: white;
        }
        .address, .details{
            line-height: 4vh;
            margin-top: 10ch;
        }
       
    }
</style>