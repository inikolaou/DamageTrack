<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* mongodb - If you're not using docker you need to have access to a mongodb database and its connection string
* To use the mailing capabilities of our application you need to fill the adminEmail_code variable below - For more details [click here](https://support.google.com/accounts/answer/185833)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/johnnikolaou/DamageTrack.git
   ```

2. Create .env file with these variables
   ```
   HOST = localhost
   PORT = 3000
   DB_URL = 'ENTER YOUR MONGO DATABASE CONNECTION STRING'
   adminEmail = 'ENTER YOUR EMAIL'
   adminPassword = 'ENTER THE PASSWORD FOR LOGGING IN WITH ADMIN ACCOUNT'
   adminEmail_code = 'ENTER THE APP PASSWORD FROM GMAIL'
   ```
   
### Building with docker

1. Start the containers
   ```sh
   docker-compose up --build
   ```

2. Access the website from [http://localhost:3000](http://localhost:3000)

### Building with node

1. Install node v18.16

2. Install npm packages
   ```sh
   npm install
   ```
3. Make sure the mongo server is running

4. Start the application
   ```sh
   npm start
   ```
 
5. Access the website from [http://localhost:3000](http://localhost:3000)
