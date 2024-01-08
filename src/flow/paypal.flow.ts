import BotWhatsapp from '@bot-whatsapp/bot';
import { generatePaymentLink } from 'src/services/paypal';

/**
 * Un flujo conversacion que responder a las palabras claves "hola", "buenas", ...
 */
export default BotWhatsapp.addKeyword(['paypal'])
    .addAnswer('¿Como es tu email? lo necesito para generar link de',{capture:true}, 
    async(ctx, {state, fallBack}) => {
        
        if(!ctx.body.includes('@')){
            return fallBack('Eyy!bro esto no es un email valido! ponte serio')
        }
        await state.update({email:ctx.body.toLowerCase()})
    })
    .addAnswer('...generando link de pago')
    .addAction(async (ctx, {flowDynamic, state}) => {
        const email = state.get('email')
        const paypalLink = await generatePaymentLink('10.00', email)
        await flowDynamic(paypalLink)
    })

