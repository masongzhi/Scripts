const rp = require('request-promise');
const download = require('download');
const fs = require('fs');

let result = [];

async function request() {
  for (let i = 1; i < 20; i++) {
    const res = await rp(`https://xcxfive.hjgjstar.com/ktc/items/getlv?lv=${i}`);
    console.log(res);
    const data = JSON.parse(res).data;
    result = result.concat(data);
  }
  result = result.map(it => {
    if (it && it.confound) it.confound = it.confound.join('、');
    return it;
  });
  console.log('result==>>', result);
  console.log('result==>>', result.length);
  // 去除null
  result = result.filter(it => it);
  await fs.writeFileSync('result.json', JSON.stringify(result));
  // 下载图片
  await downloadImg(result);
}

// 用于下载图片
async function downloadImg(result) {
  const len = result.length;
  let count = 0;
  for (const {pic: url, answer: name} of result) {
    const data = await download(url);
    console.log(count, len);
    await fs.writeFileSync(`images/${name}.jpg`, data);
    count++;
  }
}

request();

