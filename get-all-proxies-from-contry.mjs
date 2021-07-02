import proxyLists from 'proxy-lists';

let proxies = []

export const findProxies = () => new Promise((resolve, reject) => {
  let tempProxies = []
  proxyLists.getProxies({
    protocols: [ 'http' ],
    sourcesBlackList: [ // not working proxy sites
      'blackhatworld',
      'coolproxy',
      'free-proxy-cz',
      'freeproxylist',
      'freeproxylists-net',
      'freeproxylists',
      'new-net-time',
      'openproxy-space',
      'premproxy',
      'proxy50-50-blogspot-com',
      'proxies24',
      'proxy-daily',
      'proxy-list-org',
      'proxynova',
      'spys-one',
      'hidemyname',
      'proxydb',
      'proxyhttp-net',
      'sockslist',
    ],
  })
    .on('data', (newProxies) => {
      console.log(`got proxies from ${newProxies[0].source}`)
      tempProxies = [...tempProxies, ...newProxies]
    })
    .on('error', reject)
    .once('end', () => {
      proxies = tempProxies
      console.log(`got ${proxies.length} proxies from around de world`)
      resolve(proxies)
    })
})

export const getAllProxiesFromCountry = async (wantedCountry) =>
  proxies.filter(({ country }) => country === wantedCountry.toLowerCase())