"use client";

import { useEffect } from "react";

/**
 * Блокирует прокрутку страницы, пока открыт оверлей.
 *
 * Ширина полосы прокрутки компенсируется паддингом: без этого при открытии
 * меню на десктопе контент дёргается вправо на ширину исчезнувшего скроллбара.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
