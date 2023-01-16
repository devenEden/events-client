const scan = {
  ADD_SCAN_REQUEST: "ADD_SCAN_REQUEST",
  ADD_SCAN_SUCCESS: "ADD_SCAN_SUCCESS",
  ADD_SCAN_ERROR: "ADD_SCAN_ERROR",

  ON_SCAN_REQUEST: "ON_SCAN_REQUEST",
  ON_SCAN_SUCCESS: "ON_SCAN_SUCCESS",
  ON_SCAN_ERROR: "ON_SCAN_ERROR",

  addScan: (data) => ({
    type: scan.ADD_SCAN_REQUEST,
    data,
  }),
  onScan: (data) => ({
    type: scan.ON_SCAN_REQUEST,
    data,
  }),
};

export default scan;
