import React from 'react'
import { Card, CardContent, CardHeader, CardFooter, CardTitle} from '../ui/card'
// import Header from './Header'
import { Button } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Social from './Social'


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonLink: string,
    showSocial?: boolean,
}

const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonLink, showSocial}:CardWrapperProps) => {
  return (
    <Card className={cn("max-w-[600px] flex flex-col justify-center items-center md:p-10 p-2 md:pb-2")}>
        <CardHeader>
            <CardTitle><div className={cn("w-")}>{headerLabel}</div></CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && <CardFooter className='w-full'><Social/></CardFooter>}
        <CardFooter >
            <Button variant="link"><Link href={backButtonLink}>{backButtonLabel}</Link></Button>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper
