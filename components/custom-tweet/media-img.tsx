type MediaImgProps = {
  src: string;
  alt: string;
  className?: string;
  draggable?: boolean;
};

// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- The alt text is part of `...props`
export const MediaImg = (props: MediaImgProps) => <img {...props} />;
