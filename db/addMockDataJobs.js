require('dotenv').config()

const mockData = require('../mock_job_data.json')

const Job = require('../models/Job')
const connectDB = require('../db/connect')

const addMockDataJobs = async () => {
  try {
    //await Job.deleteMany();
    await connectDB(process.env.MONGO_URI)
    await Job.create(mockData)
    console.log('Mock data added to DB')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

addMockDataJobs()
