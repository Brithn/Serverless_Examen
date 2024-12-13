const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.createBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const { Title, Author, PublishedYear, Genre } = JSON.parse(event.body);
    if (!Title || !Author || !PublishedYear || !Genre) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Faltan campos obligatorios" }),
      };
    }

    if (isNaN(PublishedYear) || PublishedYear < 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalido PublishedYear" }),
      };
    }
    const BookID = v4();
    const newBook = {
      BookID,
      Title,
      Author,
      PublishedYear: Number(PublishedYear),
      Genre,
    };
    await dynamodb
      .put({
        TableName: "BookTables",  
        Item: newBook,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newBook),
    };
  } catch (error) {
    console.error("Error al crear book:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al crear book",
        error: error.message,
      }),
    };
  }
};
