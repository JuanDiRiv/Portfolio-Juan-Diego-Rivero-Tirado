"use client";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/lib/icon";
import { useLocale } from "@/features/preferences/LocaleProvider";
import { useTheme } from "@/features/preferences/ThemeProvider";
import { profile } from "@/data/profile";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export function Footer() {
  const { locale, t } = useLocale();
  const { theme } = useTheme();
  const p = profile[locale];

  return (
    <footer className="border-t border-border/70">
      <FloatingWhatsApp
        className="jdrt-whatsapp"
        buttonClassName="jdrt-whatsapp-button"
        avatar={p.headshot.src}
        phoneNumber="+573124344686"
        accountName={p.name}
        statusMessage={p.socials.whatsapp.statusMessage}
        chatMessage={p.socials.whatsapp.chatMessage}
        placeholder={p.socials.whatsapp.placeholder}
        darkMode={theme === "dark"}
        messageDelay={1}
        notification={true}
        notificationSound={true}
        chatboxHeight={420}
        buttonStyle={{
          backgroundColor: "var(--accent)",
          color: "var(--accent-foreground)",
        }}
        chatboxStyle={{
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: 16,
        }}
        notificationStyle={{
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}
      />
      <Container className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {p.name} · {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={p.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.common.github}
            >
              <Icon name="github" className="h-5 w-5" />
              <span className="sr-only">{t.common.github}</span>
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={p.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.common.linkedin}
            >
              <Icon name="linkedin" className="h-5 w-5" />
              <span className="sr-only">{t.common.linkedin}</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
