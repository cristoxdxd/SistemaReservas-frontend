import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { auth } from "../../Firebase";
import { email } from "../../models/email.interface";
import { sendEmail } from "../../services/sendEmail";
import { useLocation } from "react-router-dom";

// Renders errors or successfull transactions on the screen.
function Message({ content }: { content: string }) {
  return <p>{content}</p>;
}
//clientId: "AY2f43SwdopSTs-DomykC8YVjiONxiabKoYQqEzrlFZRSriocLQqEUKjXVAas2FyK0iqhhXnJOXhE8Oo" }

interface PaypalButtonProps {
  total_price: number;
  onSuccess: () => void;
}

function PaypalButton({ total_price, onSuccess }: PaypalButtonProps){
  const initialOptions = {
    "client-id": "test",
    "enable-funding": "card",
    "disable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  // Función para enviar el correo electrónico de confirmación
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  async function send_email() {
    const email: email = {
      email: auth.currentUser?.email ?? "",
      subject: "Reservation Confirmation",
      body: "Thank you for your reservation. We will be waiting for you. \n",
      amount: total_price,
      booking_id: id ?? "",
    };
    const res = await sendEmail(email);
    if (res.status == 200) {
      console.log("Email sent successfully");
    } else {
      console.error("Error sending email");
    }
  };
  
  return (
    <div className="App">


      <PayPalScriptProvider options={{ ...initialOptions, clientId: "AY2f43SwdopSTs-DomykC8YVjiONxiabKoYQqEzrlFZRSriocLQqEUKjXVAas2FyK0iqhhXnJOXhE8Oo" }}>
        <PayPalButtons
          style={{
            shape: "pill",
            layout: "vertical",
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: JSON.stringify({
                  cart: [
                    {
                      price: total_price ,
                    },
                  ],
                }),
              });

              const orderData = await response.json();

              

              if (orderData.id) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.error(error);
              setMessage(`Could not initiate PayPal Checkout...${error}`);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `/api/orders/${data.orderID}/capture`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`,
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                // const transaction =
                //   orderData.purchase_units[0].payments.captures[0];
                // setMessage(
                //   `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                // );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );

                // Llamada a la función onSuccess después de la confirmación exitosa
                onSuccess();
                send_email();
              }
            } catch (error) {
              console.error(error);
              setMessage(
                `Sorry, your transaction could not be processed...${error}`,
              );
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default PaypalButton;
