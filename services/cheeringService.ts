
const CHEERING_MESSAGES = [
  "와! 대단해요! 정말 멋지게 정렬했네요! ✨",
  "최고예요! 색깔들이 제 자리를 찾아서 기뻐하고 있어요! 🌈",
  "천재 아니에요? 다음 단계는 더 잘할 것 같아요! 🧠",
  "우와, 정말 빨라요! 정렬 마스터가 나타났다! 🏆",
  "알록달록 예쁜 색깔들이 모두 모였어요! 참 잘했어요! ❤️",
  "집중력이 대단하시네요! 정말 자랑스러워요! 🌟",
  "어려운 단계였는데 한 번에 성공하다니! 멋져요! 👍"
];

const COLOR_FACTS = [
  "빨간색은 사과와 딸기의 색깔이에요! 🍎",
  "파란색은 시원한 바다와 넓은 하늘을 닮았어요! 🌊",
  "노란색은 맛있는 바나나와 밝은 해님 색깔이에요! ☀️",
  "초록색은 쑥쑥 자라는 나무와 풀잎의 색깔이에요! 🌿",
  "보라색은 달콤한 포도와 예쁜 제비꽃 색깔이에요! 🍇",
  "주황색은 새콤달콤 귤과 당근의 색깔이에요! 🥕",
  "분홍색은 예쁜 꽃잎과 복숭아를 닮았답니다! 🍑"
];

export function getLocalCheeringMessage(): string {
  const msg = CHEERING_MESSAGES[Math.floor(Math.random() * CHEERING_MESSAGES.length)];
  const fact = COLOR_FACTS[Math.floor(Math.random() * COLOR_FACTS.length)];
  return `${msg}\n\n${fact}`;
}
