import Axios from 'axios';

export default class PaypalAPI {
    postPayment = (list) =>{
        let total=0;
        list.forEach(item => {
            total+=item.ProductAmount*item.ProductsPrice;
        });
        if (localStorage.getItem("total")) {
            localStorage.removeItem("total");
            localStorage.setItem("total",total);
        }else{
            localStorage.setItem("total",total);
        }
        return Axios.post('https://testpaypalapp.herokuapp.com/',{
            list,
            total
        }).then((res)=>{
            return res.data;
        }).catch((err)=>console.log(err));
    }
    postPayerID = ({PayerID,paymentId,token})=>{
        let total="";
        localStorage.getItem('total')? total =localStorage.getItem('total'):total='1.00';
        return Axios.post('https://testpaypalapp.herokuapp.com/payment',{
            PayerID,paymentId,token,total
        }).then((res)=> {
            // debugger;
            return res.data;
        }).catch((err)=>console.log(err));
    }
}
//https://testpaypalapp.herokuapp.com