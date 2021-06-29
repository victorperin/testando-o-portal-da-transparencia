import got from 'got'
import { bootstrap } from 'global-agent'
import getAllProxiesFromCountry from './get-all-proxies-from-contry.mjs'
import { someLimit, mapSeries } from 'async';

const PAGE_TO_BE_TESTED = 'http://portaldatransparencia.gov.br/'
const REQUESTS_TIMEOUT = 5000
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
    .then( (proxies) => someLimit(proxies, MAX_CONCURRENT_REQUESTS, async ({ipAddress, port}) => {
      global.GLOBAL_AGENT.HTTP_PROXY = `http://${ipAddress}:${port}`
      console.debug(`trying country ${country}: ${global.GLOBAL_AGENT.HTTP_PROXY}`)

      return got(PAGE_TO_BE_TESTED, { timeout: REQUESTS_TIMEOUT })
        .then(() => true)
        .catch(() => false)
    }) )
    .then((isAccessible) => {
      global.GLOBAL_AGENT.HTTP_PROXY = ''
      const result = {country, isAccessible}

      console.debug(result)
      return result
    })
)
    .then(console.log)
