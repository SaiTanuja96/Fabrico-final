<template>
   <div class="content">
      <div class="cards">
         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/clean-clothes.png">
            <h2>Wash and Fold</h2>
            <br/>
            <span>59/kg</span>
            <div class="time">
               <img class="clock" src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
            </div>
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/ironing.png">
            <h2>Wash and Iron</h2>
            <br/>
            <span>59/kg</span>
            <div class="time">
               <img class="clock" src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
            </div>
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/washing-machine.png">
            <h2>Premium Laundry</h2>
            <br/>
            <span>59/kg</span>
            <div class="time">
               <img class="clock" src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
            </div>
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/dry.png">
            <h2>Dry Cleaning</h2>
            <br/>
            <span>59/kg</span>
            <div class="time">
               <img class="clock" src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
            </div>
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/steam-press.png">
            <h2>Steam Press</h2>
            <br/>
            <span>59/kg</span>
            <div class="time">
               <img class="clock" src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
            </div>
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/house.png">
            <h2>Household Sanitization</h2>
            <br/>
            <span>Starting at Rs750</span>
            <!-- <div class="time">
               <img src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
               </div> -->
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/car-service.png">
            <h2>Vehicle Sanitization</h2>
            <br/>
            <span>Starting at Rs599</span>
            <!-- <div class="time">
               <img src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
               </div> -->
         </div>

          

         <div class="card" elevation="3">
            <img class="icon" src="../assets/Services/facilities.png">
            <h2>Facility Sanitization</h2>
            <br/>
            <span>Starting at Rs700</span>
            <!-- <div class="time">
               <img src="../assets/Services/png/Delivery.png"><br/>
               <span>48Hr</span>
               </div> -->
         </div>
      </div>
   </div>
</template>
<style scoped>


.clock {
	width: 35px;
}

.card h2 {
	color: #4DB6AC;
	text-align: center;
}

.time {
	display: flex;
	margin-top: 1rem;
	align-items: center;
	width: 30%;
	justify-content: space-between;
}

.time img {
	height: 25px;
	width: 25px;
}

.content {
	width: 100%;
	align-content: center;
	justify-content: center;
}

.card h2 {
	margin-top: 2rem;
}


@media screen and (min-width:300px) {
	.cards {
		width: 90%;
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		margin: auto;
		margin-top: 6rem;
	}
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 2rem;
		margin-bottom: 2rem;
	}
	.icon {
		width: 70px;
		/* height: 90px; */
		background-color: white;
		align-self: center;
	}
}

@media screen and (min-width: 600px) {
  .cards{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width:900px) {
	.card {
		margin-bottom: 2rem;
	}
}

@media screen and (min-width:1200px) {
	.cards {
		width: 80%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		margin: auto;
		margin-top: 6rem;
		justify-content: space-around;
		height: 70vh;
    gap: 5vh;
	}
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 2rem;
		border: none;
	}
	.icon {
		width: 80px;
		height: 80px;
		background-color: white;
		align-self: center;
	}
	.steam {
		left: 150%;
		margin-top: 2rem;
	}
}

</style>