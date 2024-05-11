const AWS = require('aws-sdk');

// Update AWS SDK Configuration if needed
AWS.config.update({
  region: 'us-east-1' // e.g., us-west-2
});

const EC2 = new AWS.EC2();

exports.handler = async (event) => {
    for (const record of event.Records) {
        if (record.eventName === 'INSERT') {
            const fileId = record.dynamodb.NewImage.id.S;
            const filePath = record.dynamodb.NewImage.input_file_path.S;
            const inputText = record.dynamodb.NewImage.input_text.S;
            // Trigger the VM creation and script execution
            await createAndExecuteVM(fileId, filePath, inputText);
        }
    }
};

async function createAndExecuteVM(fileId, filePath, inputText) {
    // Define the VM instance settings, including UserData to automate script execution
    let userDataScript = `#!/bin/bash
aws s3 cp s3://fovusfilebucket/script.sh /tmp/script.sh
chmod +x /tmp/script.sh
/tmp/script.sh "${fileId}" "${filePath}" "${inputText}"`;
    const params = {
        ImageId: 'ami-0036325896bdf2f2f', // Specify your AMI
        InstanceType: 't2.micro',
        MinCount: 1,
        MaxCount: 1,
        UserData: Buffer.from(userDataScript).toString('base64'),
        KeyName: 'keypair', // Specify your key pair
        SecurityGroupIds: ['sg-013bb537d87cfe31f'], // Specify your security group
        IamInstanceProfile: {
            Arn: 'arn:aws:iam::637423585716:instance-profile/EC2S3DynamoDBAccessRole'
        }
    };

    try {
        const result = await EC2.runInstances(params).promise();
        console.log('VM Created:', result.Instances[0].InstanceId);
    } catch (error) {
        console.error('Failed to create VM:', error);
    }
}
