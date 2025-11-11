import React from 'react';
import {it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '../../src/components/dashboard/DashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';

const queryClient = new QueryClient();


describe('DashoardLayout', () => {
    it('should render layout', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <DashboardLayout>
                    <div>Test Child</div>
                </DashboardLayout>
            </QueryClientProvider>
        )

        const heading = screen.getByRole('footer');
        expect(heading).toBeInTheDocument();
    })
})