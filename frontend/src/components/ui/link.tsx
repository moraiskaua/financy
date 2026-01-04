import { cn } from '@/utils/cn';
import { type AnchorHTMLAttributes, forwardRef } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';

type BaseLinkProps = {
  className?: string;
  children: React.ReactNode;
};

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & BaseLinkProps & {
  to?: never;
  href?: string;
};

type InternalLinkProps = Omit<RouterLinkProps, 'className'> & BaseLinkProps & {
  to: string;
  href?: never;
};

export type LinkProps = ExternalLinkProps | InternalLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    const baseStyles = cn(
      'text-brand-base transition-colors',
      'hover:underline',
      'focus:outline-none focus:ring-2 focus:ring-brand-base focus:ring-offset-2 rounded'
    );

    if ('to' in props) {
      const { to, ...routerProps } = props;
      return (
        <RouterLink
          to={to}
          className={cn(baseStyles, className)}
          {...routerProps}
        >
          {children}
        </RouterLink>
      );
    }

    const { href, ...anchorProps } = props as ExternalLinkProps;
    return (
      <a
        ref={ref}
        href={href}
        className={cn(baseStyles, className)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';

