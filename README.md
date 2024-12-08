# Serverless Image Metadata Extractor Using AWS Lambda on AWS Graviton🌩️

This project demonstrates how to build a serverless application that extracts metadata from images uploaded to an Amazon S3 bucket. The Lambda function, powered by AWS Graviton, uses the `sharp` library for image processing and metadata extraction. The extracted metadata is saved back to the same S3 bucket.



## Features
- Automatically triggered when an image is uploaded to an S3 bucket.
- Extracts metadata like dimensions, format, and size using `sharp`.
- Saves the metadata in JSON format to the same S3 bucket.
- Cost-efficient and high-performance architecture leveraging AWS Graviton.



## Architecture
1. **Amazon S3**: Stores the uploaded images and metadata files.
2. **AWS Lambda**: Processes image uploads and extracts metadata.
3. **AWS Graviton**: Lambda functions are executed on ARM-based Graviton processors, ensuring cost efficiency.



## Prerequisites
- AWS account with administrative privileges.
- AWS CLI installed and configured.
- Node.js (v18 or later) installed locally.
- AWS SAM CLI installed.


## Setup Instructions

### Step 1: Create an S3 Bucket
1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to **S3** and create a bucket named `image-metadata-extractor`.
3. Set permissions to allow Lambda functions to read/write objects.

### Step 2: Set Up the Lambda Function Locally
1. **Initialize the Project**:
   ```bash
   sam init
- Choose Quick start templates.
- Select Node.js 18.x as the runtime.
- Name the project: image-metadata-extractor.

2. **Install Dependencies: Navigate to the project folder and install the sharp library**
  ```bash
  npm install sharp
 ```
3. Write the lambda function to extract metadata from the image


### Step 3: Test the Function in VS code
1. **Start the local API Gateway**:
   ```bash
   sam local start-api
   ```
2. **Test with a sample image**:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"bucket":"image-metadata-extractor", "key":"example.jpg"}' http://127.0.0.1:3000/
   
### Step 4: Deploy the function to AWS
1. **Package and deploy the Lambda function**:
   ```bash
    sam package --output-template-file packaged.yaml --s3-bucket your-s3-bucket-name
    sam deploy --template-file packaged.yaml --stack-name metadata-extractor-stack --capabilities CAPABILITY_IAM
 
### Step 5: Add S3 Trigger
1. In the Lambda Console, go to the Triggers section.
2. Add an S3 trigger for the image-metadata-extractor bucket.
3. Configure the trigger to respond to "All object create events".

### Step 6: Test the Deployed Function
1. Upload an image to the S3 bucket:
   ```bash
   aws s3 cp example.jpg s3://image-metadata-extractor/
2. Verify the metadata is extracted and stored in the S3 bucket.
