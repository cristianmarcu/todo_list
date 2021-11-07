const StorageService = localStorage;

const addRecord = (table, row) => {
  const currentValue = StorageService.getItem(table) ?? '[]';
  const rows = JSON.parse(currentValue);
  const newRow = {id: rows.length + 1, ...row};
  rows.push(newRow);
  StorageService.setItem(table, JSON.stringify(rows));
  return newRow;
};

const updateRecord = (table, key, value, newProps) => {
  const currentValue = StorageService.getItem(table) ?? '[]';
  const rows = JSON.parse(currentValue);
  const newRows = rows?.map((row) => (row[key] !== value ? row : { ...row, ...newProps }));
  StorageService.setItem(table, JSON.stringify(newRows));
};

const removeRecord = (table, key, value) => {
  const currentValue = StorageService.getItem(table) ?? '[]';
  const rows = JSON.parse(currentValue);
  const newRows = rows.filter((row) => row[key] !== value);
  StorageService.setItem(table, JSON.stringify(newRows));
};

const removeMultiple = (table, ids) => {
  const currentValue = StorageService.getItem(table) ?? '[]';
  const rows = JSON.parse(currentValue);
  const newRows = rows.filter((row) => ids.indexOf(row.id) === -1);
  StorageService.setItem(table, JSON.stringify(newRows));
};

const getRecords = (table) => {
  const rawData = StorageService.getItem(table) ?? '[]';
  return JSON.parse(rawData);
};

export default { addRecord, removeRecord, getRecords, updateRecord, removeMultiple };
