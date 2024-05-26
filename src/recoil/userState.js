import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: 'userState', // 각 atom은 고유한 key를 가져야 합니다.
  default: { nickname: '' }, // 초기값을 객체로 설정합니다.
  effects_UNSTABLE: [persistAtom], // persistAtom 효과를 추가합니다.
});
