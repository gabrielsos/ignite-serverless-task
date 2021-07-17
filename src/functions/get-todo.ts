import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamodb-client';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  var params = {
    TableName: "todos",
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },

    ExpressionAttributeValues: {
      ":user_id": userid,
    }
  };

  const response = await document.scan(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      user_id: userid,
      todos: response.Items
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}