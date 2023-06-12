exports.sendSms = (phone, message) => {
  var unirest = require("unirest");
  console.log(phone, message, "called");
  var req = unirest(
    "GET",
    "https://www.fast2sms.com/dev/bulkV2"
  );

  req.query({
    authorization:
      "2js3Z8d54AnLGFfBmhuQio61ekqtCxwWcSIYRpzKV90Pr7NvEODycrpb5iwS3hF16YJqzTdvftVxunIg",
    sender_id: "TXTIND",
    message: message,
    route: "v3",
    numbers: phone,
  });

  req.headers({
    "cache-control": "no-cache",
  });
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
  });
};
