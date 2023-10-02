"use server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { GetQuestionsParams, CreateQuestionParams } from "./shared.types";


export async function createQuestion(params: CreateQuestionParams){
	try {
		connectToDatabase();
		const { title, content, author, tags, path } = params;

		// create the question
		const question = await Question.create({
			title,
			content,
			author,
		})
		const tagDocuments = []

		// create the tag or get it if it already exits
		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, "i") } }, 
				{ $setOnInsert: { name: tag }, $push: { question: question._id } },
				{ upsert: true, new: true }
			)
			tagDocuments.push(existingTag._id)
		}

		// update the question
		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments }}
		});

		// Create an interaction record for the user's ask_question action
    
		// Increment author's reputation by +5 for creating a question

		revalidatePath(path)

	} catch (error) {
		console.log(error)
		throw Error
	}
}
 
export async function getAllQuestions( params : GetQuestionsParams) {
	try {
		connectToDatabase()
        
		const questions = await Question.find({})
			.populate({ path: 'tags', model: Tag })
			.populate({ path: 'author', model: User })
			.sort({ createdAt: -1})
		return { questions }
	} catch (error) {
		console.log(error)
		throw Error
	}
} 