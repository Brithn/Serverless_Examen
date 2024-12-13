const AWS = require("aws-sdk");

exports.getBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .scan({
      TableName: "BookTables",
    })
    .promise();
  const books = result.Items;
  return {
    status: 200,
    body: {
      books,
    },
  };
};