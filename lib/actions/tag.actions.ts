"use server"

import { GetTopInteractedTagsParams, GetAllTagsParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

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

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase();
		const tags = await Tag.find({})
		return { tags }
	} catch (error) {
		console.log(error);
	  	throw error;
	}
}