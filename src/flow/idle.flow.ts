import { addKeyword } from 'bot-ts-demo'
import nodeFlow from './node.flow'

export default addKeyword('hola')
    .addAnswer(
        'debes de responder antes de que transcurran 2 segundos (2000)',
        { capture: true, idle: 5000 },
        async (ctx, { flowDynamic, gotoFlow }) => {
            const a = ctx as any
            if (a?.idleFallBack) {
                return gotoFlow(nodeFlow)
            }

            await flowDynamic('Gracias por tu respuesta')
        }
    )