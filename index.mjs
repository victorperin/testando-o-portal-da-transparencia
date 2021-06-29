import got from 'got'
import { bootstrap } from 'global-agent'
import { someLimit, mapSeries } from 'async';
import { appendFile } from 'fs/promises'
import getAllProxiesFromCountry from './get-all-proxies-from-contry.mjs'

const PAGE_TO_BE_TESTED = 'http://portaldatransparencia.gov.br/'
const REQUESTS_TIMEOUT = 60000
const MAX_CONCURRENT_REQUESTS = 20
const COUNTRIES_LIST = [
  'br',
  'us',
  'ca',
  'ar',
  'fr',
  'jp',
  'it',
  'uk',
  'pt',
  'kr',
]

bootstrap()
mapSeries(COUNTRIES_LIST, async (country) =>
  getAllProxiesFromCountry(country)
    .then(async (proxies) => {
      const isAccessible = await someLimit(proxies, MAX_CONCURRENT_REQUESTS, async ({ipAddress, port}) => {
        global.GLOBAL_AGENT.HTTP_PROXY = `http://${ipAddress}:${port}`
        console.debug(`trying country ${country}: ${global.GLOBAL_AGENT.HTTP_PROXY}`)

        return got(PAGE_TO_BE_TESTED, { timeout: REQUESTS_TIMEOUT })
          .then(() => true)
          .catch(() => false)
      })

      const numberOfProxies = proxies.length

      return { isAccessible, numberOfProxies}
    })
    .then(async ({isAccessible, numberOfProxies}) => {
      global.GLOBAL_AGENT.HTTP_PROXY = ''
      const result = {country, isAccessible, numberOfProxies}

      console.debug(result)
      await appendFile('output.txt', result, 'utf-8')
      return result
    })
)
    .then(console.log)
