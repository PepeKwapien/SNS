import amqp from 'amqplib';

export async function sendObject(object: any) {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    const exchangeName = 'overdue_task_exchange';
    const objectType = 'overdue_task';

    await channel.assertExchange(exchangeName, 'direct', { durable: false });

    const message = JSON.stringify(object);

    const result = channel.publish(exchangeName, objectType, Buffer.from(message));
    console.log(result);

    setTimeout(() => {
        connection.close();
    }, 500);
}
