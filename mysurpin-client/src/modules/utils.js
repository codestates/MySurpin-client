const request = require("request");
const rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.getUrlTitle = (url, cb) => {
  console.log("타이틀 가져오기");
  request(
    {
      uri: url,
      method: "GET",
      headers: { origin: "https://localhost:3000", credentials: true },
    },
    function (err, res, html) {
      if (err) {
        console.log("get");
        console.log("Error: ", err);
        return cb(err);
      } else {
        const tag = /<title>(.*)<\/title>/;
        const match = html.match(tag);
        const title = match ? match[1] : url;
        return cb(err, title);
      }
    }
  );
};

exports.isValidUrl = (url) => {
  console.log("valid", url);
  return true;
  // return url.match(rValidUrl);
};
