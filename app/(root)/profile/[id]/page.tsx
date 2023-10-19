import React from 'react'

import { URLProps } from '@/types'

const Page = async ({ params, searchParams }: URLProps) => {
	return (
		<div>{params.id}</div>
	)
}

export default Page