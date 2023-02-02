# Products API

### Table of Contents
1. [General Info](#general-info)
2. [Performance](#performance)
3. [Optimization](#optimization)
4. [Tech Stack](#tech)
5. [Team](#team)

<a name="general-info"></a>
### General Info

Products API for the back-end of a clothing retail website that needed to meet the demand of a growing customer base continuosly accessing the over 1,000,000 product inventory. Within two weeks, our team designed a database and server, deployed it on AWS, and achieved a minimum of 1000 responses per second, with less than 1% error rate.

<a name="performance"></a>
### Perfomance

I began the process of architecting a postgres database after analyzing five csv files making up over 26 million rows of data. Once the database was designed to best handle user queries I engineered an ETL process to clean legacy data and ensure seamless loading into PostgresDB using CSV-Parser.

Maximizing query efficiency was important to me because I viewed it as a limiting factor for the response time and responses per second goals I was given. Spending more time optimizing query speeds can help save costs when horizontally or vertically scaling. The three main optimizations I made were client pooling, keyset pagination, and indexing.
<details>
  <summary>Client Pooling</summary>
  
</details> 
<details>
  <summary>Keyset Pagination</summary>
  
  ##Keyset Pagination
  |                    Before                   |                   After                    |
| :------------------------------------------------: | :-----------------------------------------------: |
| ![ProductListBefore](https://user-images.githubusercontent.com/105510284/216197155-eab039d9-573c-47be-97fb-4b2aa5ecee68.png)
 | ![ProductListAfter](https://user-images.githubusercontent.com/105510284/216197187-477090fe-accd-44d0-8daf-a403bf56addf.png)
 |
  
</details>
<details>
  <summary>Indexing</summary>
  
  
  |                    Before                   |                   After                    |
| :------------------------------------------------: | :-----------------------------------------------: |
| | |
  
</details> 


Back End Architecture utilizes AWS to deploy a load balancer with a cache, 3 servers, and a Postgres database. All load tests performed via Loader.io.

<details>
  <summary>Typical Load Performance</summary>

  #### Typical 1000 RPS Load

  Perfomance at typical load of 1000 clients per second. 4ms latency and 0% error

  ![1000 RPS Performance](assets/Products1kReg.png)

</details>



<a name="optimization"></a>
### Optimization

<details><summary>Cache Implementation</summary>

  #### Cache Performance

  Cache and load balancer implemented using Nginx - Latency has decreased by almost 50% to an average of 61ms and can handle up to 5000rps with a 0% error rate.

  ![5000 RPS Performance](assets/Products5kCache.png)

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
