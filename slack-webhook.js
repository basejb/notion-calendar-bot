const { IncomingWebhook } = require('@slack/webhook')

require('dotenv').config()

const SLACK_URL = process.env.SLACK_URL;
const webhook = new IncomingWebhook(SLACK_URL);

const TAG = {
  '연차': '🏝️ 연차',
  '반차': '🏖️ 반차',
  '반반차': '⛱️ 반반차',
  '예비군': '🪖 예비군',
  '병가': '😷 병가',
  '출장': '🚌 출장',
  '휴무': '🔴휴무',
  // ...
  // 캘린더 태그 타입에 맞는 키-라벨 매핑
}

const calculateDaysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDifference = endDate - startDate; // 밀리초 단위 차이
  const daysDifference = timeDifference / (1000 * 3600 * 24) + 1; // 일 단위로 변환
  return daysDifference;
}

async function sendSlackMessage(data) {
  let userCount = data.length;

  const formattedList = data.map(item => {
    if(!TAG[item.type]) {
      userCount = userCount - 1;
      return;
    };
    
    let date = item.startDate;
    const days = calculateDaysBetween(item.startDate, item.endDate);

    if(item.endDate) {
      date = `${date} ~ ${item.endDate}(${days}일)`;
    }
    return `- *${TAG[item.type]}* ${item.name} - ${date}`
  }).join("\n");
  
  if(userCount === 0) return;
  await webhook.send(`*🗓️ 일정 알림 봇*\n\n${formattedList}`)
}

module.exports = { sendSlackMessage };