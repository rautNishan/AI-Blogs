export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button(buttonProps: ButtonProps) {
  return (
    <>
      <button className={buttonProps.className} onClick={buttonProps.onClick}>
        {buttonProps.children}
      </button>
    </>
  );
}
