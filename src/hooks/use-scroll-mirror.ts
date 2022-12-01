import { useLayoutEffect, useRef } from 'preact/hooks';
import './use-scroll-mirror.css';

interface UseScrollMirrorProps {
  contentRef: any;
}

export const useScrollMirror = ({ contentRef }: UseScrollMirrorProps) => {
  const mirrorRef = useRef();

  useLayoutEffect(() => {
    const contentEl = contentRef.current as any;
    const mirrorEl = mirrorRef.current as any;
    if (!contentEl || !mirrorEl) {
      return;
    }

    mirrorEl.classList.toggle('mirror-scroll', true);
    mirrorEl.style.width = contentEl.style.width;
    mirrorEl.innerHTML = `
      <div style="width: ${contentEl.scrollWidth}px"></div>
    `;

    let skipMirroring = false;
    let skipSetting = false;

    const mirrorScrollPosition = () => {
      if (skipMirroring) {
        skipMirroring = false;
        return false;
      }
      skipSetting = true;
      mirrorEl.scrollLeft = contentEl.scrollLeft;
    };
    const setScrollPosition = () => {
      if (skipSetting) {
        skipSetting = false;
        return false;
      }
      skipMirroring = true;
      contentEl.scrollLeft = mirrorEl.scrollLeft;
    };

    contentEl.addEventListener('scroll', mirrorScrollPosition);
    mirrorEl.addEventListener('scroll', setScrollPosition);

    return () => {
      contentEl.removeEventListener('scroll', mirrorScrollPosition);
      mirrorEl.removeEventListener('scroll', setScrollPosition);
    };
  }, [contentRef]);

  return {
    mirrorRef,
  };
};
