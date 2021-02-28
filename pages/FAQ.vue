<template>
    <section class="faq">
  <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(item,i) in items"
      :key="i"
    >
      <v-expansion-panel-header>
        <h3>{{item.question}}</h3>
        
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p class="answer">
          {{item.answer}}
        </p>
          
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </section>
</template>
<script>
export default {
    data(){
        return{
            items:[
                {question:"How can I schedule my maiden service with Fabrico?",
                answer:"An Order can be scheduled through Fabrico mobile application, website, our toll-free no, walk into our store or by making a direct call to store. Based onyour call, our laundry boy would x up a time for your Laundry pick up."},
                 {question:"What's the usual turnaround time?",
                answer:"We take 24 to 72 hours depending on the service, you are looking for. But in case of an emergency, we make special arrangements."},
                 {question:"How to reschedule a missed order?",
                answer:"If in case you miss your order, you can reschedule it by calling at our toll-free number, and we will reschedule it. You may also do it online through the Fabrico App."},
                 {question:"How to contact Fabrico in case of a query/complaint?",
                answer:"You can call our toll free number or write to us at contact@fabrico.in. We will be more than happy to resolve it."},
                 {question:"What is the minimum order value?",
                answer:"Our Minimum order value is Rs ______"},

                {question:"Are their things that you will not Clean?",
                answer:"We are a one-stop cleaning company providing you with all possible services connected with Laundry, Dry-cleaning, Steam ironing and Shoe Laundry. Our portfolio is limited to these areas as of now. However, in future, we would introduce more and more innovative services, and we will keep you posted."},
                 {question:"How do I give special instructions for my service?",
                answer:".We take necessary inputs/ instructions from you while you book a servicefrom our website, mobile App, WhatsApp and phone call. We inform you at the point of booking the order if that is possible for us to adhere to.Payment Related"},
                 {question:"How do I make payment?",
                answer:"We accept cash, card UPI, wallet and other online methods. You can make payment through our website, our mobile App, payment link. We accept cash in our Fabrico outlet."},
                 {question:"Do I need to tip the partner?",
                answer:"There is no need to stress your pockets for that extra bit; we motivate our boys with ample incentives! Words like ` Thank you` or a compliment from your side is good enough to raise the spirit of your laundry boy."},
                 {question:"How do I avail discounts?",
                answer:"Every discounts/Offers is always displaced on the website or App in the `promotion page`. Also, keep checking your inbox regularly for our excitingoffers."},
                   {question:" How do I Refer friends using App?",
                answer:"Once you open the Mobile App, go to Invite & Earn section in the Menu barand nd the unique Referral code. Click on the `Invite Friends` button at thebottom and share to earn some reward for yourself. It allows your friend to make some reward"}

                
            ]
        }
    }
}
</script>

<style scoped>

.faq{
  width: 80%;
  margin: auto;
}


h3{
  text-align: left !important;
  padding: 0.8rem 0;
  line-height: 30px;
}

.answer{
  padding: 1rem;
  line-height: 30px;
}


</style>
