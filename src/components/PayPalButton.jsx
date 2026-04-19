import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPalButton({ amount = "99.00", onSuccess }) {
  return (
    <PayPalScriptProvider options={{
      clientId: "Ab5sQf97FSrooaxwDI1fzB7WkmTXNkPyP6uZe_dZr1ItAfIIUbDpG0gGy9MeNKzIzKpBrQzeKB0IFQPz",
      currency: "MXN"
    }}>
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
        createOrder={(data, actions) => actions.order.create({
          purchase_units: [{ amount: { value: amount, currency_code: "MXN" } }]
        })}
        onApprove={(data, actions) => actions.order.capture().then(details => {
          alert(`✅ Pago exitoso! Gracias ${details.payer.name.given_name}`)
          if (onSuccess) onSuccess(details)
        })}
        onError={() => alert("❌ Error al procesar el pago")}
      />
    </PayPalScriptProvider>
  )
}