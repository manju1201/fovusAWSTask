recordId=$1
inputFilePath=$2
inputText=$3
bucketName="fovusfilebucket"
tableName="FileTable"
region="us-east-1"
fileName=$(basename $inputFilePath)
outputFileName="processed_${fileName}"
outputFilePath="${bucketName}/${outputFileName}"
aws configure set default.region $region
aws s3 cp s3://${bucketName}/${fileName} /tmp/${fileName}
if [ $? -eq 0 ]; then
    echo " : ${inputText}" >> /tmp/${fileName}
    aws s3 cp /tmp/${fileName} s3://${bucketName}/${outputFileName}
    if [ $? -eq 0 ]; then
        echo "File processed and uploaded successfully."
        aws dynamodb update-item --table-name FileTable \
                --key '{"id": {"S": "'${recordId}'"}}' \
                --update-expression "SET output_file_path = :p" \
                --expression-attribute-values '{":p": {"S":"'"${outputFilePath}"'"}}' \
                --return-values ALL_NEW
    else
        echo "Failed to upload the file to S3."
    fi
else
    echo "Failed to download the file from S3."
fi
echo "Instance ID: $INSTANCE_ID" >> /tmp/log.txt
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
INSTANCE_ID=$(curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
aws ec2 terminate-instances --instance-ids $INSTANCE_ID