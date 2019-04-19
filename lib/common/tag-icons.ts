export interface TagIconData {
  tags: string[];
  color?: string;
  prefix?: string;
}

export interface TagIconMap {
  [key: string]: TagIconData;
}

export interface ProcessedTagIconData {
  icon: string;
  color?: string;
  prefix?: string;
}

export interface ProcessedTagIconMap {
  [key: string]: ProcessedTagIconData;
}

const tagIconMap: TagIconMap = {
  "mobile-alt": {
    tags: ["react-native", "flutter", "ionic", "mobile", "cordova"],
    color: "#A1ABB1",
    prefix: "fas"
  },
  java: { tags: ["java"], color: "#517C90" },
  docker: { tags: ["docker"], color: "#0AA0D2" },
  android: { tags: ["android"], color: "#A4C639" },
  gem: { tags: ["ruby", "ruby-on-rails"], color: "#CC0000", prefix: "fas" },
  apple: {
    tags: ["ios", "apple", "swift", "objective-c", "macos"],
    color: "#A1ABB1"
  },
  aws: { tags: ["amazon-web-services", "amazon-redshift"], color: "#FF9900" },
  js: { tags: ["javascript", "js"], color: "#F7DF1E" },
  ember: { tags: ["ember", "ember.js", "emberjs"], color: "#DB492F" },
  react: { tags: ["reactjs", "react"], color: "#58D9FB" },
  angular: { tags: ["angularjs", "angular", "angular.js"], color: "#DD0031" },
  vuejs: { tags: ["vue", "vuejs", "vue.js"], color: "#41B281" },
  python: { tags: ["python"], color: "#366C9C" },
  microsoft: {
    tags: ["microsoft", "azure", ".net", "asp.net", "windows"],
    color: "#00A6E4"
  },
  linux: { tags: ["linux", "unix", "bash"] },
  php: { tags: ["php", "laravel"], color: "#7377AD" },
  "node-js": {
    tags: ["node", "nodejs", "node.js", "express", "hapi", "koa", "webpack"],
    color: "#22AE5A"
  },
  css3: { tags: ["css", "css3", "css-3"], color: "#0C6FB2" },
  html5: { tags: ["html", "html5"], color: "#DD4B25" },
  ubuntu: { tags: ["ubuntu"], color: "#DE4815" },
  database: {
    tags: [
      "database",
      "mysql",
      "redis",
      "elasticsearch",
      "sql-server",
      "sqlserver",
      "oracle",
      "postgresql",
      "sql",
      "sqlite",
      "mongodb",
      "couchdb"
    ],
    prefix: "fas",
    color: "#4489C8"
  }
};

const processedTagIconMap: ProcessedTagIconMap = {};

for (let icon in tagIconMap) {
  for (let tag of tagIconMap[icon].tags) {
    processedTagIconMap[tag] = {
      color: tagIconMap[icon].color,
      icon: icon,
      prefix: tagIconMap[icon].prefix
    };
  }
}

export function getIconForTag(tag: string): ProcessedTagIconData {
  return processedTagIconMap[tag];
}
