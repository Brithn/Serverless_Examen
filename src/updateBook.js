const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;

  try {
    const { Title, Author, PublishedYear, Genre } = JSON.parse(event.body);
    if (!Title || !Author || !PublishedYear || !Genre) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
      };
    }
    if (isNaN(PublishedYear) || PublishedYear < 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid PublishedYear" }),
      };
    }

    const updatedBook = await dynamodb
      .update({
        TableName: "BookTables",  
        Key: { BookID },
        UpdateExpression:
          "SET Title = :Title, Author = :Author, PublishedYear = :PublishedYear, Genre = :Genre",
        ExpressionAttributeValues: {
          ":Title": Title,
          ":Author": Author,
          ":PublishedYear": Number(PublishedYear),
          ":Genre": Genre,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Book updated successfully",
        book: updatedBook.Attributes,
      }),
    };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updating book",
        error: error.message,
      }),
    };
  }
};
