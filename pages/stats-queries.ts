import { gql } from "apollo-boost";

export const statsQuery = gql`
  query getJobs($offset: Int, $limit: Int) {
    getJobs(offset: $offset, limit: $limit) {
      id
      title
      url
      descriptionHtml
      tags
      publishedAt
      company {
        displayName
        imageUrl
      }
      locationRaw
      locationRequired
      locationPreferred
      locationPreferredTimeZone
      locationPreferredTimeZoneTolerance
      salaryMin
      salaryMax
      salaryCurrency
      source {
        name
      }
    }
    getTagCountGroups(
      tagGroups: [
        {
          name: "Languages"
          tags: [
            "javascript"
            "r"
            "typescript"
            "python"
            "rust"
            "go"
            "dart"
            "haskell"
            "c"
            "c#"
            "c++"
            "ruby"
            "swift"
            "kotlin"
            "java"
          ]
        }
        {
          name: "Frontend libraries"
          tags: ["reactjs", "angularjs", "jquery", "vue.js"]
        }
        {
          name: "Backend"
          tags: [
            "node.js"
            "php"
            "ruby-on-rails"
            "asp.net"
            "spring"
            "django"
            "flask"
          ]
        }
        { name: "Low level", tags: ["go", "c++", "go", "rust", "assembly"] }
        {
          name: "Mobile"
          tags: [
            "ios"
            "android"
            "react-native"
            "flutter"
            "xamarin"
            "cordova"
          ]
        }
        {
          name: "Databases"
          tags: [
            "postgresql"
            "mysql"
            "sql-server"
            "redis"
            "elasticsearch"
            "firebase"
          ]
        }
        { name: "Data science", tags: ["pandas", "matplotlib"] }
        { name: "Machine learning", tags: ["tensorflow"] }
        { name: "Devops", tags: ["ansible", "kubernetes", "docker", "jenkins"] }
        {
          name: "Cloud"
          tags: ["amazon-web-services", "azure", "google-cloud-platform"]
        }
      ]
    ) {
      name
      tags {
        name
        count
      }
    }
  }
`;
