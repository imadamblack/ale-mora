import Link from 'next/link';
import { info } from '../../../info';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <header
      className={`fixed top-0 ${path === '/survey' ? 'bg-transparent' : 'bg-brand-1/90'} backdrop-blur-lg w-screen shadow-lg ${path === '/survey' ? 'h-[4rem]' : 'h-[6.4rem]'} flex justify-center z-[99] hover:top-0`}
    >
      <div className="flex items-center z-[10]">
        <div className="relative flex justify-center items-center h-[4rem] w-[24rem]">
          <Link href="/" passhref>
            <a>
              <Image
                src={logo}
                alt={info.companyName}
                layout="fill"
                objectFit="contain"
                className="brightness-200"
              />
            </a>
          </Link>
        </div>
      </div>
    </header>

  );
}
