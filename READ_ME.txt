This MEAN FSD app is hosted on AWS and can be publicly accessed via the following URL:

http://mean-fsd-task-manager.s3-website.us-east-2.amazonaws.com/

STEPS TO HOST TASK MANAGER APPLICATION LOCALLY

1) Starting MongoDB database

	  i) Open command prompt and CD to C:\Users\Admin\Desktop\FSD MEAN PAWAN\mongodb\bin
	 ii) Run th command: mongod --dbpath "C:\Users\Admin\Desktop\FSD MEAN PAWAN\data\db"
	iii) Leave the command window open/running

2) Running node/express server for api requestes to MongoDB

	  i) Open another command prompt and CD to C:\Users\Admin\Desktop\FSD MEAN PAWAN\TaskManager\backend
	 ii) Run the command: node server.js
	iii) Leave the command window open/running

3) Serving the angular front end application

	i) Open another command prompt and cd to C:\Users\Admin\Desktop\FSD MEAN PAWAN\TaskManager
	ii) Run the command: ng serve -O
	iii) Leave the command window open/running

4) Using the app
	i) Navigate to localhost:4200 on your browser
 