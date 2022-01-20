import defaultSettings from '@/defaultSettings';
import { reactive } from 'vue';

export default function useSettings() {
  return reactive(defaultSettings);
}
