'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { ROUTES, APP_CONFIG } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { useSignOutMutation } from '@/hooks/queries/useAuthMutations';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, getDisplayName, getInitials, getPhotoUrl } =
    useAuth();
  const { mutateAsync: signOut, isPending: isSigningOut } =
    useSignOutMutation();

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      // Error will be shown by mutation error handling
      // Silent fail - mutation handles error display
    }
  };

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link href={ROUTES.HOME} className="flex items-center space-x-3">
          {/* <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg"> */}
          <Image
            src="/assets/icon/logo.png"
            alt="IKA TE UPI Logo"
            width={40}
            height={40}
          />
          {/* </div> */}
          <div className="hidden sm:block">
            <div className="text-foreground text-lg font-bold">
              {APP_CONFIG.name}
            </div>
            <div className="text-muted-foreground text-xs">
              {APP_CONFIG.fullName}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {MAIN_NAVIGATION.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <NavigationMenuItem key={item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger
                        className={`relative h-10 ${
                          isActive
                            ? 'text-primary after:bg-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:content-[""]'
                            : ''
                        }`}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[100px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <NavigationMenuLink key={child.href} asChild>
                              <Link
                                href={child.href}
                                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                              >
                                <div className="text-sm leading-none font-medium">
                                  {child.title}
                                </div>
                                {child.description && (
                                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={`group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActive
                            ? 'text-primary after:bg-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:content-[""]'
                            : ''
                        }`}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side - Auth and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            /* Authenticated User Menu */
            <div className="hidden sm:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={getPhotoUrl() || undefined}
                        alt={getDisplayName()}
                      />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {getDisplayName()}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? 'Logging out...' : 'Log out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Unauthenticated User Buttons */
            <div className="hidden sm:flex">
              <Button asChild>
                <Link href={ROUTES.LOGIN}>Join Alumni</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background border-t lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {MAIN_NAVIGATION.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <div key={item.href}>
                    {item.children ? (
                      <div className="space-y-2">
                        <h3
                          className={`font-medium ${
                            isActive ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <div className="ml-4 space-y-2">
                          {item.children.map((child) => {
                            const isChildActive = isActiveRoute(child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block text-sm ${
                                  isChildActive
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block font-medium ${
                          isActive
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Mobile Auth Buttons */}
              <div className="space-y-2 border-t pt-4 sm:hidden">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-2 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={getPhotoUrl() || undefined}
                          alt={getDisplayName()}
                        />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">
                          {getDisplayName()}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      disabled={isSigningOut}
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {isSigningOut ? 'Logging out...' : 'Log out'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={ROUTES.LOGIN}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link
                        href={ROUTES.REGISTER}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Join Alumni
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
