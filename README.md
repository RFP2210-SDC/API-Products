# Products API

### Table of Contents
1. [General Info](#general-info)
2. [Database and Queries](#performance)
3. [Scaling](#scaling)
4. [Tech Stack](#tech)
5. [Team](#team)

<a name="general-info"></a>
### General Info

Products API for the back-end of a clothing retail website that needed to meet the demand of a growing customer base continuosly accessing the over 1,000,000 product inventory. Within two weeks, our team designed a database and server, deployed it on AWS, and achieved a minimum of 1000 responses per second, with less than 1% error rate.
 
<a name="performance"></a>
### Database and Queries

I began the process of architecting a postgres database after analyzing five csv files making up over 26 million rows of data. Once the database was designed to best handle user queries I engineered an ETL process to clean legacy data and ensure seamless loading into PostgresDB using CSV-Parser.

<details>
  <summary>Local Optimizations</summary>

Maximizing query efficiency was important to me because I viewed it as a limiting factor for the response time and responses per second goals I was given. Spending more time optimizing query speeds can help save costs when horizontally or vertically scaling. The three main optimizations I made were client pooling, keyset pagination, and indexing.

<details>
  <summary>Connection Pool</summary>
 
By using a connection pool, when our user requests can be handled more efficiently.  The pool is able to leverage the databases multithreading abilities and reuse threads, rather than creating and tearing down a single thread when using a client connection. This is important when handling many requests per second.
</details> 

<details>
 
  <summary>Keyset Pagination</summary>
  
                      Before                   |                   After                    
 :------------------------------------------------: | :-----------------------------------------------: 
 ![ProductListBefore](https://user-images.githubusercontent.com/105510284/216197155-eab039d9-573c-47be-97fb-4b2aa5ecee68.png) 
  -1000 RPS Load
  -Response Time: 15.43s 
  -Responses per second: 45.31 | ![ProductListAfter](https://user-images.githubusercontent.com/105510284/216197187-477090fe-accd-44d0-8daf-a403bf56addf.png) 
  -1000 RPS Load
  -Response Time: 1.09s 
  -Responses per second: 424.44 
  
  Individual query times using keyset pagination as opposed to OFFSET LIMIT were twice as fast. With a 1000 rps load, response times were 15 times faster and I got nearly ten times the amount of responses per second. This is because the query could go directly to a specific index, rather than sequentially searching through one million products. If we had a smaller database, the difference could be negligible.
 
</details>

<details>
  <summary>Indexing</summary>
  
  After indexing, individual query times improved significantly, and in one case the query time was reduced from 409.5ms to 23.25ms. That's 17 times faster. In the image below you can see that I was able to achieve a maximum of 2205.89 responses per second with a response time of 1.16ms when ramping up to 4000 responses per second locally.
  ![related](https://user-images.githubusercontent.com/105510284/216202187-b69591a6-b659-463f-be98-ef837632dfe6.png)

</details> 
</details> 

<a name="scaling"></a>
### Scaling

The back End Architecture consisted of 3 servers, an NGINX load balancer with a cache, and a Postgres database. The products API was then deployed on AWS where load tests were performed via Loader.io.

<details>
  <summary>Deployed Optimizations</summary>

### Background
 
The data below is based on the product list API endpoint which returns a specific list of products based on the page and count provided. I will be using the data to show improvements as the backend architecture was scaled, starting with one server and progressing to three serves, a load balancer and caching.
 
### One Server
 
 Using Loader.io, I stress tested the system with one server and one database. After 30 seconds of 1000 rps load, a maximum of 931.83 rps was achieved with a 1.479s response time. However, the system performed well under an 825 rps load, easily achieving 825rps at 77ms response time.  
![Screenshot 2023-01-07 at 10 05 35 AM](https://user-images.githubusercontent.com/105510284/216225632-e428e766-1620-43ea-b09b-9978a419360e.png)

 I identified that the single server could not handle such a large load, so a second server would be needed. After deploying a second server, NGINX was used to balance the load between the two servers. After 30 seconds of a 1000 rps load, the system achieved 1000 rps with a 65ms response time and 0% error. The goal of 1000 RPS was achieved, but ideally the endpoint would be able to handle a larger number of requests. With the system still limited by only two servers, I added a third server to reach 1796.63 rps with a 73ms response time and 1.4% error rate. 
 
   |                    2 Servers                  |                   3 Servers                    |
| :------------------------------------------------: | :-----------------------------------------------: |
|![Screenshot 2023-01-08 at 10 16 04 PM](https://user-images.githubusercontent.com/105510284/216226871-e5b0c644-0ded-4741-9e67-cbb14d08e20f.png)|![Screenshot 2023-01-08 at 10 27 14 PM](https://user-images.githubusercontent.com/105510284/216226953-1a84b255-840c-4e08-a7f7-b679f885ad45.png)
 |
 
 At this point, each endpoint was meeting performance requirements, but the error rate could use an improvement. In order to get the most out of the system and to achieve better performance with increased user traffic I implemented the caching abilities of NGINX. When testing using a load of 1825 rps, the system was able to achieve a respectable 1804.57 rps with a 61 ms response time and 0.9% error rate. This was a significant improvement for each metric. It is important to note that these numbers were achieved after building up the caches memory. 
 
 Ultimately, the product list endpoint achieved 4415.83 rps with a response time of 63ms and 0.9% error rate. This was a 790% increase in rps and the response time was 22% faster. 
 ![Screenshot 2023-01-08 at 10 31 23 PM](https://user-images.githubusercontent.com/105510284/216229351-f4f60081-fe1e-4886-b958-f9e9c38bddbb.png)

</details>


<a name="tech"></a>
### Tech Stack
![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) <br />


<a name="team"></a>
Product Detail: Ryan Gehris\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ryangehris/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ryangehris)
