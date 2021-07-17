import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../utils/dynamodb-client';
import { v4 as uuidv4 } from 'uuid';
interface ICreateTodo {
  id: string,
  title: string,
  deadline: Date,
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  const { userid } = event.pathParameters;

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuidv4(),
      user_id: userid,
      title,
      done: false,
      deadline,
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created'
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}