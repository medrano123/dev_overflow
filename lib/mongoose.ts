import mongoose from 'mongoose'

let isConnected = false;

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true);

	if(!process.env.MONGODB_URL) return "Missing MongoDB url"

	if(isConnected) return console.log('MongoDB is already connected')

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'devflow'
		})
		isConnected = true;
		console.log('MongoDB is connected')
	} catch (error) {
		console.log('MongoDB connection failed', error)
	}
}