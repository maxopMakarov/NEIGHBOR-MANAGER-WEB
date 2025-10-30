import { createFileRoute, redirect } from '@tanstack/react-router'
import { getLoggedUser } from '../../services/userApi';

export const Route = createFileRoute('/dashboard/')({
    loader: async () => {
        const response = await getLoggedUser();
        if (response.status === 401) {
            throw redirect({to: '/login'});
        }

        const user = await response.json()
        return { user }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = Route.useLoaderData()

    return <div>Hello {user.name}</div>
}
