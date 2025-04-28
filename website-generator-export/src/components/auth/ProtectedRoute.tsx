import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'client';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isClient } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // Role-based access control
      if (requiredRole === 'admin' && !isAdmin) {
        router.push('/client/dashboard');
        return;
      }

      if (requiredRole === 'client' && !isClient && !isAdmin) {
        // Admin can access client pages, but not vice versa
        router.push('/auth/login');
        return;
      }
    }
  }, [user, loading, isAdmin, isClient, router, pathname, requiredRole]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authentication check is complete and user has access, render children
  if (!loading && user) {
    if (
      (requiredRole === 'admin' && isAdmin) ||
      (requiredRole === 'client' && (isClient || isAdmin)) ||
      !requiredRole
    ) {
      return <>{children}</>;
    }
  }

  // Default case: render nothing while redirecting
  return null;
}
