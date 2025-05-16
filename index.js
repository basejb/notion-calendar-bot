// index.js
const moment_timezone = require('moment-timezone')
const { Client } = require("@notionhq/client")
const { sendSlackMessage } = require('./slack-webhook')

require('dotenv').config()

const NOTION_SECRET_KEY = process.env.NOTION_SECRET_KEY
const NOTION_DATABASE_ID = process.env.NOTION_EXAMPLE_DATABASE_ID

const notion = new Client({
  auth: NOTION_SECRET_KEY
})

// 당일 일정 쿼리
const getTodaySchedule = async () => {
  const date = new Date();
  const today = moment_timezone.tz(date, 'Asia/Seoul').format('YYYYMMDD');

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: "날짜",
      date: {
        equals: today,
      },
    },
  })

  const todaySchedule = await Promise.all(response.results.map(async (result) => {
    const tag = result.properties['태그'];
    const date = result.properties['날짜'];

    const type = tag.select.name;
    const startDate = date.date.start;
    const endDate = date.date.end;
    
    const users = result.properties['참석자'].people.map((user) => user.name);
    return {name: users.join(', '), type, startDate, endDate }
  }))


  return todaySchedule;
}

exports.handler = async (event) => {
  const data = await getTodaySchedule();
  if(data.length === 0) return;

  await sendSlackMessage(data);
};

// 로컬에서 실행할 때 handler 함수 직접 호출
if (require.main === module) {
  (async () => {
    try {
      await exports.handler({});
      console.log('함수 실행 완료');
    } catch (error) {
      console.error('함수 실행 중 오류 발생:', error);
    }
  })();
}