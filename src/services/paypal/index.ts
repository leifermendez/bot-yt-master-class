import paypal from 'paypal-rest-sdk';

const ENDPOINT = process.env?.ENDPOINT ?? 'http://localhost:3000'

// Configurar las credenciales de la API de PayPal
paypal.configure({
    mode: process.env.PAYPAL_ENVIRONMENT ?? '',
    client_id: process.env.PAYPAL_ID ?? '',
    client_secret: process.env.PAYPAL_SK ?? '',
});

const generatePaymentLink = async (price:string, email:string): Promise<string> => {
    const payloadPayment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal',
        },
        redirect_urls: {
            return_url: `${ENDPOINT}/callback?status=success&email=${email}`,
            cancel_url: `${ENDPOINT}/callback?status=fail&email=${email}`,
        },
        transactions: [{
            item_list: {
                items: [{
                    name: 'Producto Ejemplo',
                    sku: '001',
                    price: `${price}`,
                    currency: 'USD',
                    quantity: 1,
                }],
            },
            amount: {
                currency: 'USD',
                total: `${price}`,
            },
            description: 'Descripción del pago',
        }],
    };


    return new Promise((resolve, reject) =>  paypal.payment.create(payloadPayment, function (error: any, payment: { links: any; }) {
        if (error) {
            reject(error)
        } else {
            // Encontrar el enlace de aprobación en la respuesta
            for (let link of payment.links) {
                if (link.rel === 'approval_url') {
                    resolve(link.href)
                }
            }
        }
    }))
  

}

export { generatePaymentLink }