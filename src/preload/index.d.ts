import { ElectronAPI } from "@electron-toolkit/preload";
import { TTSVoice, TTSMode } from "../types/voice";

declare global {
  interface Window {
    electron: ElectronAPI;
    ttsAPI: {
      speak: (text: string, voiceId: string, mode: TTSMode) => Promise<string>;
      getVoices: (mode: TTSMode) => Promise<TTSVoice[]>;
    };
  }
}
