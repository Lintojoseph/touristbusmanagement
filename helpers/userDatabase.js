const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_YiKG6J90MkCSY2',
  key_secret: '7uv5PS8tG7zSSvHDzr9fwwf1',
});

module.exports={
    generateOrder:(order)=>{
        return new Promise((resolve,reject)=>{
            const orderId = order._id
            console.log(orderId);
            
            var options = {
                amount:5000,
                currency:'INR',
                receipt:""+orderId
            }
            instance.orders.create(options, function(err, order) {
                if(err){
                    console.log(err);
                }else{
                    console.log("New Order",order);
                    resolve(order)
                }
              });
        })
      },
      paymentVerify:(details)=>{
        console.log('pa',details);
        return new Promise((resolve,reject)=>{
            let crypto
            try{
                crypto = require('node:crypto');
            }catch(err){
                console.error('crypto support is disabled!');
            }
            // const secret = 'wmZJgIGKY919No4xYfO14ubw'
            let hmac = crypto.createHmac('sha256','7uv5PS8tG7zSSvHDzr9fwwf1')
            .update(details['payment[razorpay_order_id]']+'|'+details['payment[razorpay_payment_id]'])
            .digest('hex')
            //eslint- disable-next-line eqeqeq
            if(hmac === details['payment[razorpay_signature]']){
                resolve()
            }else{
                const err = 'payment failure'
                reject(err)
            }
        })
      }
}