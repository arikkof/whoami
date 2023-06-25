let historyData = {};
function storeData(name, data) {
  if (!historyData[name]) {
    historyData[name] = [];
  }

  // Check if data with the same name already exists
  const existingDataIndex = historyData[name].findIndex(item => item.id === data.id);
  
  if (existingDataIndex !== -1) {
    // Update existing data
    historyData[name][existingDataIndex] = data;
  } else {
    // Add new data
    historyData[name].push(data);
  }
}

function getData(name) {
  return historyData[name] || [];
}

function getAllData() {
    return historyData;
  }
  
  function deleteData(name) {
    if (historyData.hasOwnProperty(name)) {
      delete historyData[name];
      return true;
    }
    return false;
  }
  
  module.exports = { storeData, getData, getAllData, deleteData };  