/**
 * @jest-environment jsdom
 */


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import {LoginForm} from "@/components/LoginForm";
import '@testing-library/jest-dom'
import { useRouter } from "next/navigation";


// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Mock signin action
jest.mock('../../../app/actions/auth/auth', () => ({
    signin: jest.fn(),
}));

// Mock useActionState
jest.mock('react', () => {
    const actual = jest.requireActual('react');
    return {
        ...actual,
        useActionState: jest.fn(),
    };
});

describe('LoginForm', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter).mockReturnValue({push : mockPush});
    });
    const useActionStateMock = require('react').useActionState;


    it('Renders correctly', () => {
        useActionStateMock.mockReturnValue([{}, jest.fn(), false]);
        render(<LoginForm />);
        expect(screen.getByText(/Acesse a sua conta/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
        expect(screen.getByText(/Não possui uma conta?/i)).toBeInTheDocument();
    });

    it('Shows email and password errors', async () => {
        const errorState = {
            errors: {
                email: 'Email inválido',
                password: ['Senha é obrigatória'],
            },
        };

        useActionStateMock.mockImplementation((fn) => [errorState, fn, false]);

        render(<LoginForm />);

        expect(await screen.findByText('Email inválido')).toBeInTheDocument();
        expect(await screen.findByText('Senha é obrigatória')).toBeInTheDocument();
    });

    it('Redirects when login is successful', async () => {
        const successState = { success: true };

        useActionStateMock.mockImplementation((fn) => [successState, fn, false]);

        render(<LoginForm />);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('Submits form with user input', async () => {
        const actionMock = jest.fn();
        useActionStateMock.mockReturnValue([{}, actionMock, false]);

        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/senha/i);
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

    });
});
