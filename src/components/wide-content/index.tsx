import './styles.css';

interface WideContentProps {
  contentRef: any;
  children: any;
}

export const WideContent = ({ contentRef, children }: WideContentProps) => {
  return (
    <div ref={contentRef} className="test-container">
      {children}
    </div>
  );
};
