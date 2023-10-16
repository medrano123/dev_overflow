import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import Filter from '@/components/shared/search/Filter'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.actions'

const Page = async () => {
	const result = await getAllUsers({})
	return (
		<>
			<h1 className="h1-bold text-dark100_light900">
            All Users
			</h1>
			<div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
				<LocalSearchbar
					route="/community"
					iconPosition="left"
					imgSrc='/assets/icons/search.svg'
					placeholder="Search for Amazing Minds"
					otherClasses="flex-1"
				/>
				<Filter
					filters={UserFilters}
					otherClasses="min-h-[56px] sm:min-w-[170px]"
				/>
			</div>
			<section className='mt-12 flex flex-wrap gap-4'>
				{result.users.length > 2 ? (
					result.users.map((user) => (
						<div key={user.name}>
							{user.name}
						</div>
					))
				) : (
					<div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
						<p>
                            No Users yet
						</p>
						<Link href='/sign-up' className='mt-2 font-bold text-accent-blue'>
                            Join to be the first!
						</Link>
					</div>
				)} 
			</section>
		</>
	)
}

export default Page