"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, useAuth, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'
import { useStoreUser } from '@/hooks/use-store-user';
import { BarLoader } from 'react-spinners';
import { Building, Crown, Plus, Ticket } from 'lucide-react';
import { useOnboarding } from '@/hooks/use-onboarding';
import OnboardingModal from './onboarding-modal';
import SearchLocationBar from './search-location-bar';
import { Badge } from './ui/badge';
import UpgradeModal from './upgrade-modal'; // Restored safely

const Header = () => {

  const { isLoading } = useStoreUser();

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  const { has } = useAuth();
  const hasPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/spott.png"
              alt="Spott logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />

            {hasPro && (
              <Badge className="bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3">
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )}
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <SearchLocationBar />
          </div>

          <div className="flex items-center">

            {!hasPro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpgradeModal(true)}
              >
                Pricing
              </Button>
            )}

            <Button variant="ghost" size="sm" asChild className={"mr-2"}>
              <Link href="/explore">Explore</Link>
            </Button>

            <Authenticated>
              <Button
                size="sm"
                asChild
                className="mr-4 rounded-xl px-3 sm:px-4"
              >
                <Link
                  href="/create-event"
                  className="flex items-center justify-center sm:justify-start w-full"
                >
                  {/* ICON (always visible) */}
                  <Plus className="w-5 h-5" />

                  {/* TEXT (only desktop) */}
                  <span className="hidden sm:inline ml-2 font-semibold">
                    Create Event
                  </span>
                </Link>
              </Button>

              <UserButton>
                <UserButton.MenuItems>
                  {/* Fixed Warning: Uses native props inside UserButton.Link, no nested elements */}
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />

                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />

                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>

            </Authenticated>

            {/* 
              Fixed Sign-In Issue:
              The Unauthenticated block only lets this show if Convex confirms you are logged out.
              If you still can't sign in, please open an Incognito Tab to clear existing active sessions!
            */}
            <Unauthenticated>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        <div className="md:hidden border-t px-3 py-3">
          <SearchLocationBar />
        </div>

        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}

      </nav>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      {/* Render the UpgradeModal dynamically so clicking "Pricing" actually triggers it! */}
      {showUpgradeModal && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          trigger="header"
        />
      )}

    </>
  )
}

export default Header