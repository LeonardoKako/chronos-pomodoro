import React from 'react';
import { Link } from 'react-router';
type RouteLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

const RouteLink = ({ children, href, ...props }: RouteLinkProps) => {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};

export default RouteLink;
