import express from "express"
import { createReadStream } from "fs"
import { join } from "path"
const app = express()

const PORT = process.env?.PORT ?? 3000

/**
 * inicia tu servicio HTTP (web)
 */
const initServer = (botInstance:any) => {

    app.get('/callback',(req, res) => {
        const query = req.query
        console.log(`[QUERY]:`,query)

        if(query && query?.status === 'fail'){
            res.redirect(`https://app.codigoencasa.com`)
            return
        }

        res.send(`Todo Ok`)
    })

    app.get("/qr", async (_, res) => {
        const PATH_QR = join(process.cwd(), `bot.qr.png`);
        const fileStream = createReadStream(PATH_QR);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
      });


    app.listen(PORT, () => {
        console.log(`http://locahost:${PORT} listo!`)
    })
 }

export { initServer }