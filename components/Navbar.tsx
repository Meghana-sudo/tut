// file: app/components/Navbar.tsx
import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const session = await auth()


  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex items-center justify-between'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={144}
            height={30}
          />
        </Link>
        <div className='flex items-center gap-4 text-black'>
          {session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>
            <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                {/* <form action={async()=>{'use server';signOut({ redirectTo: '/' })}}></form> */}
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  {/* <LogOut className="size-6 sm:hidden text-red-500" /> */}
                </button>
              </form>
              <Link href={`/user/${session.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => { 'use server'; await signIn("github") }}>
              <button type='submit'>Sign In</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
