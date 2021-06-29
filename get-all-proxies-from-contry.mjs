import ProxyLists from 'proxy-lists';


export default (country) => new Promise((resolve, reject) => {
  let proxies = [];
  ProxyLists.getProxies({
    countries: [country],
    protocols: [ 'http' ],
    sourcesWhiteList: ['proxyscrape-com']
  })
    .on('data', (newProxies) => { proxies = [...proxies, ...newProxies] })
    .on('error', reject)
    .once('end', () => resolve(proxies) )
})