import SkillCard from '#/components/SkillCard'
import { createFileRoute, notFound, useRouter } from '@tanstack/react-router'
const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'
export const Route = createFileRoute('/')({ component: Home, 
  pendingComponent:() => (<div className='p-14 text-center'>Loading Pokemon....</div>),
  pendingMs:300,
  loader:async() => {
  const response = await fetch(POKE_API_URL)
  const data = await response.json()
  if (!response.ok || !data.results || data.results.length === 0){
    throw notFound()
  }
  console.log('loader data:', data)
  return data
},
  errorComponent: ({error}) => {
  const router = useRouter()
  return <div className='p-14'>
    <p>Oops! {error.message}</p>
    <button onClick={() => router.invalidate()}>
      Try again!
    </button>
  </div>
  },
  notFoundComponent: () => {
    return <div className='p-14'>Nothing found here!</div>
  }
 })

function Home() {
  const data = Route.useLoaderData()
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1>Hello World from Tanstack</h1>
      <ul className="mt-6 list-none p-0 space-y-5">
        {data.results.map((pokemon: {name:string}) => 
          <li key={pokemon.name}>
            <SkillCard name={pokemon.name}/>
          </li>
        )}
      </ul>
      {/* <ul className="mt-6 list-none p-0 space-y-5">
        <li>
          <SkillCard name='Tanstack Start'/>
        </li>
        <li>
          <SkillCard name='Typescript'/>
        </li>
        <li>
          <SkillCard name='MongoDB'/>
        </li>
      </ul> */}
    </main>
  )
}
