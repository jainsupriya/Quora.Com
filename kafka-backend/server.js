var connection =  new require('./kafka/Connection');
// var stringify = require('json-stringify-safe');
require('./config/db');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                    // messages:stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("course1",require('./services/books.js'))
handleTopicRequest("answer",require('./services/answer.js'))
handleTopicRequest("auth",require('./services/auth.js'))
handleTopicRequest("comment",require('./services/comment.js'))
handleTopicRequest("message",require('./services/message.js'))
handleTopicRequest("question",require('./services/question.js'))
handleTopicRequest("topic",require('./services/topic.js'))
handleTopicRequest("user",require('./services/user.js'))
