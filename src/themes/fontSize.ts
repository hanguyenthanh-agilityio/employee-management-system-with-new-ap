const fontSize: Record<
  string,
  | [string, string]
  | [
      string,
      {
        lineHeight?: string;
        letterSpacing?: string;
        fontWeight?: string | number;
      },
    ]
> = {
  sm: ['14px', '20px'],
  base: ['16px', '24px'],
  lg: ['18px', '28px'],
  xl: ['20px', '28px'],
  '2xl': ['24px', '32px'],
  '3xl': ['30px', '36px'],
  '4xl': ['36px', '40px'],
  '5xl': ['48px', '1'],
  '6xl': ['50px', '1'],
  '7xl': ['56px', '1'],
};

export default fontSize;
