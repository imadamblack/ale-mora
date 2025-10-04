import { info } from '../../info';

export default function ThankYou() {
  return (
    <section className="relative flex flex-col flex-grow justify-center pt-20 px-0">
      <div className="container md:w-1/2 flex flex-col items-center gap-8">
        <h2 className="ft-8 text-center">
          ¡Gracias por registrarte!
        </h2>
        <p className="ft-4 text-center">
          Muy pronto, uno de nuestros asesores se pondrá en contacto contigo para aclarar dudas sobre tu Plan para el Retiro.
        </p>
        <p className="text-center ft-2">
          Si no se abrió nuestro calendario para agendar tu asesoría sin compromisos
        </p>
        <div className="flex flex-col items-center justify-center gap-10">
          <a
            className="button hover:scale-105 bg-brand-2 hover:bg-brand-3 ft-4 flex justify-center items-center "
            href={info.schedulerLink === '' ? `https://wa.me/${info.whatsapp.value}` : info.schedulerLink}
            target="_blank"
          >
            <span className="material-icons">arrow_forward</span>Da click aquí
            <span className="text-white material-icons">arrow_back</span>
          </a>
          <a
            className="ft-2 py-3 px-6 rounded-lg items-center  bg-green-500 hover:bg-green-600 transition-all hover:scale-105"
            href={`https://wa.me/${info.whatsapp.value}`}
          >
            <p className="text-white">
              O contáctanos por <span className="font-semibold">WhatsApp</span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
