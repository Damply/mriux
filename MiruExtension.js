import AbstractSource from './Example.js'

export default class MiruExtension extends AbstractSource {
  name = 'Miru Extension'
  description = 'A source for regular TV shows and movies via 1337x'
  accuracy = 'High'
  config = {}

  async single(options) {
    console.log('MiruExtension: single() called', options);
    return await this.search1337x(options)
  }

  async batch(options) {
    console.log('MiruExtension: batch() called', options);
    return await this.search1337x(options)
  }

  async movie(options) {
    console.log('MiruExtension: movie() called', options);
    return await this.search1337x(options)
  }

  async search1337x(options) {
    console.log('MiruExtension: search1337x() called with options:', options);
    const { titles } = options
    const query = titles[0]
    const url = `https://1337x.to/search/${encodeURIComponent(query)}/1/`

    console.log('Fetching URL:', url);

    const response = await fetch(url)
    const html = await response.text()
    return this.parse1337xResults(html)
  }

  parse1337xResults(html) {
    console.log('MiruExtension: parse1337xResults() called');
    const torrents = []
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const rows = doc.querySelectorAll('.table-list tbody tr')

    rows.forEach(row => {
      const title = row.querySelector('a:nth-child(2)').innerText
      const link = row.querySelector('a:nth-child(2)').href
      const seeders = parseInt(row.querySelector('td.coll-2').innerText)
      const leechers = parseInt(row.querySelector('td.coll-3').innerText)
      const size = row.querySelector('td.coll-4').innerText
      const date = new Date()
      const hash = link.split('/').pop()

      torrents.push({ title, link, seeders, leechers, downloads: 0, hash, size, verified: true, date })
    })

    console.log('Torrents found:', torrents);
    return torrents
  }
}
