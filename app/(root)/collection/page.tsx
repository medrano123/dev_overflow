import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/search/Filter";
import { auth } from "@clerk/nextjs";
import { QuestionFilters } from '@/constants/filters'
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";

 
export default async function Home({ searchParams }: SearchParamsProps) {
	const {userId} = auth()
	if(!userId) return null;

	const result = await getSavedQuestions({
		clerkId: userId,
		searchQuery: searchParams.q,
		filter: searchParams.filter,
	});
	
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
					Saved Questions
			</h1>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchbar
					route="/"
					iconPosition="left"
					imgSrc='/assets/icons/search.svg'
					placeholder="Search for Questions"
					otherClasses="flex-1"
				/>
				<Filter
					filters={QuestionFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>
			<div className="mt-10 flex w-full flex-col gap-6">
				{result.questions.length > 0 ? (
					result.questions.map((question) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : <NoResult
					title="There's no Saved Questions to show"
					description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
					link='/ask-question'
					linkTitle="Ask a Question"
				/>
				}
			</div>
		</>
	)
}