Simple Readme for myself

* Grab both Midnite and Factorgg info. DONE
* Grab amount of money on Midnite. Cheerio should help with this
* Learn how to input information. Can't see this being too difficult
* Save results into a database. Create Schema and model and push onto it

From here, I'd have to assumt I can start building out the API routes which I'll use Express for while using NodeJS to learn to Express. 

NOTE: Will need to look at the dates of both Midnite and Factorgg. 
NOTE: Will need to consider the need of a frontend. I will be setting up API's so I will be able to see previous information. This will require CLIENT/SERVER folders

BIG NOTE: index.js will execute the script and it will have cascading affect

17th April: Will create the backend first so then I know what to make for the frontend. 

Every game that comes on Factor has an ID. We can add that ID onto each betable game so we don't have to check it again. 
We can create an assumption that each game found on factor will have a betable game. We don't want to have to go to the work of pairing games together unless we actually have to. 

* Grab games from factor
* Check database with findOne({factorId: factorIdNumber})

If it exists, nothing else needs done. If it doesn't exist, we should pair that game up with a betable game and then add that to the database. 

21 April: Let's see if I can get this git thing to work correctly.