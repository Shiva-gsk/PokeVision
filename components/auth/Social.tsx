import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { useSearchParams } from 'next/navigation'

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_LOGIN_REDIRECT;
  return (
    <div className='flex space-x-4 w-full'>
      <Button size="lg" className='w-full' variant={'outline'} onClick={() => signIn('google', {callbackUrl})}>
        <FcGoogle className='w-full' />
      </Button>
      <Button size="lg" className='w-full' variant={'outline'} onClick={() => signIn('github', {
        callbackUrl: callbackUrl
      })}>
        <FaGithub />
      </Button>
    </div>
  )
}

export default Social;
