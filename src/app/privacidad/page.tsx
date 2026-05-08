import LegalPage from '@/components/legal/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — nexo',
  description: 'Política de privacidad y tratamiento de datos personales de NexoCode LLC.',
}

const sectionsEs = [
  {
    heading: 'Responsable del tratamiento',
    content: 'NexoCode LLC, empresa constituida bajo las leyes del Estado de Nuevo México, Estados Unidos, es responsable del tratamiento de sus datos personales recopilados a través de nexocourier.com y los servicios asociados. Contacto: nexxo.courier@gmail.com.',
  },
  {
    heading: 'Datos que recopilamos',
    content: [
      'Datos de identificación: nombre completo, número de identificación (cédula o pasaporte).',
      'Datos de contacto: dirección de correo electrónico, número de teléfono/WhatsApp.',
      'Datos de envío: dirección de entrega en Costa Rica (provincia, cantón, distrito, señas).',
      'Datos de uso: historial de pedidos, tracking de paquetes, interacciones con la plataforma.',
      'Datos técnicos: dirección IP, tipo de dispositivo, navegador, cookies de sesión.',
    ],
  },
  {
    heading: 'Finalidad del tratamiento',
    content: [
      'Gestión y ejecución del servicio de courier contratado.',
      'Comunicación sobre el estado de envíos y novedades del servicio.',
      'Proceso de despacho aduanero y entrega en destino.',
      'Mejora de la experiencia de usuario en la plataforma.',
      'Cumplimiento de obligaciones legales y regulatorias.',
      'Envío de comunicaciones comerciales (solo con consentimiento expreso).',
    ],
  },
  {
    heading: 'Base legal del tratamiento',
    content: 'El tratamiento de sus datos se basa en: (a) la ejecución del contrato de servicio de courier; (b) el cumplimiento de obligaciones legales aplicables; (c) el interés legítimo de la empresa en mejorar sus servicios; y (d) el consentimiento del usuario cuando sea requerido.',
  },
  {
    heading: 'Transferencia a terceros',
    content: [
      'Amazon Web Services (AWS): infraestructura de hosting, autenticación y base de datos. Servidores en us-east-1 (Virginia, USA).',
      'Stripe (próximamente): procesamiento de pagos. Cumple con PCI DSS nivel 1.',
      'Operadores logísticos aliados: necesarios para ejecutar el servicio de entrega.',
      'Autoridades aduaneras: en cumplimiento de la normativa de importación costarricense.',
      'No vendemos, alquilamos ni compartimos sus datos con terceros para fines publicitarios.',
    ],
  },
  {
    heading: 'Seguridad de los datos',
    content: 'Implementamos medidas técnicas y organizativas para proteger sus datos: conexiones HTTPS/TLS, autenticación con AWS Cognito, acceso por roles, cifrado en reposo en DynamoDB. Sin embargo, ningún sistema es 100% seguro y no podemos garantizar seguridad absoluta.',
  },
  {
    heading: 'Retención de datos',
    content: 'Conservamos sus datos personales durante el tiempo necesario para prestar el servicio y cumplir con obligaciones legales. Los datos de pedidos se retienen por 5 años para efectos fiscales y legales. Los datos de cuenta se eliminan dentro de los 30 días siguientes a la solicitud de cancelación.',
  },
  {
    heading: 'Sus derechos',
    content: [
      'Acceso: puede solicitar una copia de sus datos personales que tenemos.',
      'Rectificación: puede corregir datos inexactos o incompletos.',
      'Eliminación: puede solicitar la eliminación de sus datos (sujeto a obligaciones legales).',
      'Portabilidad: puede solicitar sus datos en formato estructurado.',
      'Oposición: puede oponerse al tratamiento para fines de marketing.',
      'Para ejercer estos derechos, escríbanos a nexxo.courier@gmail.com.',
    ],
  },
  {
    heading: 'Cookies',
    content: 'Utilizamos cookies estrictamente necesarias para la autenticación y funcionamiento de la plataforma. No utilizamos cookies de seguimiento o publicidad de terceros. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad de la plataforma.',
  },
  {
    heading: 'Cambios a esta política',
    content: 'Podemos actualizar esta política periódicamente. Los cambios significativos serán notificados por correo electrónico o mediante un aviso visible en la plataforma. La fecha de última actualización siempre estará visible al inicio de este documento.',
  },
]

const sectionsEn = [
  {
    heading: 'Data Controller',
    content: 'NexoCode LLC, a company incorporated under the laws of the State of New Mexico, United States, is responsible for the processing of your personal data collected through nexocourier.com and associated services. Contact: nexxo.courier@gmail.com.',
  },
  {
    heading: 'Data We Collect',
    content: [
      'Identification data: full name, ID number (national ID or passport).',
      'Contact data: email address, phone/WhatsApp number.',
      'Shipping data: delivery address in Costa Rica (province, canton, district, directions).',
      'Usage data: order history, package tracking, platform interactions.',
      'Technical data: IP address, device type, browser, session cookies.',
    ],
  },
  {
    heading: 'Purpose of Processing',
    content: [
      'Management and execution of the contracted courier service.',
      'Communication about shipment status and service updates.',
      'Customs clearance and destination delivery process.',
      'Improvement of the user experience on the platform.',
      'Compliance with legal and regulatory obligations.',
      'Sending commercial communications (only with express consent).',
    ],
  },
  {
    heading: 'Legal Basis for Processing',
    content: 'The processing of your data is based on: (a) the execution of the courier service contract; (b) compliance with applicable legal obligations; (c) the legitimate interest of the company in improving its services; and (d) user consent when required.',
  },
  {
    heading: 'Third-Party Transfers',
    content: [
      'Amazon Web Services (AWS): hosting infrastructure, authentication, and database. Servers in us-east-1 (Virginia, USA).',
      'Stripe (coming soon): payment processing. PCI DSS Level 1 compliant.',
      'Allied logistics operators: necessary to execute the delivery service.',
      'Customs authorities: in compliance with Costa Rican import regulations.',
      'We do not sell, rent, or share your data with third parties for advertising purposes.',
    ],
  },
  {
    heading: 'Data Security',
    content: 'We implement technical and organizational measures to protect your data: HTTPS/TLS connections, AWS Cognito authentication, role-based access, encryption at rest in DynamoDB. However, no system is 100% secure and we cannot guarantee absolute security.',
  },
  {
    heading: 'Data Retention',
    content: 'We retain your personal data for as long as necessary to provide the service and comply with legal obligations. Order data is retained for 5 years for tax and legal purposes. Account data is deleted within 30 days following a cancellation request.',
  },
  {
    heading: 'Your Rights',
    content: [
      'Access: you can request a copy of your personal data we hold.',
      'Rectification: you can correct inaccurate or incomplete data.',
      'Deletion: you can request deletion of your data (subject to legal obligations).',
      'Portability: you can request your data in a structured format.',
      'Objection: you can object to processing for marketing purposes.',
      'To exercise these rights, write to us at nexxo.courier@gmail.com.',
    ],
  },
  {
    heading: 'Cookies',
    content: 'We use strictly necessary cookies for authentication and platform functionality. We do not use third-party tracking or advertising cookies. You can configure your browser to reject cookies, although this may affect platform functionality.',
  },
  {
    heading: 'Changes to This Policy',
    content: 'We may update this policy periodically. Significant changes will be notified by email or through a visible notice on the platform. The last updated date will always be visible at the beginning of this document.',
  },
]

export default function PrivacidadPage() {
  return (
    <LegalPage
      titleEs="Política de Privacidad"
      titleEn="Privacy Policy"
      lastUpdated="Mayo 2026 / May 2026"
      sectionsEs={sectionsEs}
      sectionsEn={sectionsEn}
    />
  )
}
