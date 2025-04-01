// ==MiruExtension==
// @name         1337x
// @version      v0.0.1
// @author       Damply
// @lang         en
// @license      MIT
// @package      1337x
// @type         bangumi
// @icon         https://1337x.to/favicon.ico
// @webSite      https://1337x.to
// @nsfw         false
// ==/MiruExtension==

export default class extends Extension {
  async search(kw) {
    console.log('✅ MiruExtension: search() called with keyword:', kw);
    const res = await this.request(`/search/${encodeURIComponent(kw)}/1/`);
    const items = await this.querySelectorAll(res, ".table-list tbody tr");
    const results = [];

    for (const item of items) {
      const html = await item.content;
      const title = await this.querySelector(html, "a:nth-child(2)").text;
      const url = await this.getAttributeText(html, "a:nth-child(2)", "href");
      const seeders = parseInt(await this.querySelector(html, "td.coll-2").text);
      const leechers = parseInt(await this.querySelector(html, "td.coll-3").text);

      results.push({
        title,
        url,
        seeders,
        leechers,
      });
    }
    console.log('✅ MiruExtension: Search results:', results);
    return results;
  }

  async detail(url) {
    console.log('✅ MiruExtension: detail() called with URL:', url);
    const res = await this.request("", {
      headers: { "Miru-Url": url }
    });

    const title = await this.querySelector(res, "title").text;
    const magnetLink = await this.querySelector(res, 'a[href^="magnet:?xt="]').getAttributeText("href");

    return {
      title,
      episodes: [
        {
          title: "Torrent",
          urls: [{ name: "Magnet Link", url: magnetLink }]
        }
      ]
    };
  }
}
