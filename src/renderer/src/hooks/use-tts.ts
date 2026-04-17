import { TTSMode, TTSVoice } from "src/types/voice";
import * as React from "react";

export function useTTS() {
  const [mode, setMode] = React.useState<TTSMode>("online");
  const [voices, setVoices] = React.useState<TTSVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string>("");
  const [isLoadingVoices, setIsLoadingVoices] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    window.ttsAPI
      .getVoices(mode)
      .then(v => {
        setVoices(v);
        if (v.length > 0) setSelectedVoice(v[0].id);
      })
      .catch(e => setError(e.message))
      .finally(() => setIsLoadingVoices(false));
  }, [mode]);

  const speak = React.useCallback(
    async (text: string) => {
      if (!text.trim() || !selectedVoice || isSpeaking) return;
      if (audio) {
        audio.pause();
        audio.src = "";
      }

      setIsSpeaking(true);
      setError(null);

      try {
        const buffer = await window.ttsAPI.speak(text, selectedVoice, mode);
        const blob = new Blob([buffer], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);

        const newAudio = new Audio(url);
        setAudio(newAudio);
        newAudio.play();
        newAudio.onended = () => {
          URL.revokeObjectURL(url); // clean up
          setIsSpeaking(false);
        };
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(String(e));
        }
        setIsSpeaking(false);
      }
    },
    [selectedVoice, mode, isSpeaking, audio],
  );

  const stop = React.useCallback(() => {
    if (audio) {
      audio.pause();
      audio.src = "";
      setAudio(null);
    }
    setIsSpeaking(false);
  }, [audio]);

  return {
    mode,
    setMode,
    voices,
    selectedVoice,
    setSelectedVoice,
    isSpeaking,
    isLoadingVoices,
    error,
    speak,
    stop,
  };
}
