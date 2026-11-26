# UI/UX 팝업 & 모달 비교(A vs B) 쇼케이스

웹/앱 실무에서 가장 자주 헷갈리는 **9가지 오버레이 및 알림 UI 패턴 쌍(Pair)**을 좌우 듀얼 디바이스 프리뷰로 직접 조작하며 비교하고, React + Tailwind 및 Vanilla HTML/CSS/JS 코드를 즉시 복사할 수 있는 라이브러리입니다.

## 포함된 9가지 A vs B 패턴

| 번호 | 패턴 쌍 | 핵심 구분 기준 |
| :--- | :--- | :--- |
| **01** | 팝업 vs 모달 (`Popup vs Modal`) | 배경 조작 허용(비차단) vs 배경 차단(차단) |
| **02** | 토스트 vs 스낵바 (`Toast vs Snackbar`) | 단순 피드백 vs 액션 버튼(`되돌리기`) 포함 |
| **03** | 툴팁 vs 팝오버 (`Tooltip vs Popover`) | 읽기 전용 호버 힌트 vs 인터랙티브 클릭 패널 |
| **04** | 바텀시트 vs 드로어 (`Bottom sheet vs Drawer`) | 하단 슬라이드(모바일) vs 측면 전체 높이 패널 |
| **05** | 배너 vs 푸시 알림 (`Banner vs Push`) | 인앱 고정 공지 vs OS 레벨 외부 호출 알림 |
| **06** | 배지 vs 닷 (`Badge vs Dot`) | 정확한 미확인 개수 표기 vs 새 상태 유무 표기 |
| **07** | 온보딩 vs 코치마크 (`Onboarding vs Coach mark`) | 서비스 전체 흐름 소개 vs 특정 UI 스포트라이트 |
| **08** | 딤 vs 블러 (`Dim vs Blur`) | 명도 저하 오버레이 vs 가우시안 블러 배경 유지 |
| **09** | 알럿 vs 토스트 (`Alert vs Toast`) | 확인 클릭 필수 다이얼로그 vs 자동 소멸 피드백 |

## 로컬 실행 방법

```bash
npm install
npm run dev:modal-vs-showcase
```

실행 후 브라우저에서 `http://localhost:3013` 으로 접속합니다.

## 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 폴더에 정적 파일로 생성됩니다.

## Render Static Site 호스팅 가이드

저장소에 [render.yaml](./render.yaml)이 포함되어 있어 Render Blueprint 또는 수동 Static Site 생성 모두 바로 배포할 수 있습니다.

- **Service Type**: Static Site
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rule**: `/*` → `/index.html` (SPA 라우팅 호환)
