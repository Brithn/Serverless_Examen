const AWS = require("aws-sdk");

exports.deleteBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;

  try {
    await dynamodb
      .delete({
        TableName: "BookTables",  
        Key: { BookID },
      })
      .promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: "Libro eliminado correctamente",
      }),
    };
  } catch (error) {
    console.error("Error deleting book:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error deleting book",
        error: error.message,
      }),
    };
  }
};
