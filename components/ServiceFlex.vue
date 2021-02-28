<template>
    <section class="service-description">

           <div class="left">

               <img src="../assets/Services/folded-clothes.jpg" alt="" class="service-image">

           </div>

           <div class="right">

                <h3>Together, we build a better future. Work with Us</h3>
                <p>
                    Fabrico - India's Best Tech-Driven Laundry & Dry Leaning Brand has
                    revolutionized the clutter of laundry space in the country. The company is
                    expanding fast across India and always on the lookout for talented individuals
                    for online laundry service.
                </p>
                
                <br/>
                
                <p> 
                    Please send your CV and register in our talent bank. Our HR department will be
                    in touch with you after the initial screening.
                </p>

                <br>

                <p>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos qui error fuga amet dolores quasi ipsam facere veritatis a illo hic modi blanditiis cupiditate natus recusandae maiores, atque obcaecati consectetur repellendus explicabo incidunt ab. Omnis quam eaque fugit ipsam officiis excepturi ab voluptas esse facere, itaque amet, saepe qui inventore!

                </p>
              
                  
           </div>
       </section>
</template>

<style scoped>


@media screen and (min-width: 300px) {

    .service-description{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .service-image{
        width: 80vw;
        height: auto;
        margin: 5vh 0;
        border-radius: 16px;
    }

    .right{
        width: 80vw;
    }

    h3{
        color: #4DB6AC;
        text-align: center;
        font-size: 1.8rem;
        margin-bottom: 5vh;
    }

    p{
        line-height: 30px;
        font-size: 1.1rem;
    }
}

@media screen and (min-width: 1200px){
    .service-description{
        flex-direction: row;
        width: 90%;
        margin: auto;
    }

    .service-image{
        width: 35vw;
    }

    .right{
        margin: 1.5rem;
    }

    h3{
        font-size: 2.4rem;
        text-align: left;
    }

    p{
        font-size: 1.4rem;
        line-height: 40px;
    }
}

</style>