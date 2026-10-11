import { getCurrentUser } from '@/lib/server/users'
import LoginForm from './LoginForm'
import { redirect } from 'next/navigation'


export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  return <LoginForm />
}