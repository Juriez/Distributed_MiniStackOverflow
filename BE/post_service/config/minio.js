// const Minio = require('minio');

// const minioClient = new Minio.Client({
//   endPoint: process.env.MINIO_ENDPOINT,
//   port: parseInt(process.env.MINIO_PORT),
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY,
//   secretKey: process.env.MINIO_SECRET_KEY,
// });

// const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;



// minioClient.bucketExists(BUCKET_NAME, async (err, exists) => {
//   if (err) {
//     console.log('Error checking bucket existence:', err);
//     return;
//   }
//   if (!exists) {
//     try {
//       await minioClient.makeBucket(BUCKET_NAME, 'us-east-1'); // Specify the region if needed
//       console.log(`Bucket "${BUCKET_NAME}" created successfully.`);
//     } catch (error) {
//       console.error('Error creating bucket:', error);
//       return;
//     }
//   }
// });


// module.exports = { minioClient, BUCKET_NAME };


const Minio = require('minio');

// Initialize the MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME;

// Check if the bucket exists, create it if not, and set the policy
minioClient.bucketExists(BUCKET_NAME, async (err, exists) => {
  if (err) {
    console.log('Error checking bucket existence:', err);
    return;
  }

  if (!exists) {
    try {
      // Create the bucket
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1'); // Specify the region if needed
      console.log(`Bucket "${BUCKET_NAME}" created successfully.`);

      // Define a public bucket policy
      const publicPolicy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: [
              's3:GetObject'
            ],
            Resource: [
              `arn:aws:s3:::${BUCKET_NAME}/*`
            ]
          }
        ]
      };

      // Convert policy to JSON string
      const policyString = JSON.stringify(publicPolicy);

      // Set the bucket policy
      await minioClient.setBucketPolicy(BUCKET_NAME, policyString);
      console.log(`Bucket policy for "${BUCKET_NAME}" set to public.`);
    } catch (error) {
      console.error('Error creating bucket or setting policy:', error);
      return;
    }
  } else {
    console.log(`Bucket "${BUCKET_NAME}" already exists.`);
  }
});

module.exports = { minioClient, BUCKET_NAME };
