import LegalPage from '@/components/legal/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — nexo',
  description: 'Términos y condiciones del servicio de courier USA → Costa Rica de NexoCode LLC.',
}

const sectionsEs = [
  {
    heading: 'Aceptación de los términos',
    content: 'Al utilizar los servicios de nexo, operados por NexoCode LLC (en adelante "nexo", "nosotros" o "la empresa"), usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.',
  },
  {
    heading: 'Descripción del servicio',
    content: 'nexo proporciona servicios de courier y logística internacional en el corredor USA → Costa Rica. Esto incluye: casillero virtual en Los Ángeles, California; recepción, consolidación y reenvío de paquetes; rastreo de envíos; y entrega en Costa Rica. El servicio se opera en coordinación con operadores logísticos aliados en ambos países.',
  },
  {
    heading: 'Casillero virtual',
    content: [
      'Se asigna una dirección en Estados Unidos para recibir paquetes.',
      'La dirección del casillero es para uso exclusivo del titular registrado.',
      'Nexo no se responsabiliza por paquetes enviados con datos incorrectos o a nombre de terceros.',
      'El casillero puede ser cancelado si se detecta uso indebido o actividad fraudulenta.',
    ],
  },
  {
    heading: 'Tarifas y pagos',
    content: [
      'La tarifa base es de $14 USD por kilogramo de peso real.',
      'Los precios están sujetos a cambio con previo aviso de 7 días calendario.',
      'Los impuestos aduaneros de Costa Rica son responsabilidad del remitente y no están incluidos en la tarifa de nexo.',
      'La entrega en Guápiles Centro no tiene costo adicional. Entregas en otras zonas están sujetas a las tarifas de mensajería local.',
    ],
  },
  {
    heading: 'Artículos prohibidos',
    content: [
      'Sustancias controladas, narcóticos o drogas ilegales.',
      'Armas de fuego, municiones o armas blancas.',
      'Materiales inflamables, explosivos o peligrosos.',
      'Baterías de litio sueltas (sin dispositivo).',
      'Artículos perecederos o que requieran refrigeración.',
      'Dinero en efectivo, cheques o valores negociables.',
      'Cualquier artículo cuya importación esté prohibida por la legislación costarricense.',
      'El envío de artículos prohibidos puede resultar en retención aduanera, decomiso y responsabilidad legal para el remitente.',
    ],
  },
  {
    heading: 'Responsabilidad limitada',
    content: [
      'Nexo actúa como intermediario logístico y no asume responsabilidad por daños causados por transportistas terceros.',
      'La responsabilidad máxima de nexo ante pérdida o daño comprobado se limita al valor declarado del paquete, hasta un máximo de $200 USD por envío.',
      'Nexo no se responsabiliza por pérdidas causadas por fuerza mayor, retenciones aduaneras, condiciones climáticas o actos de terceros.',
      'No somos responsables por pérdidas económicas indirectas derivadas de retrasos en la entrega.',
    ],
  },
  {
    heading: 'Proceso aduanero',
    content: 'nexo gestiona el proceso de importación en coordinación con agentes aduaneros. Los impuestos, aranceles y gastos de aduana son cobrados por el Gobierno de Costa Rica (Hacienda/EXPORTER) y son responsabilidad exclusiva del importador. En caso de retención o inspección, nexo notificará al cliente y coordinará la resolución, sin garantizar resultados específicos.',
  },
  {
    heading: 'Modificaciones al servicio',
    content: 'Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento. Los cambios en tarifas se notificarán con al menos 7 días de anticipación. El uso continuado del servicio después de los cambios constituye aceptación de los nuevos términos.',
  },
  {
    heading: 'Privacidad y protección de datos',
    content: 'El tratamiento de sus datos personales se rige por nuestra Política de Privacidad, disponible en nexocourier.com/privacidad. Al utilizar el servicio, usted consiente el tratamiento de sus datos conforme a dicha política.',
  },
  {
    heading: 'Ley aplicable y jurisdicción',
    content: 'Estos términos se rigen por las leyes del Estado de Nuevo México, Estados Unidos. Cualquier disputa que no pueda resolverse amistosamente será sometida a arbitraje vinculante en dicho estado. Para asuntos relacionados con entregas en Costa Rica, se aplicará adicionalmente la legislación costarricense pertinente.',
  },
]

const sectionsEn = [
  {
    heading: 'Acceptance of Terms',
    content: 'By using nexo services, operated by NexoCode LLC ("nexo", "we", or "the company"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the service.',
  },
  {
    heading: 'Description of Services',
    content: 'nexo provides international courier and logistics services in the USA → Costa Rica corridor. This includes: a virtual mailbox in Los Angeles, California; package receiving, consolidation and forwarding; shipment tracking; and delivery in Costa Rica. The service operates in coordination with logistics partners in both countries.',
  },
  {
    heading: 'Virtual Mailbox',
    content: [
      'A U.S. address is assigned to receive packages.',
      'The mailbox address is for exclusive use by the registered account holder.',
      'nexo is not responsible for packages sent with incorrect details or in third-party names.',
      'The mailbox may be cancelled if misuse or fraudulent activity is detected.',
    ],
  },
  {
    heading: 'Rates and Payments',
    content: [
      'The base rate is $14 USD per kilogram of actual weight.',
      'Prices are subject to change with 7 calendar days prior notice.',
      'Costa Rican customs taxes are the responsibility of the consignee and are not included in nexo\'s rate.',
      'Delivery in Guápiles Centro is free. Deliveries to other areas are subject to local courier rates.',
    ],
  },
  {
    heading: 'Prohibited Items',
    content: [
      'Controlled substances, narcotics, or illegal drugs.',
      'Firearms, ammunition, or bladed weapons.',
      'Flammable, explosive, or hazardous materials.',
      'Loose lithium batteries (without a device).',
      'Perishable items or items requiring refrigeration.',
      'Cash, checks, or negotiable securities.',
      'Any item whose importation is prohibited under Costa Rican law.',
      'Shipping prohibited items may result in customs seizure, confiscation, and legal liability for the sender.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    content: [
      'nexo acts as a logistics intermediary and assumes no liability for damages caused by third-party carriers.',
      'nexo\'s maximum liability for proven loss or damage is limited to the declared value of the package, up to $200 USD per shipment.',
      'nexo is not responsible for losses caused by force majeure, customs delays, weather conditions, or third-party acts.',
      'We are not liable for indirect economic losses resulting from delivery delays.',
    ],
  },
  {
    heading: 'Customs Process',
    content: 'nexo manages the import process in coordination with customs agents. Taxes, duties, and customs costs are levied by the Government of Costa Rica (Hacienda) and are the sole responsibility of the importer. In case of seizure or inspection, nexo will notify the customer and coordinate resolution, without guaranteeing specific outcomes.',
  },
  {
    heading: 'Service Modifications',
    content: 'We reserve the right to modify, suspend, or discontinue any aspect of the service at any time. Rate changes will be notified at least 7 days in advance. Continued use of the service after changes constitutes acceptance of the new terms.',
  },
  {
    heading: 'Privacy and Data Protection',
    content: 'The processing of your personal data is governed by our Privacy Policy, available at nexocourier.com/privacidad. By using the service, you consent to the processing of your data in accordance with that policy.',
  },
  {
    heading: 'Governing Law and Jurisdiction',
    content: 'These terms are governed by the laws of the State of New Mexico, United States. Any dispute that cannot be resolved amicably will be submitted to binding arbitration in that state. For matters related to deliveries in Costa Rica, relevant Costa Rican legislation will additionally apply.',
  },
]

export default function TerminosPage() {
  return (
    <LegalPage
      titleEs="Términos y Condiciones"
      titleEn="Terms and Conditions"
      lastUpdated="Mayo 2026 / May 2026"
      sectionsEs={sectionsEs}
      sectionsEn={sectionsEn}
    />
  )
}
