# 🗓️ Notion Calendar to Slack Bot

> Notion API를 이용해 당일 일정을 자동으로 Slack에 알림으로 보내주는 서버리스 봇입니다.  
> AWS Lambda + EventBridge를 활용한 비용 효율적인 일정 관리 시스템을 구축할 수 있습니다.


## 📦 기술 스택

- **Node.js**
- **AWS Lambda**
- **AWS EventBridge (CloudWatch Events)**
- **Notion API**
- **Slack Incoming Webhook**



## 📁 프로젝트 구조

```
notion-calendar-bot/
├── index.js             # Lambda 핸들러, Notion 조회 로직
├── slack-webhook.js     # Slack 메시지 생성 및 전송
├── .env                 # 환경 변수 설정 파일
├── package.json
└── README.md
```



## ⚙️ 설치 및 실행

### 1. 프로젝트 설치

```bash
git clone https://github.com/your-username/notion-calendar-bot.git
cd notion-calendar-bot

# npm
npm install

# 또는 yarn
yarn install
```

### 2. `.env` 파일 생성

```env
# Notion API
NOTION_SECRET_KEY=your_notion_secret
NOTION_EXAMPLE_DATABASE_ID=your_notion_database_id

# Slack Webhook
SLACK_URL=https://hooks.slack.com/services/...

# (선택) AWS 배포용 역할
AWS_SCHEDULE_ROLE=arn:aws:iam::your-account-id:role/your-role-name
```



## 🚀 AWS Lambda 배포

### 1. 최초 배포

```bash
# yarn
yarn deploy:create

# 또는 npm
npm run deploy:create
```

### 2. 코드 업데이트 배포

```bash
# yarn
yarn deploy

# 또는 npm
npm run deploy
```

> `aws-cli`가 설치 및 인증 설정되어 있어야 합니다.



## ⏰ 스케줄 설정 (EventBridge)

1. AWS Console 접속 → Lambda → `schedule-bot` 함수 선택  
2. **트리거 추가** 클릭  
3. `EventBridge (CloudWatch Events)` 선택  
4. 새 규칙 생성 → 예약 표현식 입력  
   예: `cron(10 0 * * ? *)` (매일 KST 오전 09:10 실행)



## 📝 Notion 데이터베이스 구성

- 날짜 (`날짜`): 일정 날짜
- 태그 (`태그`): 출장, 연차, 병가 등
- 참석자 (`참석자`): 노션 사용자 목록

예시:

| 제목 | 날짜       | 태그   | 참석자      |
|------|------------|--------|-------------|
| 회의 | 2025-05-21 | 출장   | 홍길동, 김개발 |



## 🧩 커스터마이징

- `slack-webhook.js` 타입을 자유롭게 수정하세요.
- 시간대(`Asia/Seoul` 등), 메시지 포맷, Notion 속성 이름 등도 커스터마이징 가능.


