"use client"

import { usePathname } from "next/navigation";
import { User } from "../../types";
import Link from "next/link";

interface HeaderProps {
  user : User | null;
}

const Header = ({user}: HeaderProps) => {
  // Get the current URL path and define the app's navigation links.
  const pathname = usePathname();
  const user1 = false;
  const navigation = [
    {name:"Home",href:"/",show:true},
    {name:"Dashboard",href:"/dashboard",show:true}
  ].filter((item) => item.show);

  // Return active/inactive Tailwind classes based on the current pathname.
  const getNavItemClass = (href: string) => {
    let isActive = false;

    if (href === "/") {
      isActive = pathname === "/";
    } else if (href === "/dashboard") {
      isActive = pathname.startsWith(href);
    }

    return `px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-white">
            Team Access
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={getNavItemClass(item.href)}>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="felx items-center space-x-4">
            {user1 ? (
              <>
                <span className="test-sm text-slate-300">VBLuben</span>
                <button
                  // onClick = {}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg"
                >Logout</button>
              </>
            ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-white text-slate-800 hover:bg-slate-300 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Register
                 </Link>
               </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;