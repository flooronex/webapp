export interface NavbarProps {
    className?: string;
    logo?: {
        icon?: React.ReactNode;
        text: string;
    };
    links: Array<{
        label: string;
        href: string;
    }>;
    actions?: {
        login?: {
            label: string;
            onClick?: () => void;
        };
        cta?: {
            label: string;
            onClick?: () => void;
            variant?: "secondary" | "default";
        };
    };
}

export interface NavLinkProps {
    label: string;
    href?: string;
    index?: number;
    className?: string;
}

export interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: Array<{ label: string; href: string }>;
    actions?: {
        login?: { label: string; onClick?: () => void };
        cta?: { label: string; onClick?: () => void };
    };
}
