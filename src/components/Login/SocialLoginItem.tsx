import FacebookLogo from '@public/Logo/facebookLogo.svg';
import GoogleLogo from '@public/Logo/googleLogo.svg';
import KakaoLogo from '@public/Logo/kakaoLogo.svg';
import NaverLogo from '@public/Logo/naverLogo.svg';
import Link from 'next/link';

interface SocialLoginItemProp {
  sns: 'facebook' | 'google' | 'kakao' | 'naver';
}

export default function SocialLoginItem({ sns }: SocialLoginItemProp) {
  const loginURL =
    sns === 'facebook'
      ? `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/oauth2/authorization/facebook`
      : sns === 'google'
      ? `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/oauth2/authorization/google`
      : sns === 'kakao'
      ? `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/oauth2/authorization/kakao`
      : `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/oauth2/authorization/naver`;

  return (
    <Link href={loginURL} className="w-[50%] h-[45px]">
      <div className="h-full shadow-whiteShadow flex justify-center items-center rounded-[15px] relative">
        {sns === 'facebook' && (
          <FacebookLogo className="absolute left-[15px]" />
        )}
        {sns === 'google' && <GoogleLogo className="absolute left-[15px]" />}
        {sns === 'kakao' && <KakaoLogo className="absolute left-[15px]" />}
        {sns === 'naver' && <NaverLogo className="absolute left-[15px]" />}
        <span className="absolute left-[40%]">{`Log In with ${sns}`}</span>
      </div>
    </Link>
  );
}
