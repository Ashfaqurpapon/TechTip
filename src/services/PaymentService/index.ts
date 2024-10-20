import envConfig from "@/src/config/envConfig";
import axios from "axios";

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(envConfig.PAYMENT_URL!, {
      store_id: envConfig.STORE_ID,
      signature_key: envConfig.SIGNETURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `${envConfig.baseApi}/paymentStatus`,
      fail_url: `${envConfig.baseApi}/v1/payment/confirmation?status=failed`,
      cancel_url: "http://localhost:5173/",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.custormerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    //console.log(response);
    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed!");
  }
};
