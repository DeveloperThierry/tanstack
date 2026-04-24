import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$username/skills/$skillId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {skillId, username} = Route.useParams()
  return <p>{username}'s skill: {skillId}</p>
}
