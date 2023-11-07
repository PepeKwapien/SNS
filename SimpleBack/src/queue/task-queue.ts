import Bull from 'bull';

let _taskQueue: Bull.Queue;

export const taskQueue: () => Bull.Queue = () => {
    if (!_taskQueue === undefined) {
        return _taskQueue;
    }

    try {
        _taskQueue = new Bull('task', {
            redis: {
                host: 'redis',
                port: 6379
            }
        });
    } catch (error) {
        console.error(`Issue when creating a task queue: ${error}`);
    }

    _taskQueue.process((job) => {
        console.log(`Job processed at ${Date.now()}`);
    });

    return _taskQueue;
};
