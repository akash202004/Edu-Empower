import { useEffect } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Crowd Funding", path: "/crowdfunding", authRequired: true },
  { name: "Scholarship", path: "/scholarship", authRequired: true },
  { name: "Donation", path: "/donation", authRequired: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect to /student only if user logs in while on the homepage
  useEffect(() => {
    if (isSignedIn && window.location.pathname === "/") {
      navigate("/student");
    }
  }, [isSignedIn, navigate]);

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:outline-none">
                  <Bars3Icon aria-hidden="true" className={`${open ? "hidden" : "block"} size-6`} />
                  <XMarkIcon aria-hidden="true" className={`${open ? "block" : "hidden"} size-6`} />
                </DisclosureButton>
              </div>

              {/* Logo & Navigation Links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <h1 className="text-black text-lg font-bold">Edu-Empower</h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          if (item.authRequired && !isSignedIn) {
                            navigate("/sign-in"); // Redirect to Sign-in if not logged in
                          } else {
                            navigate(item.path);
                          }
                        }}
                        className={classNames(
                          "rounded-md px-3 py-2 text-sm font-medium",
                          "text-black hover:bg-gray-200"
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Authentication Buttons */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                <SignedOut>
                  <div className="flex space-x-3">
                    <SignInButton mode="modal" redirectUrl="/student">
                      <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Login as Student
                      </button>
                    </SignInButton>

                    <SignInButton mode="modal" redirectUrl="/student">
                      <button className="bg-green-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Login as Organization
                      </button>
                    </SignInButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.authRequired && !isSignedIn) {
                      navigate("/sign-in"); // Redirect to Sign-in if not logged in
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
