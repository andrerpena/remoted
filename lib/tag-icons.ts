export interface TagIconData {
  tags: string[];
  color?: string;
}

export interface TagIconMap {
  [key: string]: TagIconData;
}

export interface ProcessedTagIconData {
  icon: string;
  color?: string;
}

export interface ProcessedTagIconMap {
  [key: string]: ProcessedTagIconData;
}

const tagIconMap: TagIconMap = {
  java: { tags: ["java"] },
  docker: { tags: ["docker"] },
  android: { tags: ["android"] },
  apple: { tags: ["ios", "apple", "swift", "objective-c", "macos"] },
  aws: { tags: ["amazon-web-services", "amazon-redshift"] },
  js: { tags: ["javascript", "js"] },
  ember: { tags: ["ember", "ember.js", "emberjs"] },
  react: { tags: ["reactjs", "react"] },
  angular: { tags: ["angularjs", "angular", "angular.js"] },
  vuejs: { tags: ["vue", "vuejs", "vue.js"] },
  python: { tags: ["python", "vuejs", "vue.js"] },
  microsoft: { tags: ["microsoft", "azure", ".net", "asp.net", "windows"] },
  linux: { tags: ["linux", "unix", "bash"] },
  php: { tags: ["php"] },
  "node-js": { tags: ["node", "nodejs", "node.js", "express", "hapi", "koa"] },
  css3: { tags: ["css", "css3", "css-3"] },
  html5: { tags: ["html", "html5"] }
};

const processedTagIconMap: ProcessedTagIconMap = {};

for (let icon in tagIconMap) {
  for (let tag of tagIconMap[icon].tags) {
    processedTagIconMap[tag] = {
      color: tagIconMap[icon].color,
      icon: icon
    };
  }
}

export function getIconForTag(tag: string) {
  return processedTagIconMap[tag];
}
