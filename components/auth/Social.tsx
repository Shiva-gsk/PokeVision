import React from 'react'
import {FcGoogle } from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'

const Social = () => {
  return (
    <div className='flex space-x-4 w-full'>
      <Button size="lg" className='w-full' variant={'outline'} onClick={() => signIn('google')}>
    <FcGoogle className='w-full'/>
      </Button>
      <Button size="lg" className='w-full' variant={'outline'} onClick={() => signIn('github', {
        callbackUrl:DEFAULT_LOGIN_REDIRECT
      })}>
    <FaGithub/>
      </Button>
    </div>
  )
}

export default Social
