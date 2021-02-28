<template>
   <div class="cards-content">
      <section class="mission-description">
         <div class="left">
            <img src="../assets/Services/vision.jpg" alt="" class="mission-image">
         </div>
         <div class="right">
            <h4 class="connect">Mission</h4>
            <p class="mission-text">Creativity and Innovation continue to drive our aspirations to plan and digitalize
               the laundry space in India and the world, through like-minded business service
               providers and empowerment of our employees.
            </p>
            <br/>
            <p> Fabrico aims to promote the
               online laundry service with state of the digital application extending
               convenience, choices and quality service to the end consumers.
            </p>
         </div>
      </section>
      <section class="vision-description">
         <div class="left">
            <img src="../assets/Services/mission.jpg" alt="" class="mission-image">
         </div>
         <div class="right">
            <h4 class="connect">Vision</h4>
            <p class="mission-text">We have a dream to turn around the conventional laundry service into a
               technology-driven modern business service with a sustainable business model,
               facilitating value to our customers and progress and prosperity to our franchise
               partners and employees..
            </p>
            <br>
            <p class="mission-text">We have a dream to turn around the conventional laundry service into a
               technology-driven modern business service with a sustainable business model,
               facilitating value to our customers and progress and prosperity to our franchise
               partners and employees..
            </p>
         </div>
      </section>
   </div>
</template>
<script>
   export default {
       data(){
           return{
              
           }
       }
   }
</script>
<style scoped>
   @media screen and (min-width:300px) {
	.mission-image {
		display: block;
		width: 90vw;
		height: auto;
		margin: 5vh auto;
		border-radius: 2rem;
	}
	.right {
		width: 80%;
		display: block;
		margin: auto;
		margin-top: 5vh;
	}
	.right h4 {
		font-size: 2rem;
		color: #4DB6AC;
		text-align: left;
		margin: 3vh 0;
		display: block;
	}
	.right p {
		text-align: justify;
		line-height: 30px;
	}
}

@media screen and (min-width:600px) {
	.mission-description .right p {
		line-height: 2.5rem;
		margin: auto;
		font-size: 1.5rem;
	}
	.vision-description .right p {
		line-height: 2.5rem;
		margin: auto;
		font-size: 1.5rem;
	}
	.mission-image {
		align-items: center;
		justify-content: center;
	}
}


@media screen and (min-width:1200px) {
	.mission-description {
		display: flex;
		flex-direction: row;
		/* flex-flow: row-reverse; */
		width: 85%;
		margin: auto;
		margin-bottom: 5vh;
		margin-top: 5vh;
	}
	.mission-description .right p {
		line-height: 2.5rem;
		margin: auto;
	}
	.mission-image {
		border-radius: 2rem;
	}
	.vision-description {
		display: flex;
		flex-direction: row;
		flex-flow: row-reverse;
		width: 85%;
		margin: auto;
		margin-bottom: 5vh;
	}
	.vision-description .right p {
		line-height: 2.5rem;
		margin: auto;
	}
	.vision-image {
		border-radius: 2rem;
	}
	.left {
		align-self: center;
	}
	.left img {
		width: 35vw;
		height: auto;
		margin: 2rem;
	}
	.right {
		margin: auto;
	}
}
</style>