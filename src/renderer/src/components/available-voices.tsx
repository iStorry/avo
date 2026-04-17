import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { formatVoiceName } from "@renderer/lib/formatter";
import * as React from "react";
import { TTSVoice } from "src/types/voice";

interface AvailableVoicesProps {
  isLoadingVoices: boolean;
  voices: TTSVoice[];
  selectedVoice: string;
  onVoiceSelect: (voiceId: string) => void;
}

export function AvailableVoices({
  voices,
  isLoadingVoices,
  selectedVoice,
  onVoiceSelect,
}: AvailableVoicesProps): React.JSX.Element {
  const options = React.useMemo(() => {
    return voices.map(voice => ({
      label: formatVoiceName(voice.name),
      value: voice.id,
    }));
  }, [voices]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">TTS Mode</Label>
      {isLoadingVoices ? (
        <Skeleton className="h-9 w-full rounded-full" />
      ) : (
        <Select
          items={options}
          value={selectedVoice}
          onValueChange={value => {
            if (!value) return;
            onVoiceSelect?.(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
