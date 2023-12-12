# SNS - simple notification system

This is a very small project meant to discover and learn basics of Redis queues/jobs with RabbitMq and Websockets

## How to launch

Simply install Docker on your local machine and `docker-compose up` the docker-compose file in the root directory (both should work)

Then go to `localhost:4200` in your browser to launch SimpleFront where you can add tasks to the backend

If one's task is expired the front will automatically refresh the view without one needing to manually refresh.

Additionally the expired task will be sent over RabbitMq to SimpleListener (which probably won't stay alive the first time you docker-compose - I did not fix it on purpose to showcase durability of the RabbitMq queues).
