import { buildDecrypt, CommitmentPolicy, KmsKeyringNode } from '@aws-crypto/client-node'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

const { decrypt } = buildDecrypt(CommitmentPolicy.FORBID_ENCRYPT_ALLOW_DECRYPT)
const keyring = new KmsKeyringNode({ discovery: true })
const secretsClient = new SecretsManagerClient({})
let cachedResendKey: string | null = null

async function getResendApiKey(): Promise<string> {
  if (cachedResendKey) return cachedResendKey
  const r = await secretsClient.send(new GetSecretValueCommand({ SecretId: process.env.RESEND_SECRET_ARN }))
  cachedResendKey = JSON.parse(r.SecretString!).apiKey
  return cachedResendKey!
}

async function decryptCode(encryptedCode: string): Promise<string> {
  const { plaintext } = await decrypt(keyring, Buffer.from(encryptedCode, 'base64'))
  return plaintext.toString('utf8')
}

export async function handler(event: any): Promise<void> {
  const { triggerSource, request } = event
  const attrs = request.userAttributes || {}
  const raw: string = attrs.name || attrs.given_name || event.userName || 'cliente'
  const firstName = raw.split(' ')[0]
  const to: string = attrs.email

  if (!to || !request.code) return

  const code = await decryptCode(request.code)

  let subject: string
  let html: string

  if (triggerSource === 'CustomEmailSender_SignUp' || triggerSource === 'CustomEmailSender_ResendCode') {
    subject = 'Tu código de verificación — nexo Courier'
    html = buildVerificationHtml(firstName, code)
  } else if (triggerSource === 'CustomEmailSender_ForgotPassword') {
    subject = 'Recuperá tu contraseña — nexo Courier'
    html = buildPasswordResetHtml(firstName, code)
  } else if (triggerSource === 'CustomEmailSender_AdminCreateUser') {
    subject = 'Tu cuenta nexo Courier — contraseña temporal'
    html = buildAdminCreateHtml(firstName, code)
  } else {
    return
  }

  const apiKey = await getResendApiKey()
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'nexo <notificaciones@nexocourier.com>', to: [to], subject, html }),
  })
  if (!res.ok) {
    const body = await res.text()
    console.error(JSON.stringify({ event: 'RESEND_ERROR', status: res.status, body, to, triggerSource }))
    throw new Error('Resend error ' + res.status)
  }
}

function buildVerificationHtml(firstName: string, code: string): string {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#F4F7FC;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;padding:32px 16px;"><tr><td align="center">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">'
    + '<tr><td style="background:#0A0E1A;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">'
    + '<div style="font-size:26px;font-weight:800;"><span style="color:#00D4FF;">nexo</span><span style="color:#fff;">courier</span></div>'
    + '<div style="color:#8899AA;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase;">USA → Costa Rica</div>'
    + '</td></tr>'
    + '<tr><td style="background:#0A0E1A;padding:0 32px 24px;text-align:center;">'
    + '<span style="display:inline-block;background:#00D4FF20;color:#00D4FF;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 16px;border-radius:100px;border:1px solid #00D4FF40;">VERIFICA TU CUENTA</span>'
    + '</td></tr>'
    + '<tr><td style="background:#fff;padding:36px 32px;">'
    + '<div style="text-align:center;margin-bottom:24px;">'
    + '<div style="font-size:48px;line-height:1;margin-bottom:16px;">🔐</div>'
    + '<h1 style="margin:0;color:#0A0E1A;font-size:22px;font-weight:700;line-height:1.3;">Confirmá tu correo</h1>'
    + '</div>'
    + '<p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 12px;">Hola <strong>' + firstName + '</strong>,</p>'
    + '<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">Ingresá el siguiente código en la pantalla de verificación para activar tu cuenta:</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr><td style="text-align:center;">'
    + '<div style="display:inline-block;background:#0A0E1A;border-radius:12px;padding:20px 40px;">'
    + '<div style="color:#00D4FF;font-size:36px;font-weight:800;letter-spacing:8px;font-family:Courier New,Courier,monospace;">' + code + '</div>'
    + '</div>'
    + '<div style="color:#9CA3AF;font-size:12px;margin-top:12px;">Este código expira en 24 horas</div>'
    + '</td></tr></table>'
    + '<p style="color:#9CA3AF;font-size:13px;line-height:1.5;margin:0;text-align:center;">Si no creaste una cuenta en nexo Courier, ignorá este mensaje.</p>'
    + '</td></tr>'
    + '<tr><td style="background:#0A0E1A;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">'
    + '<p style="margin:0;font-size:12px;"><span style="color:#00D4FF;font-weight:700;">nexo</span><span style="color:#6B7280;">courier</span> · <a href="https://www.nexocourier.com" style="color:#6B7280;text-decoration:none;">nexocourier.com</a></p>'
    + '</td></tr>'
    + '</table></td></tr></table>'
    + '</body></html>'
}

function buildPasswordResetHtml(firstName: string, code: string): string {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#F4F7FC;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;padding:32px 16px;"><tr><td align="center">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">'
    + '<tr><td style="background:#0A0E1A;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">'
    + '<div style="font-size:26px;font-weight:800;"><span style="color:#00D4FF;">nexo</span><span style="color:#fff;">courier</span></div>'
    + '<div style="color:#8899AA;font-size:12px;margin-top:4px;letter-spacing:1px;text-transform:uppercase;">USA → Costa Rica</div>'
    + '</td></tr>'
    + '<tr><td style="background:#0A0E1A;padding:0 32px 24px;text-align:center;">'
    + '<span style="display:inline-block;background:#FF6B3520;color:#FF6B35;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 16px;border-radius:100px;border:1px solid #FF6B3540;">RECUPERACIÓN DE CUENTA</span>'
    + '</td></tr>'
    + '<tr><td style="background:#fff;padding:36px 32px;">'
    + '<div style="text-align:center;margin-bottom:24px;">'
    + '<div style="font-size:48px;line-height:1;margin-bottom:16px;">🔑</div>'
    + '<h1 style="margin:0;color:#0A0E1A;font-size:22px;font-weight:700;line-height:1.3;">Recuperá tu contraseña</h1>'
    + '</div>'
    + '<p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 12px;">Hola <strong>' + firstName + '</strong>,</p>'
    + '<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">Ingresá el siguiente código para restablecer tu contraseña:</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr><td style="text-align:center;">'
    + '<div style="display:inline-block;background:#0A0E1A;border-radius:12px;padding:20px 40px;">'
    + '<div style="color:#00D4FF;font-size:36px;font-weight:800;letter-spacing:8px;font-family:Courier New,Courier,monospace;">' + code + '</div>'
    + '</div>'
    + '<div style="color:#9CA3AF;font-size:12px;margin-top:12px;">Este código expira en 1 hora</div>'
    + '</td></tr></table>'
    + '<p style="color:#9CA3AF;font-size:13px;line-height:1.5;margin:0;text-align:center;">Si no solicitaste recuperar tu contraseña, ignorá este mensaje.</p>'
    + '</td></tr>'
    + '<tr><td style="background:#0A0E1A;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">'
    + '<p style="margin:0;font-size:12px;"><span style="color:#00D4FF;font-weight:700;">nexo</span><span style="color:#6B7280;">courier</span> · <a href="https://www.nexocourier.com" style="color:#6B7280;text-decoration:none;">nexocourier.com</a></p>'
    + '</td></tr>'
    + '</table></td></tr></table>'
    + '</body></html>'
}

function buildAdminCreateHtml(firstName: string, code: string): string {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
    + '<body style="margin:0;padding:0;background:#F4F7FC;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FC;padding:32px 16px;"><tr><td align="center">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">'
    + '<tr><td style="background:#0A0E1A;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">'
    + '<div style="font-size:26px;font-weight:800;"><span style="color:#00D4FF;">nexo</span><span style="color:#fff;">courier</span></div>'
    + '</td></tr>'
    + '<tr><td style="background:#fff;padding:36px 32px;">'
    + '<p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 12px;">Hola <strong>' + firstName + '</strong>,</p>'
    + '<p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">Tu cuenta fue creada. Tu contraseña temporal es:</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr><td style="text-align:center;">'
    + '<div style="display:inline-block;background:#0A0E1A;border-radius:12px;padding:20px 40px;">'
    + '<div style="color:#00D4FF;font-size:24px;font-weight:800;letter-spacing:4px;font-family:Courier New,Courier,monospace;">' + code + '</div>'
    + '</div>'
    + '</td></tr></table>'
    + '<p style="color:#9CA3AF;font-size:13px;line-height:1.5;margin:0;text-align:center;">Cambiá tu contraseña al iniciar sesión.</p>'
    + '</td></tr>'
    + '<tr><td style="background:#0A0E1A;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">'
    + '<p style="margin:0;font-size:12px;"><span style="color:#00D4FF;font-weight:700;">nexo</span><span style="color:#6B7280;">courier</span> · <a href="https://www.nexocourier.com" style="color:#6B7280;text-decoration:none;">nexocourier.com</a></p>'
    + '</td></tr>'
    + '</table></td></tr></table>'
    + '</body></html>'
}
