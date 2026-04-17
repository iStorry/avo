import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts"
import { join } from "path"
import { tmpdir } from "os"
import { Voice } from "../types/voice"

let cachedVoices: Voice[] | null = null

export async function getOnlineVoices(): Promise<Voice[]> {
  if (cachedVoices) return cachedVoices

  const tts = new MsEdgeTTS()
  const voices = await tts.getVoices()

  cachedVoices = voices.map(v => ({
    id: v.ShortName,
    name: v.FriendlyName,
    locale: v.Locale,
    gender: v.Gender,
    mode: "online" as const,
  }))

  return cachedVoices
}

export async function onlineTTS(text: string, voiceId: string): Promise<string> {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(voiceId, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  const outputPath = join(tmpdir(), `tts-online-${Date.now()}.mp3`)
  await tts.toFile(outputPath, text)

  return outputPath
}
