import * as aws from "aws-sdk";
import * as http from "https";
import { parse } from "url";
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

/**
 * Uploads an image to the object storage
 * @param fileUrl The image to download from
 */
export async function downloadImage(
  fileUrl: string
): Promise<{ buffer: Buffer; extension: string; contentType?: string }> {
  return new Promise((accept, reject) => {
    try {
      http.get(parse(fileUrl), res => {
        const data: Array<Uint8Array> = [];
        const contentType = res.headers["content-type"];
        let extension: string;
        const defaultExtension = "png";
        if (contentType) {
          const mimeExtension = mime.extension(contentType);
          extension = mimeExtension ? mimeExtension : defaultExtension;
        } else {
          extension = defaultExtension;
        }
        res
          .on("data", function(chunk) {
            data.push(chunk);
          })
          .on("end", async () => {
            //at this point data is an array of Buffers
            //so Buffer.concat() can make us a new Buffer
            //of all of them together
            let buffer = Buffer.concat(data);
            accept({ buffer, extension, contentType });
          });
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

export async function uploadFile(
  buffer: Buffer,
  fileKey: string,
  contentType?: string
): Promise<ManagedUpload.SendData> {
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
