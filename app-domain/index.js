const axios = require('axios')
const fs = require('fs')
const NUMBER = process.env.NUM
const Promise = require('bluebird')

const STR = fs.readFileSync(`./words/${NUMBER}.json`, 'utf8')
const DATA = JSON.parse(STR)

const URL = "https://domain-registry.appspot.com/check"

const getDomain = async () => {
  let result = []
  delTxt(`./result/result${NUMBER}.txt`)
  await Promise.map(DATA, async (domain) => {
    try {
      const {data} = await axios.get(`${URL}?domain=${domain}.app`)
      console.log('result===>>>', data)
      if (data.status === 'success' && data.available) {
        result.push(domain + '.app')
        fs.appendFileSync(`./result/result${NUMBER}.txt`, `${domain}.app\n`) // append数据
      }
    } catch (e) {
      console.log('error==>>>>', e)
    }
  }, {concurrency: 5})
  fs.writeFileSync(`./result/result${NUMBER}.json`, JSON.stringify(result), 'utf8') // 记录结果
}

const delTxt = (filename) => {
  const exists = fs.existsSync(filename)
  exists && fs.unlinkSync(filename) // 删除append文件
}

getDomain()
