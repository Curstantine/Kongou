const Kongou = require("../src/index");
Kongou.get("nhentai.net/g/356450")
  .then((data) => {
    console.warn("get()" + "\n");
    const arg = {
      id: data.id,
      meid: data.media_id,
      name: data.title,
      site: data.siteURL,
      scan: data.scanlator,
      date: data.upload_date,
      favs: data.num_favorites,
      page: data.num_pages,
      arti: data.artist,
      cate: data.category,
      grou: data.groups,
      lang: data.languages,
      paro: data.parodies,
      tags: data.tags,
      imag: data.images,
      char: data.characters,
    };
    console.log(arg);
    Kongou.query({
      keyword: "Feticolle",
      page: "1",
      sort: "popular-week",
    }).then((data) => {
      console.warn("\n" + "query()" + "\n");
      console.log(data[0]);
    });
  })
  .catch((error) => {
    console.log(error);
  });
