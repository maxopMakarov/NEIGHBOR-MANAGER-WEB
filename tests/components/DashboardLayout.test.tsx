import React from 'react';
import {it, expect, describe, vi, beforeEach} from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import DashboardLayout from '../../src/components/dashboard/DashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';
import { useLogout } from '../../src/hooks/useQueryRegister';

const queryClient = new QueryClient();

vi.mock('../../src/services/userApi', () => ({
    logoutUser: vi.fn(() => Promise.resolve()),
}));

vi.mock('@tanstack/react-router', () => ({
    useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock('../../src/hooks/useQueryRegister');


describe('DashoardLayout', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
        queryClient.clear();
    });
    it('should render layout', () => {
        vi.mocked(useLogout).mockReturnValue({
            mutate: vi.fn(),
            status: 'idle',
        } as any);

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardLayout>
                    <div>Test Child</div>
                </DashboardLayout>
            </QueryClientProvider>
        )
        const footer = screen.getByRole('footer');
        const header = screen.getByRole('header');
        const heading = screen.getByRole('heading');
        expect(footer).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });

    it('logout button should logout', async() => {
        const { useNavigate } = await import('@tanstack/react-router');
        const mockNavigate = vi.fn();
        vi.mocked(useNavigate).mockReturnValue(mockNavigate);

        vi.mocked(useLogout).mockReturnValue({
            mutate: vi.fn((_, { onSuccess }) => {
                onSuccess();
            }),
            status: 'idle',
        } as any);

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardLayout>
                    <div>Test Child</div>
                </DashboardLayout>
            </QueryClientProvider>
        )

        const logoutButton = screen.getByRole('logout-action');
        fireEvent.click(logoutButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/login' });
        });
    });

    it('peding icon state on logout', async() => {
        vi.mocked(useLogout).mockReturnValue({
            mutate: vi.fn(),
            status: 'pending',
        } as any);

        render(
            <QueryClientProvider client={queryClient}>
                <DashboardLayout>
                    <div>Test Child</div>
                </DashboardLayout>
            </QueryClientProvider>
        )

        const spinner = screen.getByTestId('pending-spinner');
        expect(spinner).toBeInTheDocument();
    });
})