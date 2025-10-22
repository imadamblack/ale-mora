'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { info } from '../../info';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../public/logo.svg';
import i02 from '../../public/survey/02.jpg';
import i03 from '../../public/survey/03.jpg';
import i04 from '../../public/survey/04.jpg';

const Intro = () => <motion.div
  key="intro"
  initial={{opacity: 0}}
  animate={{opacity: 1}}
  exit={{opacity: 0}}
  transition={{duration: 0.5}}
  className="bg-[url('/survey/00.jpg')] bg-center bg-cover relative flex-grow flex flex-col items-center justify-end px-4 py-12"
>
  <div className="absolute mx-auto inset-x-0 w-[32rem] h-[10rem] top-[4rem] brightness-200">
    <Image src={logo} layout="fill" className="object-contain"/>
  </div>

  <div className="absolute bg-gradient-to-t from-brand-1 to-transparent bottom-0 h-[60dvh] w-full "/>

  <div className="container flex flex-col justify-center items-center z-10">
    <h1 className="ft-11 text-white font-semibold my-12 text-center">La sonrisa que sueñas está más
      cerca de lo que imaginas</h1>
    <p className="ft-4 font-medium text-white text-center">Sencillo, sin dolor y sin tratamientos innecesarios</p>

    <div className="w-full max-w-[50rem] h-12 p-2 mt-16 mb-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{width: '0%'}}
        animate={{width: '100%'}}
        transition={{duration: 3, ease: 'easeInOut'}}
        className="h-full bg-gradient-to-br from-blue-800 to-indigo-500 rounded-2xl"
      />
    </div>
    <p className="-ft-1 flex items-center text-center text-gray-100">
      Cargando el test
      <span
        className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
    </p>
  </div>
</motion.div>;

const setFormSteps = ({fullName, phone}) => ([
  {
    type: 'radio',
    name: 'sensacion',
    title: '¿Cómo te sientes hoy con tu sonrisa?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'puede-mejorar',
        label: 'Me gusta pero creo que podría mejorar',
      },
      {
        value: 'sin-idea',
        label: 'No tengo idea si necesito algo',
      },
      {
        value: 'inseguridad',
        label: 'A veces me siento inseguro',
      },
      {
        value: 'quiere-cambio',
        label: 'Me siento bien, pero quiero un cambio',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'mejora',
    title: '¿Qué te gustaría mejorar?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'blanqueamiento',
        label: 'Quiero quitarme las manchas blancas o zonas amarillentas',
      },
      {
        value: 'forma',
        label: 'Forma, tamaño o espacios',
      },
      {
        value: 'dientes-chuecos',
        label: 'Tengo los dientes chuecos o montados',
      },
      {
        value: 'no-sabe',
        label: 'No lo sé, quiero ver si hay algo',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'interes',
    title: '¿Por qué te interesa mejorar tu sonrisa hoy?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'mayor-seguridad',
        label: 'Para sentirme más seguro',
      },
      {
        value: 'evento-importante',
        label: 'Se viene un evento importante',
      },
      {
        value: 'ya-es-consciente',
        label: 'Porque nunca lo he hecho y ya quiero atenderme',
      },
      {
        value: 'cuidado',
        label: 'Porque me gusta cuidarme',
      },
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    autoAdvance: true,
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">La diferencia está en como te cuidamos</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i02} layout="fill" objectFit="cover"/>
        </div>
        <div className="gap-8 grid grid-cols-1">
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
      </div>
    ),
  },
  {
    type: 'text',
    name: 'edad',
    title: '¿Cuántos años tienes?',
    inputOptions: {required: 'Compártenos tu edad'},
  },
  {
    type: 'radio',
    name: 'frecuencia',
    title: '¿Vas al dentista con frecuencia?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'frecuente',
        label: 'Sí, cada 6 meses',
      },
      {
        value: 'por-dolor',
        label: 'Solo si me duele algo',
      },
      {
        value: 'estetico',
        label: 'Fui hace poco por algo estético',
      },
      {
        value: 'hace-mucho',
        label: 'Hace mucho que no voy',
      },
    ],
    cols: 1,
  },
  {
    type: 'textarea',
    name: 'creencia',
    title: 'Cuéntame qué quieres lograr con este cambio o qué crees que necesitas.',
    inputOptions: {required: 'Selecciona una por favor'},
    cols: 4,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-2',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">Pacientes que ya confiaron en nosotros</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i03} layout="fill" objectFit="cover"/>
        </div>
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
    ),
  },
  {
    type: 'radio',
    name: 'valoracion',
    title: '¿Has recibido una valoración de tratamiento antes?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'con-valoracion-previa',
        label: 'Sí pero no me convenció',
      },
      {
        value: 'comparando-opciones',
        label: 'Sí, estoy comparando',
      },
      {
        value: 'primera-vez',
        label: 'No, apenas estoy buscando',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'inmediatez',
    title: '¿Cuándo te gustaría comenzar tu tratamiento?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'inmediato',
        label: 'Lo antes posible!',
      },
      {
        value: '2-semanas',
        label: 'En un par de semanas',
      },
      {
        value: 'no-sabe',
        label: 'Más adelante, estoy explorando',
      },
      {
        value: 'depende',
        label: 'Depende de que me recomienden',
      },
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-3',
    autoAdvance: true,
    render: () => (
      <div className="container flex flex-col justify-center items-center z-10">
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i04} layout="fill" objectFit="cover"/>
        </div>
        <p className="ft-4 font-semibold mt-12 text-center">Dame unos segundos</p>
        <h1 className="ft-8 mb-12 text-center md:w-2/3">Estamos analizando tus respuestas</h1>

        <div className="w-full max-w-[50rem] h-12 p-2 mt-8 mb-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{width: '0%'}}
            animate={{width: '100%'}}
            transition={{duration: 5, ease: 'easeInOut'}}
            className="h-full bg-gradient-to-br from-blue-800 to-indigo-500 rounded-2xl"
          />
        </div>
        <p className="-ft-1 flex items-center text-center">
          Analizando
          <span
            className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
        </p>
      </div>
    ),
  },
  {
    type: 'opt-in',
    title: 'Ok, estamos listos para trabajar en tu nueva sonrisa',
    description: 'Compárteme tu nombre y WhatsApp para programar tu valoración presencial.',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Tu nombre completo',
        inputOptions: {value: fullName, required: 'Cómo te llamas?'},
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'Tu WhatsApp',
        inputOptions: {
          value: phone,
          required: 'Cuál es tu WhatsApp?',
          maxLength: {value: 10, message: 'Tu tel a 10 digitos'},
          minLength: {value: 10, message: 'Tu tel a 10 digitos'},
        },
      },
    ],
  },
]);

export default function Survey({lead, utm}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);

  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  useEffect(() => {
    const current = formSteps[formStep];

    if (current.autoAdvance) {
      const timer = setTimeout(() => {
        setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStep]);
  useEffect(() => {
    const step = formSteps[formStep];

    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
      console.log(step?.name);
    }
  }, [formStep]);

  let formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone});

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);
  const handleNext = async () => {
    const currentStep = formSteps[formStep];

    if (currentStep.name === 'user') {
      formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone, user: watch('user')});
    }

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const valid = await methods.trigger(currentStep.name);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };
  const onSubmit = async (data) => {
    setSending(true);
    try {
      data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');

      const payload = {...lead, ...data, ...utm};

      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fbEvent(
        'Lead',
        {phone: data.phone, externalID: res.id},
      );

      setCookie('lead', {...data, id: res.id});

      await router.push('/results');

    } catch (err) {
      console.error('Error al enviar formulario:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro/>
          )}
          {!showIntro && !showOutro && (
            <motion.div
              key="survey"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
              className="flex flex-col flex-grow pb-[8rem]"
            >
              <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
                <div className="relative bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
                </div>
              </div>
              <div
                className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
                <div className="survey-card">
                  <FormProvider {...methods}>
                    <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={formStep} // importante para animaciones entre pasos
                          initial={{opacity: 0, x: 100}}
                          animate={{opacity: 1, x: 0}}
                          exit={{opacity: 0, x: -100}}
                          transition={{duration: 0.4, ease: 'easeInOut'}}
                        >
                          <StepRenderer
                            step={formSteps[formStep]}
                            index={formStep}
                            currentStep={formStep}
                            errors={errors}
                            inputError={inputError}
                            errorMessage={errors[formSteps[formStep]?.name]?.message}
                            register={register}
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div
                        className={`fixed p-8 bottom-0 inset-x-0 grid ${formSteps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                        {formSteps[formStep].type !== 'checkpoint' &&
                          <button
                            type="button"
                            onClick={() => setFormStep(formStep - 1)}
                            className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                            disabled={formStep <= 0}
                          >Atrás
                          </button>
                        }
                        <button
                          type="button"
                          disabled={sending}
                          onClick={() => {
                            if (formStep === lastInputIndex) {
                              handleSubmit(onSubmit)();
                            } else {
                              handleNext();
                            }
                          }}
                          className="mt-auto !w-full"
                        >
                          {sending && <span className="animate-spin mr-4">+</span>}
                          {formStep === lastInputIndex ? 'Continuar' : 'Siguiente'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {req, res} = ctx;
  const leadCookie = getCookie('lead', {req, res}) || '{}';
  const leadUtmCookie = getCookie('lead_utm', {req, res}) || '{}';
  const _fbc = getCookie('_fbc', {req, res}) || '';
  const _fbp = getCookie('_fbp', {req, res}) || '';

  const lead = JSON.parse(leadCookie);
  const leadUtm = JSON.parse(leadUtmCookie);

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    return {
      props: {
        lead: {
          fullName: '',
          phone: '',
          whatsapp: '',
          sheetRow: '',
          _fbc,
          _fbp,
        },
        utm: leadUtm,
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
      utm: leadUtm,
    },
  };
}
