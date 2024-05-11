# Fovus Coding Challenge

Go to the [Github Link](https://github.com/manju1201/fovusAWSTask) for the project.

## Getting Started with the Frontend

### Prerequisites

- Node.js installed on your machine.

### Installation (for local development purposes)

1. Download the FRONTEND folder.
2. Navigate into the FRONTEND directory:

sh
cd FRONTEND


3. Install the necessary dependencies:

sh
npm install


4. Start the development server:

sh
npm start


You can now access the page on [https://localhost:3000](https://localhost:3000).

### Hosted React App on Netifly

1. Build the site with npm run build.
2. Upload the contents of the build folder to the Netifly website.
3. Updated the CORS policy in S3 bucket accordingly.
4. The site can be accessed at: [Webiste Link](https://fovusassessment.netlify.app/)

## AWS Configuration

### 1. S3 Bucket

Create an S3 bucket to store objects.

### 2. DynamoDB Table

Create a DynamoDB table to store items.

### 3. Process Script

Upload script.sh to the S3 bucket.

### 4. AWS Policies

Create policies to:

- Get and store objects in S3.
- Get, put, and update items in DynamoDB.
- Allow EC2 to pass IAM roles.

### 5. IAM Roles

Setup the following IAM roles:

- *Ec2S3DynamoDBAccessRole*: For EC2 instances to interact with S3 and DynamoDB.
- *LambdaDynamoDBAccess*: For Lambda functions to interact with DynamoDB.
- *LambdaS3AccessRole*: For Lambda functions to interact with S3.
- *LambdaProcessFile*: For Lambda functions to manage EC2 instances and access S3 and DynamoDB.

### 6. Lambda Functions

- *PreSignedURLGeneratorS3StoreLambda*: Generates pre-signed URLs for S3 object storage. The code for index.js can be found at processvmLambda.js
- *DynamoDBItemStoreLambda*: Stores items in DynamoDB. The code for index.js can be found at putInDynamoLambda.js
- *ProcessFileLaunchVMLambda*: Launches and terminates an EC2 instance for file processing. The code for index.js can be found at fileuploadLambda.js

### API Gateway

Configure API Gateway to trigger Lambda functions for handling S3 pre-signed URL generation and DynamoDB operations.

## Troubleshooting

- For issues related to S3, ensure that the bucket policy allows public read access and that the static website hosting is configured correctly.
- For Lambda functions, check the IAM role permissions and ensure that the Lambda function's execution role has the necessary policy attached.
- For DynamoDB, ensure that the table exists with the correct primary key schema and that the IAM role has permissions for the required operations.

# References

1. *Amazon S3 (Simple Storage Service)* - An object storage service that offers industry-leading scalability, data availability, security, and performance.
   - User Guide: [https://docs.aws.amazon.com/s3/index.html](https://docs.aws.amazon.com/s3/index.html)

2. *AWS Lambda* - A serverless compute service that lets you run code without provisioning or managing servers.
   - Developer Guide: [https://docs.aws.amazon.com/lambda/latest/dg/welcome.html](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)

3. *Amazon DynamoDB* - A fast and flexible NoSQL database service for any scale.
   - Developer Guide: [https://docs.aws.amazon.com/dynamodb/latest/developerguide/Introduction.html](https://docs.aws.amazon.com/dynamodb/latest/developerguide/Introduction.html)

4. *Amazon EC2 (Elastic Compute Cloud)* - A web service that provides secure, resizable compute capacity in the cloud.
   - User Guide: [https://docs.aws.amazon.com/ec2/index.html](https://docs.aws.amazon.com/ec2/index.html)

5. *Amazon API Gateway* - A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.
   - Developer Guide: [https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

6. *AWS SDK for JavaScript* - A library for interacting with AWS services using JavaScript.
   - Documentation: [https://aws.amazon.com/sdk-for-javascript/](https://aws.amazon.com/sdk-for-javascript/)
