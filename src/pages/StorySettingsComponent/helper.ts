export const prepareMarks = (min: number, max: number, step: number) => {
  const result = [];

  for (let i = min; i <= max; i += step) {
    result.push({
      value: i,
      label: i,
    });
  }

  return result;
};
