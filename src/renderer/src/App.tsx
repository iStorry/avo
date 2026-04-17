import { AvailableVoices } from "./components/available-voices"
import { Header } from "./components/header"

import { Textarea } from "./components/ui/textarea"
import * as React from "react"
import { useTTS } from "./hooks/use-tts"
import { Button } from "./components/ui/button"

function App(): React.JSX.Element {
  const {
    voices,
    isLoadingVoices,
    selectedVoice,
    setSelectedVoice,
    speak,
    stop,
    isSpeaking,
    error,
  } = useTTS()

  const [text, setText] = React.useState("")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-4 grid gap-4">
        <AvailableVoices
          voices={voices}
          isLoadingVoices={isLoadingVoices}
          selectedVoice={selectedVoice}
          onVoiceSelect={setSelectedVoice}
        />
        <Textarea
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="min-h-45 "
        />
        <div className="controls space-x-2">
          <Button
            onClick={() => speak(text)}
            disabled={isSpeaking || !text.trim() || !selectedVoice}
          >
            {isSpeaking ? "Speaking..." : "Speak"}
          </Button>

          {isSpeaking && <Button onClick={stop}>Stop</Button>}
        </div>

        {error && <p className="error">{error}</p>}
      </main>
    </div>
  )
}

export default App
