const fs = require("fs");

exports.TemplateMapper = class {
  mapHTML({ template = "", args = {} }) {
    try {
      const fileDir = "./src/mails/templates";
      const content = fs.readFileSync(`${fileDir}/${template}.html`, "utf8");
      const matches = [...content.matchAll("{{.*?}}")].map((cols) => cols[0]);
      return Object.entries(this.mapArgs(matches, args)).reduce(
        (html, [key, value]) => html.replace(key, value),
        content
      );
    } catch (error) {
      console.log("ERROR =>", error);
    }
  }

  mapArgs(matches = [], args = {}) {
    return matches.reduce((response, match) => {
      const noBrackets = match.substring(2, match.length - 2);
      const keys = noBrackets.trim().split(".");
      response[match] = this.getValue(keys, args);
      return response;
    }, {});
  }

  getValue(keys = [], args = {}) {
    return keys.reduce((dict, key) => dict[key] || "", args);
  }
};
