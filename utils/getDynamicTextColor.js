const getDynamicTextColor = (bgColor) => {
  const getRGB = (c) => {
    return parseInt(c, 16) || c;
  };

  const getsRGB = (c) => {
    return getRGB(c) / 255 <= 0.03928
      ? getRGB(c) / 255 / 12.92
      : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
  };

  const getLuminance = (hexColor) => {
    return (
      0.2126 * getsRGB(hexColor.substr(1, 2)) +
      0.7152 * getsRGB(hexColor.substr(3, 2)) +
      0.0722 * getsRGB(hexColor.substr(-2))
    );
  };

  const getContrast = (f, b) => {
    const L1 = getLuminance(f);
    const L2 = getLuminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  };

  const whiteContrast = getContrast(bgColor, '#ffffff');
  const blackContrast = getContrast(bgColor, '#202020');

  return whiteContrast > blackContrast ? '#ffffff' : '#202020';
};

export default getDynamicTextColor;
