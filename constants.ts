
import { LevelConfig } from './types';

export const COLORS = {
  RED: '#FF5A5F',
  BLUE: '#3498DB',
  GREEN: '#2ECC71',
  YELLOW: '#F1C40F',
  PURPLE: '#9B59B6',
  ORANGE: '#E67E22',
  PINK: '#FD79A8',
  TEAL: '#1ABC9C',
  LIME: '#A2D149',
  NAVY: '#2C3E50',
};

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    tubeCount: 3,
    emptyTubeCount: 1,
    colors: [COLORS.RED, COLORS.BLUE],
    capacity: 3,
    description: "첫걸음! 빨간색과 파란색을 나눠봐요. (2색)"
  },
  {
    id: 2,
    tubeCount: 4,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE],
    capacity: 4,
    description: "조금 더 깊어졌어요! (2색)"
  },
  {
    id: 3,
    tubeCount: 5,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN],
    capacity: 4,
    description: "초록색이 추가되었어요! (3색)"
  },
  {
    id: 4,
    tubeCount: 6,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW],
    capacity: 4,
    description: "노란색까지! 튜브가 많아졌네요. (4색)"
  },
  {
    id: 5,
    tubeCount: 7,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE],
    capacity: 4,
    description: "보라색은 우아해요. 집중해볼까요? (5색)"
  },
  {
    id: 6,
    tubeCount: 8,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE, COLORS.ORANGE],
    capacity: 4,
    description: "주황색 추가! 이제 꽤 복잡해요. (6색)"
  },
  {
    id: 7,
    tubeCount: 9,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK],
    capacity: 4,
    description: "핑크색 하트! 거의 전문가 수준이에요! (7색)"
  },
  {
    id: 8,
    tubeCount: 10,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK, COLORS.TEAL],
    capacity: 4,
    description: "청록색까지 8가지 색깔! 정말 대단해요! (8색)"
  },
  {
    id: 9,
    tubeCount: 10,
    emptyTubeCount: 2,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK, COLORS.TEAL],
    capacity: 5,
    description: "난이도 급상승! 튜브가 더 길어졌어요! (8색, 5칸)"
  },
  {
    id: 10,
    tubeCount: 9,
    emptyTubeCount: 1,
    colors: [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.PURPLE, COLORS.ORANGE, COLORS.PINK, COLORS.TEAL],
    capacity: 5,
    description: "마지막 도전! 빈 튜브가 딱 하나뿐이에요! (8색, 5칸, 빈틈없음)"
  }
];
