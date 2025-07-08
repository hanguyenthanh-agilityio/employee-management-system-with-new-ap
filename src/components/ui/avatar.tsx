'use client';

import React from 'react';

import {
  Root as AvatarRoot,
  Image as RadixAvatarImage,
  Fallback as RadixAvatarFallback,
} from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarRoot>,
  React.ComponentPropsWithoutRef<typeof AvatarRoot>
>(({ className, ...props }, ref) => (
  <AvatarRoot
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarRoot.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatarImage>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarImage>
>(({ className, ...props }, ref) => (
  <RadixAvatarImage
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = RadixAvatarImage.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatarFallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatarFallback>
>(({ className, ...props }, ref) => (
  <RadixAvatarFallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = RadixAvatarFallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
