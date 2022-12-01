import { useRef, useState } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import './app.css';
import { WideContent } from './components/wide-content';
import { useScrollMirror } from './hooks/use-scroll-mirror';

export function App() {
  const [count, setCount] = useState(0);
  const contentRef = useRef();
  const { mirrorRef } = useScrollMirror({ contentRef });

  return (
    <>
      <div className="header">
        <p>Mirrored scroll on Top</p>
        <div ref={mirrorRef as any}></div>
      </div>
      <p>Scroll down to see the content</p>
      <p>⏬</p>
      <div style={{ marginTop: '100rem' }}></div>
      <WideContent contentRef={contentRef as any}>
        {Array(1000)
          .fill(0)
          .map((v, i) => i)}
      </WideContent>
      <p class="read-the-docs">Bottom</p>
    </>
  );
}
