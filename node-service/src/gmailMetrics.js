const AWS = require('aws-sdk');


const readDailyMetrics = (date, callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'gmail-metrics',
        KeyConditionExpression: '#Date = :d',
        ExpressionAttributeNames: {
            '#Date': 'Date'
        },
        ExpressionAttributeValues: {
            ':d': date
        }
    };


    docClient.query(params, (err, data) => {
        if(err){
            callback(err, undefined);
        }else{
            callback(undefined, data);
        }
    });
};

const readHourlyMetrics = (date, hour, callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'gmail-metrics',
        Key: {
            'Date': date,
            'Hour': hour
        }
    };

    docClient.get(params, (err, data) => {
        if(err){
            callback(err, undefined);
        }else{
            callback(undefined, data);
        }
    });
};


module.exports = {
    readDailyMetrics,
    readHourlyMetrics
};