import * as http from 'http';
import amqp from 'amqplib';

const hostname = '0.0.0.0';
const port = 3001;

async function receiveObject() {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    const exchangeName = 'overdue_task_exchange';
    const objectType = 'overdue_task';

    await channel.assertExchange(exchangeName, 'direct', { durable: false });

    const { queue } = await channel.assertQueue('overdue_task_queue', { exclusive: true });

    channel.bindQueue(queue, exchangeName, objectType);

    console.log(`Waiting for [${objectType}] objects. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(
        queue,
        (msg) => {
            if (msg.content) {
                // Potential to send email etc.
                const receivedObject = JSON.parse(msg.content.toString());
                console.log('Object received:', receivedObject);
            }
        },
        { noAck: true }
    );
}

receiveObject();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("I'm listening, yo");
});

server.listen(port, hostname, () => {
    console.log(`Listener running at http://${hostname}:${port}`);
});
