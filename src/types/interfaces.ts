import { MouseEventHandler } from 'react';

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
};

interface SignUpProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
};

export {
  type HeaderProps,
  type SignUpProps,
}