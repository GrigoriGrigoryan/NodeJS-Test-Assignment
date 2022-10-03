// 3. Services Interaction (NOT specified what kind of service is the question about 
// (e.g. microservices, class services in a monolith application, or something different) )


// Answers

// a) considering that we talk about microservices

// 1) What options do we have to establish such communication?
//      Two microservises can communicate with each other via HTTP request/response mechanism, or using
//      message brokers with HTTP based or other protocols (for example RabbitMQ, Apache Kafka, gRPC, etc).

// 2) For each option describe what are the pros and cons of this solution?
//      HTTP requests are easy to handle, however they can slow down the communication between two services
//      as for each message a new TCP connection is opened. Moreover, if a service is down for a while time
//      any HTTP request to that service will be lost.
//      Menawhile, message brokers allows you to laverage event driven pub/sub mechanism, when a message is
//      broadcasted in a specific channel, and all the other services can subscribed to that channel to be notified 
//      of a specific message. The messages in the queue are not lost if a service is down, so when a service is alive
//      again, it will get the message from a queue. However, message brockers are comparably hard to implement.
//      For more information please see (https://www.nginx.com/blog/building-microservices-inter-process-communication/) :)
//      P.S. I do not have experience working with microservices and the link is where I mainly read about them

// 3) For each option describe what are the cases the solution fits best?
//      // No comment    


// b) considering that we talk about a class service in a monolith application

// 1) What options do we have to establish such communication?    
//      In this case we can use differen OOP design patterns to make two calsses to talk to each other.
//      For example Observer pattern allows again to laverage the pub/sub pattern of communication, or Mediator
//      design pattern can help to controll and simplify communication between two or more objects/classes

