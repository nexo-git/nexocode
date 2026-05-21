import LegalPage from '@/components/legal/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Reembolsos — nexo',
  description: 'Política de reembolsos y compensaciones de NexoCode LLC para servicios de courier USA → Costa Rica.',
}

const sectionsEs = [
  {
    heading: 'Compromiso de calidad',
    content: 'En nexo nos comprometemos a entregar sus paquetes en las condiciones en que los recibimos. Si su paquete llega dañado o se extravía bajo nuestra custodia, activamos este proceso de compensación.',
  },
  {
    heading: 'Elegibilidad para reembolso o compensación',
    content: [
      'Paquete perdido mientras estuvo bajo custodia de nexo (entre recepción en bodega USA y entrega en CR).',
      'Daño físico comprobado ocurrido mientras el paquete estuvo bajo custodia de nexo.',
      'Cobro duplicado o error de facturación comprobado.',
      'El solicitante debe ser el titular registrado de la cuenta en nexo.',
    ],
  },
  {
    heading: 'Ventana para presentar reclamos',
    content: 'Los reclamos deben presentarse dentro de los 7 días calendario siguientes a la fecha de entrega, o dentro de los 15 días siguientes a la fecha estimada de entrega en caso de paquetes no recibidos. Reclamos fuera de este plazo no serán procesados.',
  },
  {
    heading: 'Proceso de reclamo',
    content: [
      '1. Contactar a nexo por WhatsApp (+506 6113-2863) o email (soporte@nexocourier.com) dentro del plazo establecido.',
      '2. Proporcionar: número de tracking, descripción del problema, fotografías del paquete y daño (si aplica), y valor del artículo.',
      '3. nexo iniciará una investigación interna con sus operadores logísticos en un plazo de 2 días hábiles.',
      '4. La resolución será comunicada dentro de los 5 días hábiles siguientes al inicio de la investigación.',
      '5. Si procede compensación, se aplicará como crédito en cuenta o transferencia, según se acuerde.',
    ],
  },
  {
    heading: 'Monto de compensación',
    content: [
      'La compensación máxima es el valor declarado del paquete al momento del envío, hasta un límite de $200 USD por paquete.',
      'Para artículos de alto valor (>$200 USD), recomendamos declarar el valor real al registrar el paquete y consultar opciones de seguro adicional.',
      'Los gastos de flete no son reembolsables salvo en caso de pérdida total comprobada bajo custodia de nexo.',
    ],
  },
  {
    heading: 'Exclusiones — casos no elegibles',
    content: [
      'Daños ocurridos durante el transporte del remitente original a la bodega de nexo en USA.',
      'Pérdidas o daños causados por el proceso aduanero o autoridades gubernamentales.',
      'Artículos prohibidos según la sección correspondiente de los Términos y Condiciones.',
      'Daños por embalaje inadecuado realizado por el remitente original.',
      'Artículos frágiles enviados sin embalaje adecuado y sin declaración.',
      'Retrasos causados por fuerza mayor (clima, huelgas, fenómenos naturales).',
      'Artículos perecederos o de valor sentimental.',
      'Diferencias entre lo declarado y el contenido real del paquete.',
    ],
  },
  {
    heading: 'Disputas y chargebacks',
    content: 'Si tiene una disputa con nexo, le pedimos contactarnos directamente primero a soporte@nexocourier.com o WhatsApp antes de iniciar una disputa con su banco o procesador de pagos. Nos comprometemos a responder en 24 horas hábiles. Las disputas iniciadas sin contacto previo con nexo pueden resultar en la suspensión del servicio.',
  },
  {
    heading: 'Modificaciones a esta política',
    content: 'nexo se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en esta página y notificados por correo electrónico a los clientes activos con al menos 7 días de anticipación.',
  },
]

const sectionsEn = [
  {
    heading: 'Quality Commitment',
    content: 'At nexo, we are committed to delivering your packages in the same condition we received them. If your package arrives damaged or is lost while in our custody, we activate this compensation process.',
  },
  {
    heading: 'Eligibility for Refund or Compensation',
    content: [
      'Package lost while in nexo\'s custody (between receipt at the US warehouse and delivery in CR).',
      'Proven physical damage that occurred while the package was in nexo\'s custody.',
      'Duplicate charge or proven billing error.',
      'The claimant must be the registered account holder on nexo.',
    ],
  },
  {
    heading: 'Claim Window',
    content: 'Claims must be submitted within 7 calendar days after the delivery date, or within 15 days after the estimated delivery date for undelivered packages. Claims outside this window will not be processed.',
  },
  {
    heading: 'Claim Process',
    content: [
      '1. Contact nexo via WhatsApp (+506 6113-2863) or email (soporte@nexocourier.com) within the established timeframe.',
      '2. Provide: tracking number, description of the issue, photos of the package and damage (if applicable), and item value.',
      '3. nexo will initiate an internal investigation with its logistics operators within 2 business days.',
      '4. Resolution will be communicated within 5 business days from the start of the investigation.',
      '5. If compensation is approved, it will be applied as account credit or transfer, as agreed.',
    ],
  },
  {
    heading: 'Compensation Amount',
    content: [
      'Maximum compensation is the declared value of the package at the time of shipment, up to a limit of $200 USD per package.',
      'For high-value items (>$200 USD), we recommend declaring the actual value when registering the package and consulting additional insurance options.',
      'Shipping costs are non-refundable except in the case of total loss proven to be under nexo\'s custody.',
    ],
  },
  {
    heading: 'Exclusions — Non-Eligible Cases',
    content: [
      'Damage occurring during transport from the original sender to nexo\'s US warehouse.',
      'Losses or damages caused by the customs process or government authorities.',
      'Prohibited items as listed in the corresponding section of the Terms and Conditions.',
      'Damage due to inadequate packaging by the original sender.',
      'Fragile items shipped without adequate packaging and without declaration.',
      'Delays caused by force majeure (weather, strikes, natural disasters).',
      'Perishable items or items of sentimental value.',
      'Discrepancies between declared content and actual package contents.',
    ],
  },
  {
    heading: 'Disputes and Chargebacks',
    content: 'If you have a dispute with nexo, we ask that you contact us directly first at soporte@nexocourier.com or WhatsApp before initiating a dispute with your bank or payment processor. We commit to responding within 24 business hours. Disputes initiated without prior contact with nexo may result in service suspension.',
  },
  {
    heading: 'Policy Modifications',
    content: 'nexo reserves the right to modify this policy at any time. Changes will be published on this page and notified by email to active customers with at least 7 days\' notice.',
  },
]

export default function ReembolsosPage() {
  return (
    <LegalPage
      titleEs="Política de Reembolsos"
      titleEn="Refund Policy"
      lastUpdated="Mayo 2026 / May 2026"
      sectionsEs={sectionsEs}
      sectionsEn={sectionsEn}
    />
  )
}
