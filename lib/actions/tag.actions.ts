"use server"

import { GetTopInteractedTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase();
		const { userId} = params;
		const user = await User.findById(userId)

		if(!user) throw new Error("User not found");

		// find interactions by the user.
		// interaction model
		return [ { _id: '1', name: 'react'},{ _id: '2', name: 'mongo'},{ _id: '3', name: 'next'}]
	} catch (error) {
		console.log(error);
	  	throw error;
	}
}