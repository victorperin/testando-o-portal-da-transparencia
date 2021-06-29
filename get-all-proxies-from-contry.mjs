import ProxyLists from 'proxy-lists';


export default (country) => new Promise((resolve, reject) => {
  let proxies = [];
  ProxyLists.getProxies({
    countries: [country],
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
      proxies = [...proxies, ...newProxies]
    })
    .on('error', reject)
    .once('end', () => resolve(proxies) )
})