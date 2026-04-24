import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/hello')({
  server:{
    handlers:{
    //   GET: async() => {
    //     console.log('Someone is hitting our public API')
    //     return Response.json({message:`Hello World!`}, {headers:{'Cache-Control':"public, s-max-age=60", "Access-Control-Allow-Origin":"*"}})
    // },
    POST: async({request}) => {
      console.log('Someone is hitting our public API')
      const body = await request.json()
      return Response.json({message:`Hello World! ${body.name}`}, {headers:{'Cache-Control':"public, s-max-age=60", "Access-Control-Allow-Origin":"*"}})
  }}
  },
  component:HelloComponent
})

function HelloComponent(){
  const [reply, setReply] = useState('')
  const handleHello = async () => {
    const response = await fetch('/hello', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:'TanStacker'}),
    })
    const data = await response.json()
    setReply(data.message)
  }
  return <main className='p-10'>
    <button 
    className='bg-blue-500 text-white p-2 rounded'
    onClick={handleHello}>Say Hello {reply && `- ${reply}`}</button>
  </main>
}
