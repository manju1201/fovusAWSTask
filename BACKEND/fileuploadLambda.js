const AWS = require('aws-sdk');

// Update AWS SDK Configuration if needed
AWS.config.update({
  region: 'us-east-1' // e.g., us-west-2
});

const s3 = new AWS.S3();

exports.handler = async (event) => {
  if (!event.queryStringParameters || !event.queryStringParameters.filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No filename provided' })
    };
  }
  const fileName = event.queryStringParameters.filename;

  try {
    const params = {
      Bucket: 'fovusfilebucket',
      Key: fileName,
      Expires: 60 * 5,  // URL expires in 5 minutes
      ContentType: 'text/plain'
    };

    const s3 = new AWS.S3();
    const url = await s3.getSignedUrlPromise('putObject', params);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ url })
    };
  } catch (err) {
    console.error("Error generating pre-signed URL:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not generate pre-signed URL' })
    };
  }
};
