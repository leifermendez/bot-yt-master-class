import BotWhatsapp from '@bot-whatsapp/bot';
import ProviderWS from '@bot-whatsapp/provider/baileys'

export default BotWhatsapp.createProvider(ProviderWS)