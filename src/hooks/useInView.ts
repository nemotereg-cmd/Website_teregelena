"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Сообщает, попал ли элемент в область просмотра. Наблюдение снимается
 * после первого срабатывания: анимация появления нужна один раз, и держать
 * ради неё живой IntersectionObserver на каждый блок незачем.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Подстраховка для окружений без IntersectionObserver: показываем сразу.
    // Класс ставим напрямую, а не через setState — синхронный setState в теле
    // эффекта запускает каскад рендеров, и правило react-hooks его запрещает.
    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
