import React from 'react'
import Image from 'next/image';

interface MetricProps {
	imgUrl: string;
	alt: string;
	value: string | number;
	title: string;
	href?: string;
	textStyles?: string;
	isAuthor?: boolean;
  }
  

const Metric = ({ imgUrl, title, alt, value, href, textStyles, isAuthor }: MetricProps) => {
	return (
		<>
			<div className='flex-center flex-wrap gap-1'>
				<Image 
					src={imgUrl}
					width={16}
					height={16}
					alt={alt}
					className={`object-contain ${href ? 'rounded-full' : ''}`}
				/>
				<p className={`flex items-center gap-1 ${textStyles}`}>
					{value}
					<span className={`small-regular line-clamp-1 ${isAuthor ?'max-sm:hidden' : ''}`}>
						{title}
					</span>
				</p>
			</div>
		</>
	)
}

export default Metric 