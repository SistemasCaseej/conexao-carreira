/**
 * @jest-environment jsdom
 */


import {fireEvent, render, screen} from "@testing-library/react";
import NavUser from "@/components/NavUser";
import '@testing-library/jest-dom'


jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
    }),
}));

jest.mock('/src/components/ui/sidebar', () => ({
    __esModule: true,
    SidebarMenu: (props) => <div data-testid="SidebarMenu" {...props} />,
    SidebarMenuItem: (props) => <div data-testid="SidebarMenuItem" {...props} />,
    SidebarMenuButton: (props) => <button data-testid="SidebarMenuButton" {...props} />,
    useSidebar: () => ({ isMobile: false }),
}));

describe('NavUser Component', ()=> {
    const pushMock = jest.fn();

    const user2 = {
        avatar: 'https://example.com/avatar.png',
        name: 'Test Avatar',
    };

    const user = {
        name: 'José Vitor',
        email: 'jose@example.com',
    };

    it('Renders user name and email correctly', () => {
        render(<NavUser user2={user2} user={user} />);

        expect(screen.getByText('José Vitor')).toBeInTheDocument();
        expect(screen.getByText('jose@example.com')).toBeInTheDocument();
    });

    it('Renders dropdown trigger and responds to click', async () => {
        render(<NavUser user={user} user2={user2} />);

        const triggerButton = screen.getByTestId('SidebarMenuButton');
        fireEvent.click(triggerButton);
    });

    it('Matches Snapshot', () => {
        const { container } = render(<NavUser user={user} user2={user2} />);
        expect(container).toMatchSnapshot();
    });
})