'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'

const RegisterPage = () => {
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <form>
        <div className="space-y-2 w-full col-span-2">
          <h1 className="text-5xl font-extrabold">Register</h1>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* <FormField name="name" control={} /> */}
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
