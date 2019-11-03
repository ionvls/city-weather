# Contact List.


# Developemnt Guide
In order to start the development environment you need to execute the following commands.

Install packages
```
$ yarn
```

Start `React Frontend`.
```
$ cd client
$ yarn start
```

Start `Nodejs Backend`.
```
$ cd server 
$ yarn server-dev
```

**Important!** you must start `Mongodb` together for using database.
```
$ sudo service mongod start
```

# Production Guide

To run with Docker just run the following command ( may require sudo )
```
$ sh docker_production_deploy.sh
```

Visit http://localhost
