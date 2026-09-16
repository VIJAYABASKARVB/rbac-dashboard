import React from 'react'
import Link from 'next/link'

const Home = async () => {

  const user = false;

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-white'>
        Team Access Control
      </h1>
      <p className='text-slate-300 mb-8'>
        RBAC-Role based access control dashboard
      </p>
      <div className='grid md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-slate-800 p-6 border border-slate-700 rounded-l-lg'>
          <h3 className="font-semibold mb-3 text-white">
            Feature Demonstration
          </h3>

          <ul className="list-disc list-inside space-y-1 text-sm text-slate-500">
            <li>Role-based access control (RBAC)</li>
            <li>Route protection middleware</li>
            <li>Server-side permission checks</li>
            <li>Client-side permission hooks</li>
            <li>Dynamic route access</li>
          </ul>
        </div>

        <div className="bg-slate-800 p-6 border border-slate-700 rounded-lg">
          <h3 className="font-bold mb-3 text-white">
            Users Roles
          </h3>

          <ul className="space-y-1 text-sm text-slate-300">
            <li>
              <strong>Super Admin:</strong> Full system access
            </li>
            <li>
              <strong>Admin:</strong> User & team management
            </li>
            <li>
              <strong>Manager:</strong> Team specific management
            </li>
            <li>
              <strong>User:</strong> Basic Dashboard
            </li>
          </ul>
        </div>
      </div>
      {user ? (
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="bg-white text-slate-800 hover:bg-slate-300 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
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
        </div>
      )}
    </div>
  )
}

export default Home