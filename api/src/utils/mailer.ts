import 'dotenv/config'
import { Transporter, createTransport, createTestAccount, getTestMessageUrl } from "nodemailer"
import { compile } from "handlebars"
import { readFileSync } from "fs"

/** classe para envio de emails */
export class Mailer {
	/** transporter do email */
	private client: Transporter

	/** configura transporter */
	private async setTransporter() {
		if (process.env.ENV === 'production') {
			const user = process.env.MAIL_USER
			const pass = process.env.MAIL_PASS

			this.client = createTransport({ service: 'gmail', auth: { user, pass } })
		}
		else {
			const { smtp, user, pass } = await createTestAccount()

			const transporter = createTransport({
				host: smtp.host,
				port: smtp.port,
				secure: smtp.secure,
				auth: { user, pass },
			})

			this.client = transporter
		}
	}

	/**
	 * envia um e-mail para o destinatário
	 * @param to destinatário
	 * @param subject assunto
	 * @param variables variáveis no corpo do e-mail
	 * @param path caminho para o modelo do e-mail
	 */
	async send(to: string, subject: string, variables: object, path: string) {
		await this.setTransporter()

		/** conteúdo do template do e-mail */
		const templateFileContent = readFileSync(path).toString("utf8")

		/** template do e-mail compilado */
		const mailTemplate = compile(templateFileContent)

		/** html do e-mail com as variáveis atribuídas */
		const html = mailTemplate(variables)

		/** mensagem enviada */
		const message = await this.client.sendMail({
			to, subject, html, from: "MyCalendar <noreplay@my-calendar.com.br>",
		})

		if (process.env.ENV !== 'production') {
			console.log(`Message sent: ${message.messageId}`)
    	console.log(`Preview URL: ${getTestMessageUrl(message)}`)
		}
	}
}
