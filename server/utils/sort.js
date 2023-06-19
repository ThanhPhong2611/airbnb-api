
// ham sap xep dong
function compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
      let comparison = a[key].localeCompare(b[key]);
        console.log(comparison)
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
};
module.exports = compareValues;
