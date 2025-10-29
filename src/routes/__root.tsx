import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
    const queryClient = new QueryClient()
    return (
        <React.Fragment>
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </React.Fragment>
    )
}
