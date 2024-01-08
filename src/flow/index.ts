import BotWhatsapp from '@bot-whatsapp/bot';
import helloFlow from './hello.flow';
import welcomeFlow from './welcome.flow';
import paypalFlow from './paypal.flow';
import chatbotFlow from './chatbot.flow';
import nodeFlow from './node.flow';

/**
 * Debes de implementasr todos los flujos
 */
export default BotWhatsapp.createFlow(
    [
        helloFlow,
        welcomeFlow,
        paypalFlow,
        chatbotFlow,
        nodeFlow
    ]
)