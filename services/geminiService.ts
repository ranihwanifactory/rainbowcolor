
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCheeringMessage(level: number): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${level}단계를 완료한 한국 초등학생을 위해 아주 짧고 귀여운 축하 메시지 한 문장과 색깔에 대한 재미있는 상식 하나를 한국어로 알려줘. (예: "와! 대단해요! 빨간색은 사과랑 똑같은 색이에요!")`,
      config: {
        systemInstruction: "당신은 아이들을 사랑하는 친절한 유치원/초등학교 선생님입니다. 항상 밝고 긍정적인 에너지를 전달하세요.",
      }
    });
    return response.text || "정말 잘했어요! 최고예요!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "축하해요! 다음 단계도 도전해볼까요?";
  }
}
