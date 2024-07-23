type AvatarImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element -- The alt text is part of `...props`
export const AvatarImg = (props: AvatarImgProps) => <img {...props} />;
