import { useRouter } from 'next/router'
import { useStore } from 'util/store'
import { createClient } from 'util/supabase/component'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

const Signup = () => {
  const router = useRouter()
  const supabase = createClient()
  const setNotification = useStore((state) => state.setNotification)

  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required('Email is required'),
        password: y.string().required('Password is required'),
      })
    ),
    onSubmit: async (data) => {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/confirm`
        }
      })
      if (error) {
        console.log(error)
        setNotification({
          type: 'error',
          text: error.message,
          duration: 2000,
        })
        return
      }

      if (authData.user) {
        console.log('Signup successful, user data:', authData.user)
        console.log('Email confirmation details:', authData.user.confirmation_sent_at, authData.user.email_confirmed_at)
        
        setNotification({
          type: 'success',
          text: 'Signup successful! Please check your email for confirmation.',
          duration: 3000,
        })
        
        // Only redirect if email is already confirmed (unlikely for new signups)
        if (authData.user.email_confirmed_at) {
          router.push('/dashboard')
        } else {
          // Stay on signup page with a message about checking email
          setNotification({
            type: 'info',
            text: 'Please check your email and click the confirmation link before continuing.',
            duration: 5000,
          })
        }
      }
    },
    showErrorNotification: true
  })

  return (
    <main>
      <h2>Sign up</h2>
      <Form methods={methods}>
        <TextInput type='email' name='email' placeholder='email@example.com' />
        <TextInput
          name='password'
          type='password'
          placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
        />
        <SubmitButton>Sign up</SubmitButton>
      </Form>
    </main>
  )
}

Signup.Layouts = ['BaseLayout']
export default Signup
