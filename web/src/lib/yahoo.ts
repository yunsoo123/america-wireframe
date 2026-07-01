import YahooFinance from "yahoo-finance2";

// 단일 인스턴스 (v3는 new 필요). 설문 안내 메시지 억제.
const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });

export default yf;
