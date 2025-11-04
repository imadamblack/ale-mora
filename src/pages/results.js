import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Blockbuster from '../components/blockbuster';
import i00 from '../../public/results/00.jpg';
import iTestimonios from '../../public/survey/03.jpg';
import iBeneficios from '../../public/survey/02.jpg';
import iFaqs from '../../public/survey/05.jpg';
import Faqs from '../components/faqs';

export default function Results({lead}) {
  const {fullName} = lead;
  const firstName = fullName.split(' ')[0];

  const SectionCTA = () => <div className="w-full space-y-4">
    <hr className="mb-8"/>
    <p className="ft-4 text-center font-semibold">Tienes alguna pregunta?</p>
    <a href="" target="_blank" className="button !w-full">Mándanos un WhatsApp</a>
  </div>;

  return (
    <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
      <div
        className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
        <div className="survey-card border-b pb-12">
          <div className="flex flex-col w-full py-12">
            <h1><span className="font-semibold">{firstName ?? 'Hey'}</span>, tu sonrisa merece un plan hecho para ti
            </h1>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-12">
              <Image src={i00} layout="fill" objectFit="cover"/>
            </div>
            <p className="ft-2">Hola, soy Ale Mora, cirujana dentista con
              especialidad en ortodoncia por la Universidad Autónoma de Guadalajara. <br/><br/>
              En AM Dental Studio dirijo un
              equipo increíble y me apasiona ayudar
              a que cada persona se sienta cómoda y
              feliz con su sonrisa.</p>
          </div>
          <hr/>
          <div className="py-12">
            <h2 className="font-semibold">Agenda tu estudio clínico en una sola visita:</h2>
            <p className="ft-2">
              <br/>- radiografías
              <br/>- Escaneo digital
              <br/>- Interconsulta con especialistas
              <br/>- Diagnóstico apoyado por IA
              <br/>- Limpieza
              <br/><br/>Recibe tu plan de tratamiento, ruta clínica y cotización el mismo día.
            </p>
            <p className="ft-4 font-bold">Agenda tu consulta integral <br/>$2,000 MXN</p>
            <span className="-ft-1">Pagas hasta el día de tu consulta.</span>
          </div>

          <SectionCTA/>

        </div>
      </div>

      <Blockbuster
        overhead="Testimonios"
        title="Pacientes que ya confiaron en nosotros."
        background={iTestimonios}
      />
      <section className="reading-container my-20">
        <div className="w-full mb-20">
          <div className="relative">
            <div className="relative w-full aspect-[1/.88] overflow-hidden">
              <Image src="/survey/Testimonios_01.png" layout="fill" objectFit="cover" objectPosition="top"/>
            </div>
            <div className="relative w-full aspect-[1/.97] overflow-hidden">
              <Image src="/survey/Testimonios_02.png" layout="fill" objectFit="cover" objectPosition="top"/>
            </div>
            <div className="relative w-full aspect-[1/1.2] overflow-hidden mb-4">
              <Image src="/survey/Testimonios_03.png" layout="fill" objectFit="cover" objectPosition="top"/>
            </div>
          </div>
        </div>
        <SectionCTA/>
      </section>

      <Blockbuster
        overhead="Beneficios"
        title="La diferencia está en como te cuidamos"
        background={iBeneficios}
      />

      <section className="container my-20">
        <div className="gap-8 grid grid-cols-1 mb-20">
          <div className="p-6 rounded-xl bg-brand-2 border-2 border-brand-2 shadow-md">
            <p className="font-semibold ft-4 text-center">+500 sonrisas transformadas</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-2 border-2 border-brand-2 shadow-md">
            <p className="font-semibold ft-4 text-center">Atención 24/7 por WhatsApp</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-2 border-2 border-brand-2 shadow-md">
            <p className="font-semibold ft-4 text-center">Diagnóstico con IA</p>
          </div>
          <div className="p-6 rounded-xl bg-brand-2 border-2 border-brand-2 shadow-md">
            <p className="font-semibold ft-4 text-center">Opciones de pago accesibles</p>
          </div>
        </div>
        <SectionCTA/>
      </section>

      <Blockbuster
        overhead="FAQs"
        title="¿Dudas sobre tu tratamiento? probablemente estén aquí"
        background={iFaqs}
      />

      <section className="container my-20">
        <Faqs/>
        <SectionCTA/>
      </section>

    </div>
  );
}

export async function getServerSideProps(ctx) {
  const {req, res} = ctx;
  const leadCookie = getCookie('lead', {req, res}) || '{}';
  const _fbc = getCookie('_fbc') || '';
  const _fbp = getCookie('_fbp') || '';

  const lead = JSON.parse(leadCookie);

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      lead: {
        fullName: lead.fullName,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        sheetRow: lead.sheetRow || '',
        _fbc,
        _fbp,
      },
    },
  };
}