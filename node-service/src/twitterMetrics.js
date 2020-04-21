const AWS = require('aws-sdk');

const readHourlyMetrics = (date, hour, callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'twitter-metric',
        Key: {
            'date': date,
            'hour': hour
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

const readDailyMetrics = (date, callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'twitter-metric',
        KeyConditionExpression: '#date = :d',
        ExpressionAttributeNames: {
            '#date': 'date'
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

module.exports ={
    readDailyMetrics,
    readHourlyMetrics
};
