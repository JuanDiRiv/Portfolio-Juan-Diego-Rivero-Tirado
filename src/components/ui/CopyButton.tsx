"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { useLocale } from "@/features/preferences/LocaleProvider";

export function CopyButton({
  value,
  trackId,
}: {
  value: string;
  trackId?: string;
}) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const label = useMemo(() => (copied ? t.common.copied : t.common.copy), [
    copied,
    t.common.copied,
    t.common.copy,
  ]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onCopy}
      aria-label={label}
      data-track={trackId}
    >
      <Icon name="copy" className="h-4 w-4" />
      {label}
    </Button>
  );
}
