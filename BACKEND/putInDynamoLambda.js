const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { nanoid } = await import('nanoid');
    const id = nanoid();    
    let data = JSON.parse(event.body);

    const params = {
        TableName: 'FileTable',
        Item: {
            id: id,
            input_text: data.text,
            input_file_path: data.filePath
        }
    };

    try {
        await dynamo.put(params).promise();
        return { 
          statusCode: 200,
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
          }, 
          body: JSON.stringify({ message: 'Data saved successfully', id }) 
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
