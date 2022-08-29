const axios = require("axios");
const base64 = require("../../../common/imageUrlToBase64");
const error = require("../../../common/error");
const notfound = require("../../../common/notfound");
const badrequest = require("../../../common/badrequest");
const render = require("./_svg");

function getColor(col) {
  if (col == "Green") return "#5eb95e";
  else if (col == "Red") return "#fe4c61";
  else if (col == "Orange") return "#f39c11";
  else if (col == "Blue") return "#3498db";
  else if (col == "Purple") return "#9d3dcf";
  else if (col == "Grey") return "#bfbfbf";
}

module.exports = (req, res) => {
  img_width = Number(req.query.width) | 480;
  img_height = Number(req.query.height) | 144;
  if (req.query.uid == undefined) return res.send(badrequest());
  res.setHeader("content-type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
  axios
    .get(`https://www.luogu.com.cn/user/${req.query.uid}?_contentOnly`)
    .then((data) => {
      fillColor = getColor(data.data.currentData.user.color);
      base64(
        "image/png",
        `https://cdn.luogu.com.cn/upload/usericon/${data.data.currentData.user.uid}.png`
      ).then((avatarBase64) => {
        return res.send(
          render(img_width, img_height, data, avatarBase64, fillColor)
        );
      });
    })
    .catch((err) => {
      res.send(error());
    });
};
