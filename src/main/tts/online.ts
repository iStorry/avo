import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts"
import { join } from "path"
import { tmpdir } from "os"
import { TTSVoice } from "src/types/voice"
import { mkdirSync } from "fs"
import { readFile } from "fs/promises"

let cachedVoices: TTSVoice[] | null = null

export async function getOnlineVoices(): Promise<TTSVoice[]> {
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

export async function onlineTTS(text: string, voiceId: string): Promise<Buffer> {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(voiceId, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3)

  const outputDir = join(tmpdir(), `tts-online-${Date.now()}`)
  mkdirSync(outputDir, { recursive: true })
  await tts.toFile(outputDir, text)

  const audioPath = join(outputDir, "audio.mp3")
  return readFile(audioPath)
}
