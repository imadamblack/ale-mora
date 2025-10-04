import Image from 'next/image';

export default function Blockbuster({overhead, title, description, background, imgPos = 'object-center'}) {

  const bg = typeof background === 'object' ? 'bg-black' : `bg-[${background}]`

  return (
    <section className={`relative flex flex-col justify-end min-h-[60vh] w-screen md:mb-0 mx-auto pt-12 md:py-20 ${bg}`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-1 to-transparent opacity-60 z-10"/>

      <div className="container mx-auto z-20">
        <div className="flex flex-col md:flex-row items-stretch justify-stretch">
          <div className="w-2/3 p-8 md:p-14">
            <p className="overhead">{overhead}</p>
            <h2
              dangerouslySetInnerHTML={{__html: title}}
              className="my-auto ft-8 font-bold text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_20%)]"
            />
            <p className="ft-3 mt-8 mx-auto w-2/3 text-white">{description}</p>
          </div>
        </div>
      </div>

      {/*<div className="w-full pt-[60%] absolute bottom-0 bg-gradient-to-t from-brand-2 via-transparent md:via-transparent to-transparent opacity-90 z-10"/>*/}
      {typeof background === 'object' &&
        <Image src={background} layout="fill" className={`object-cover ${imgPos} md:object-center`}/>
      }
    </section>
  );
}