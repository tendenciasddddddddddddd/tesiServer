const express = require("express");
const router = express.Router();
 
const js2xmlparser = require("js2xmlparser");
const moment = require("moment");

router.get("/", function(req, res, next) {
    try {
        //our records to index
        const records = getRecordsFromDataSource();
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = "https://uelibertad.online/";
        rootUrl.lastmod = today;
        rootUrl.changefreq = "daily";
        rootUrl.priority = "1.0";
        rootUrl["image:image"] = {
            "image:loc": "https://res.cloudinary.com/eulib/image/upload/v1668606284/libertad_vjihqu.jpg",
            "image:caption":
                "UEMAH Unidad Educativa Libertad",
        };
        collection.push(rootUrl);
 
        //add recipes urls
        for (let i = 0; i < records.length; i++) {
            const url = {};
            url.loc = records[i].url;
            url.lastmod = records[i].updated_at;
            url["image:image"] = {
                "image:loc": records[i].featured_image_url,
                "image:caption": records[i].description,
            };
 
            collection.push(url);
        }
        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
        res.set("Content-Type", "text/xml");
        res.status(200);
        res.send(xml);
    } catch (e) {
        next(e);
    }
});

function getRecordsFromDataSource() {
    //these records will have our own structure, we return as they are and later we convert them to the xml standard format
    //so let's just define two records hard-coded
 
    const record1 = {
        url: "https://uelibertad.online/",
        description:
            "Unidad Educativa Libertad",
        featured_image_url: "https://res.cloudinary.com/eulib/image/upload/v1668606284/libertad_vjihqu.jpg",
        updated_at: "2022-11-16",
    };
    const record2 = {
        url: "https://uelibertad.online/",
        description: "Colegio Libertad",
        featured_image_url: "https://res.cloudinary.com/eulib/image/upload/v1668606284/libertad_vjihqu.jpg",
        updated_at: "2022-11-16",
    };
    return [record1, record2];
}
 
module.exports = router;