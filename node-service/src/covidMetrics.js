const AWS = require('aws-sdk');


const readDailyMetrics = (date, callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'covid-metrics',
        KeyConditionExpression: '#Date = :d',
        ExpressionAttributeNames: {
            '#Date': 'date'
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

const readAllMetrics = (callback) =>{
    let docClient = new AWS.DynamoDB.DocumentClient({ region:'us-west-1' });

    const params = {
        TableName: 'covid-metrics',
    };


    docClient.scan(params, (err, data) => {
        if(err){
            callback(err, undefined);
        }else{
            callback(undefined, data);
        }
    });
}


module.exports = {
    readDailyMetrics,
    readAllMetrics
};