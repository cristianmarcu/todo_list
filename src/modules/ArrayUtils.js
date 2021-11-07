
export const sortArrayOfObjectsByKey = (_arr, sortKet) => {
  if (!Array.isArray(_arr) || !_arr.length) return [];
  const sortNumber = (a, b) => a[sortKet] - b[sortKet];
  const sortString = (a, b) => a[sortKet].localeCompare(b[sortKet]);
  if (typeof _arr[0][sortKet] === 'number') {
    return _arr.sort(sortNumber);
  }
  if (typeof _arr[0][sortKet] === 'string') {
    return _arr.sort(sortString);
  }
  throw new Error('invalid sort key type');
};
