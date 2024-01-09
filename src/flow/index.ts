import { createFlow } from 'bot-ts-demo'

import BotWhatsapp from '@bot-whatsapp/bot';
import helloFlow from './hello.flow';
import welcomeFlow from './welcome.flow';
import paypalFlow from './paypal.flow';
import chatbotFlow from './chatbot.flow';
import nodeFlow from './node.flow';

import idleFlow from './idle.flow';

/**
 * Debes de implementasr todos los flujos
 */
export default createFlow(
    [
        idleFlow,
        nodeFlow
    ]
)