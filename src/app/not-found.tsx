import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-6xl font-extrabold sm:text-7xl">
        <GradientText>404</GradientText>
      </p>
      <h1 className="text-2xl font-bold text-balance sm:text-3xl">Такой страницы нет</h1>
      <p className="max-w-md text-pretty text-ink-muted">
        Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную — все курсы там.
      </p>
      <Button href="/" size="lg">
        На главную
      </Button>
    </Container>
  );
}
