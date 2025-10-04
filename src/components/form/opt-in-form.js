import Link from 'next/link';
import { info } from '../../../info';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { restrictNumber, emailRegExp } from '../../utils/formValidators';
import fbEvent from '../../services/fbEvents';
import { Select } from './formAtoms';

export default function OptInForm({lastClick = ''}) {
  const [sending, setSending] = useState(false);
  const [utm, setUtm] = useState({});
  const router = useRouter();
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = methods;

  useEffect(() => {
    const leadUtm = getCookie('lead_utm');
    setUtm(JSON.parse(leadUtm));
  }, []);

  const onSubmit = (data) => {
    setSending(true);
    data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');
    data.origin = 'Notoriovs Landing';
    data.lastClick = lastClick;

    const _fbc = getCookie('_fbc');
    const _fbp = getCookie('_fbp');
    const payload = {...data, ...utm, _fbc, _fbp};

    console.log('opt in', payload);

    fetch(info.optInWebhook, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json())
      // Send FB Event
      .then(({sheetRow, crmId}) => {
        fbEvent(
          'Lead',
          {email: data.email, phone: data.phone, externalID: crmId},
        );
        setCookie('lead', {...data, sheetRow, crmId});
        router.push(`/survey?id=${crmId}`);
      })
      .catch(() => {
        fbEvent(
          'Lead',
          {email: data.email, phone: data.phone, externalID: ''},
        );
        setCookie('lead', {...data});
        router.push(`/thankyou`);
      })
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register(
            'fullName',
            {
              required: true,
            },
          )}
          className={errors.fullName && '!bg-red-200'}
          placeholder="Nombre"/>
        <input
          {...register(
            'email',
            {
              required: true,
              pattern: {
                value: emailRegExp,
                message: 'Revisa tu correo',
              },
            },
          )}
          className={errors.email && '!bg-red-200'}
          placeholder="Email"/>
        <input
          {...register(
            'phone',
            {required: true, maxLength: 10, minLength: 10},
          )}
          className={errors.phone && '!bg-red-200'}
          onKeyDown={restrictNumber}
          placeholder="Numero de WhatsApp"/>

        <button
          disabled={sending}
          className={`w-full ${sending ? '!bg-transparent' : 'hover:!bg-brand-3'}`}
        >{
          !sending
            ? 'Enviar →'
            : <span className="material-symbols-outlined animate-spin">progress_activity</span>
        }</button>

        <div className="mt-4">
          <p className="-ft-3 text-center">Al dar clic aceptas nuestra&nbsp;
            <Link href={info.privacyNotice}>política de privacidad</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}