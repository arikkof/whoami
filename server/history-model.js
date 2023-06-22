let historyData = {};

function storeData(name, data) {
  if (!historyData[name]) {
    historyData[name] = [];
  }

  historyData[name].push(data);
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