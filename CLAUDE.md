# CLAUDE.md — 캔들 향 로드·왁스 계산기

## 개요

캔들 개수·용기 충전량·향료 비율을 넣으면 왁스와 프래그런스 오일의 무게(g·oz)를 계산하는 정적 웹툴.
`~/micro-tools/tool-candidates.html`의 8번 후보. 테니스 대진표 생성기(tennis-matchup-maker) 모델을 단순화해 복제했다.

## 구조

```
public/          # 배포 루트 그대로 (빌드·복사 단계 없음)
  index.html     # 계산기 + 계산 방식 + FAQ (SEO 본문)
  privacy.html   # 개인정보처리방침 (lang-block 4개)
  terms.html     # 이용약관 (lang-block 4개)
  script.js      # calc() + 번역 객체 T + 페이지 연결
  style.css      # 토큰 기반, 다크모드는 prefers-color-scheme만 (토글 없음)
  ads.txt / robots.txt / sitemap.xml
test_calc.js     # node test_calc.js — 계산식 + 4개 언어 키 일치 검증
```

## 계산식

- 부피 입력(ml, fl oz)은 0.86 g/ml로 무게 환산. 무게 입력(g, oz)은 그대로.
- 향료 비율 "왁스 무게 기준"(기본, 공급사 관행): 왁스 = 충전량 ÷ (1 + 비율), 오일 = 왁스 × 비율
- "전체 무게 기준": 오일 = 충전량 × 비율, 왁스 = 충전량 − 오일
- FAQ의 예시 숫자(8 fl oz → 188 g + 15 g, 200 ml → 159 g + 13 g)는 test_calc.js가 고정한다. 계산식을 바꾸면 FAQ 문구 4개 언어도 같이 고칠 것.

## 다국어 (en 기본, de·fr·ja)

- 우선순위: `?lang=` > localStorage > 브라우저 언어 > en. hreflang이 `?lang=`을 가리키므로 제거 금지.
- UI 텍스트는 `data-i18n`, meta는 `data-i18n-content`, 법적 페이지는 `.lang-block[data-lang]`.
- 새 키는 `T`의 4개 언어 모두에 추가. 빠지면 test_calc.js가 실패한다.
- en 이외 언어는 첫 방문 시 단위 ml·200으로 시작한다. 그래서 공유 링크는 항상 입력값 전체를 URL에 적는다.

## 도메인

- candle-calculator.com. Namecheap에서 2026-11-06 등록, 1년, 자동 갱신(갱신가 $15.98/년), 무료 개인정보 보호.
- 네임서버는 Cloudflare로 위임, Pages 프로젝트 candle-calculator에 커스텀 도메인으로 연결.
- 도메인을 바꿀 일이 생기면 `grep -rl candle-calculator.com public | xargs sed -i '' 's|candle-calculator.com|새도메인|g'`

## 배포 (Cloudflare Pages, direct upload)

```bash
export PATH="/opt/homebrew/bin:$PATH"   # wrangler는 Node 22+ 필요
npx wrangler pages project create candle-calculator --production-branch main   # 최초 1회
npx wrangler pages deploy public --project-name candle-calculator --branch main --commit-dirty=true --commit-message "ASCII only message"
```

- 커밋 메시지는 ASCII만 (한글이면 UTF-8 에러).
- `--branch main`이 아니면 preview 배포라 커스텀 도메인에 안 붙는다.
- 배포 후 안 바뀐 것처럼 보이면 롤백 전에 `?_cb=$(date +%s)` 또는 `*.pages.dev` URL로 캐시부터 의심.

## AdSense

- index.html `<head>`에만 adsbygoogle 스크립트(ca-pub-9629441899884488, 테니스와 같은 계정). 수동 광고 유닛은 없다.
- 승인 후 수동 유닛을 넣는다면 실제 slot ID로 만들고, 테니스의 교훈대로 컨테이너는 `height: 0` 기본 숨김.
- EEA·영국·스위스 트래픽에는 Google 인증 CMP가 필요하다. 자체 쿠키 배너 대신 AdSense 콘솔의 "개인정보 보호 및 메시지" GDPR 메시지를 켠다. privacy.html이 그 동의 절차를 전제로 쓰여 있다.
- GA4는 미연동. 넣으려면 테니스 ID를 재사용하지 말고 새 속성을 만들 것.
