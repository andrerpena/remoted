import * as aws from "aws-sdk";
import * as http from "https";
import * as url from "url";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import * as mime from "mime-types";

export function updateAwsCredentials() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = process.env.S3_BUCKET;

  if (!accessKeyId || !secretAccessKey || !bucket) {
    throw Error("Could not find AWS credentials");
  }

  aws.config.update({ accessKeyId, secretAccessKey });
}

export async function uploadFromUrl(
  fileKey: string,
  imageUrl: string
): Promise<ManagedUpload.SendData> {
  updateAwsCredentials();
  return new Promise((accept, reject) => {
    http.get(url.parse(imageUrl), res => {
      const contentType = res.headers["content-type"];
      let extension: string;
      const defaultExtension = "png";
      if (contentType) {
        const mimeExtension = mime.extension(contentType);
        extension = mimeExtension ? mimeExtension : defaultExtension;
      } else {
        extension = defaultExtension;
      }

      const data: Array<any> = [];

      res
        .on("data", function(chunk) {
          data.push(chunk);
        })
        .on("end", async () => {
          //at this point data is an array of Buffers
          //so Buffer.concat() can make us a new Buffer
          //of all of them together
          const buffer = Buffer.concat(data);

          try {
            const result = await uploadFile(
              buffer,
              `${fileKey}.${extension}`,
              contentType
            );
            accept(result);
          } catch (ex) {
            reject(ex);
          }
        });
    });
  });
}

export async function uploadFile(
  buffer: Buffer,
  fileKey: string,
  contentType?: string
) {
  updateAwsCredentials();
  const bucket = process.env.S3_BUCKET as string;

  const s3 = new aws.S3({ endpoint: "sfo2.digitaloceanspaces.com" });
  return s3
    .upload({
      Bucket: bucket,
      Key: fileKey,
      Body: buffer,
      ACL: "public-read",
      ContentType: contentType
    })
    .promise();
}

// Example result
// { ETag: '"9b7099392e06d278cd5d617431fc2539"',
//   Location: 'https://remoted.sfo2.digitaloceanspaces.com/company-y',
//   key: 'company-y',
//   Key: 'company-y',
//   Bucket: 'remoted' }
