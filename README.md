# Voice Me Sing 프로젝트 frontend 🎤

[배포 링크](voice-me-sing-frontend-fork-repo-for-deploy.vercel.app)

## 기술 스택 선정 📙

1. nextJS : 서버 사이드 렌더링 기능을 지원하여 검색 엔진 최적화 가능
2. tailwindCSS : nextJS의 서버 사이드 렌더링을 고려한 스타일링 & 추후 유지 보수가 용이함
3. typescript : vanilla Javascript를 사용하면 잡아내기 힘든 런타임 에러를 컴파일 타임에 잡아냄
4. redux/toolkit : react의 기본 상태를 이용하면 prop drilling이 발생하기에 코드 유지 보수가 어렵고, 불필요한 리렌더링을 줄임으로써 성능을 최적화

## 페이지 별 기능 ⚒️

1. 로그인(`/login`) : 이메일 & 패스워드 기반 방식, sns 로그인 방식
2. 회원 가입(`/signup`) : 이메일 & 패스워드 기반 방식, sns 로그인 방식
3. vocal model 생성(`/train-vocal`) : model name과 사용자의 vocal 파일 업로드
4. create cover song(`/create-song`) : cover name, modelId, 사용자의
5. profile(`/profile`) :
6. collections/model(`/collections/model`): 생성한 model의 정보를 볼 수 있고 이를 기반으로 음원 생성 페이지로 넘어갈 수 있음
7. collections/song(`/collections/song`): 지금까지 생성한 음원을 볼 수 있고, 음원 듣기 & 다운로드가 가능함

### 기본 레이아웃 컨셉 ❗️

- 화면은 웹 뷰를 기준으로 하며, 추후에 hamburger UI 등을 통해 모바일 디바이스를 지원할 가능성이 있음
- 페이지 간의 이동(navigation)은 화면 왼쪽 영역을 기준으로 링크들이 존재함
- 수직 nav bar는 왼쪽에 고정됨. 즉, 모든 페이지에서 접근할 수 있음. 다만 사용자와의 인터렉션이 일어나고 로그인, 로그아웃 개념은 클라이언트 단에서 받아와야 하므로 클라이언트 컴포넌트로 만들어줌

### Trouble Shooting 😉

1. 개인 public 레포지토리를 통한 배포가 아니라, organization 명의의 레포지토리를 배포하고 싶다....!
2. 인증 토큰을 어떻게 관리할 것인가?<br>
   기본적으로 로그인 시에 백엔드로부터 `accessToken`과 `refreshToken`을 받는다. 전자는 api response의 body로 받으며 이를 Javascript로 제어하기 위해 `access-control-expose-header` 속성에 명시하여 컨트롤 한다. 후자는 accessToken이 프론트엔드 상태로 관리되기 때문에 새로 고침 등의 이유로 사라졌을 경우 재발급을 위한 것이지 백엔드로의 인가를 위한 것은 아니다. 이는 매번 요청 시에 자동으로 백엔드 도메인으로 전송되도록 하기 위해 쿠키에 `httpOnly` 속성과 함께 설정한다.
   현재 프론트엔드와 백엔드의 도메인이 다르므로 chrome 브라우저의 정책을 지원하기 위해 `sameSite` 속성을 none으로 설정한다. 이는 `secure` 속성을 강제하므로 프론트엔드 개발 환경을 https 로 맞춰준다. <br>
   이 과정에서 accessToken을 프론트엔드 상태로 관리하기 때문에 사용자가 새로고침하면 없어질 수있다. 따라서 해당 페이지들에서 accessToken이 바뀔 때마다 검사를 진행하는 로직이 필요하다. 따라서 `/refresh` api를 이용해 해당 사용자가 refresh token을 가졌는지 확인한다. `httpOnly` 속성을 이용해 Javascript로 이에 접근하지 못함을 보장 받았기에 가능한 일이다.<br>
   따라서 커스텀 훅도 이를 반영해 `page` 컴포넌트들에 적용한다. `useAccessTokenRedirect`훅은 이를 위해 accessToken이 변경되었 을떄 `/refresh` api로 post 요청을 날려 해당 사용자가 로그인 되었는지를 확인한다. false가 반환되는 경우에는 NoneLoginUser 페이지로 라우팅하고 그렇지 않은 경우에는 `reissue` api를 적용하는 개념이라고 생각하면 된다.<br>
   현재 `useReissueAccessTokenWithRefreshToken` 훅은 기존의 `useAccessTokenRedirect`의 로직에 포함되지만, 후자는 라우팅 로직까지 포함하기 위해 만들어준 결과이다(실행 컨텍스트를 고려) -> 추후 해결 필요

## Build 🏠

1. typescript
   - `global.d.ts` : 전역적으로 사용되는 변수나 window 객체를 커스터마이징
   - `next.d.ts` : nextJS 프레임워크를 타입스크립트와 함께 사용하기 위해 만들어지는 설정 파일로서, 개발자가 건드릴 필요가 없음
2. svgr : `svg` 파일을 리액트 컴포넌트로 사용할 수 있게 도와주는 webpack 플러그인으로, svg 확장자의 파일을 끌어오면 됨

## State Management

1. redux : flux 디자인 패턴에 입각한 전역 상태관리 라이브러리. redux tool kit을 이용하여 slice를 만들어준 뒤, 이를 store의 slice에 전달함
2. nextJS 서버는 여러 요청으로부터 오는 store가 섞이면 안되니까 클라이언트 단에서 이를 싱글턴 패턴으로 유지함. 따라서 `makeStore` 라는 함수는 `configureStore()` 함수를 반환하는 함수에 해당하고 `StoreProvider` 컴포넌트에서는 이를 클라이언트 상태로 관리함
3. train-vocal, create-song, collection, profile 페이지들은 클라이언트 상태로 관리하고 있는 accessToken이 null인지를 검사하고(그 동안 대체 progress UI를 보여줌), 없다면 다른 NoneLoginUser 페이지로 보내버림
