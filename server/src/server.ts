import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import config from 'config';

import app from './app';
import log from './utils/logger';
import connectDB from './utils/connectDB';

const PORT=config.get('port');
 
const httpServer=http.createServer(app);

 
   
httpServer.listen(PORT,async()=>{
    await connectDB();
    log.info(`Server running on port ${PORT}`)
})

process.on('unhandledRejection', (err:any) => {
    console.log(`Error ${err.message}`);
    // Close Server & exit process
    httpServer.close(() => process.exit(1));
  });
 