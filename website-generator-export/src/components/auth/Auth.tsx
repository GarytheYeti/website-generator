import { useState } from 'react';
import { D1Database } from '@cloudflare/workers-types';
import { hash, compare } from 'bcrypt';

interface AuthProps {
  DB: D1Database;
}

export async function registerUser(
  DB: D1Database,
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'client'
): Promise<{ success: boolean; userId?: number; error?: string }> {
  try {
    // Check if user already exists
    const existingUser = await DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    )
      .bind(email)
      .first();
    
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    // Hash the password
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);
    
    // Insert new user
    const result = await DB.prepare(`
      INSERT INTO users (email, password_hash, name, created_at, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `)
      .bind(email, passwordHash, name)
      .run();
    
    const userId = result.meta.last_row_id as number;
    
    // Assign role
    await DB.prepare(`
      INSERT INTO user_roles (user_id, role)
      VALUES (?, ?)
    `)
      .bind(userId, role)
      .run();
    
    return { success: true, userId };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function loginUser(
  DB: D1Database,
  email: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    // Get user by email
    const user = await DB.prepare(
      'SELECT id, email, password_hash, name FROM users WHERE email = ?'
    )
      .bind(email)
      .first();
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Verify password
    const passwordMatch = await compare(password, user.password_hash as string);
    
    if (!passwordMatch) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Get user roles
    const roles = await DB.prepare(
      'SELECT role FROM user_roles WHERE user_id = ?'
    )
      .bind(user.id)
      .all();
    
    const userRoles = roles.results.map((r: any) => r.role);
    
    // Return user data (excluding password hash)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: userRoles
    };
    
    return { success: true, user: userData };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getUserRoles(
  DB: D1Database,
  userId: number
): Promise<{ success: boolean; roles?: string[]; error?: string }> {
  try {
    const roles = await DB.prepare(
      'SELECT role FROM user_roles WHERE user_id = ?'
    )
      .bind(userId)
      .all();
    
    return { success: true, roles: roles.results.map((r: any) => r.role) };
  } catch (error) {
    console.error('Error getting user roles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function hasRole(
  DB: D1Database,
  userId: number,
  role: string
): Promise<boolean> {
  try {
    const result = await DB.prepare(
      'SELECT 1 FROM user_roles WHERE user_id = ? AND role = ?'
    )
      .bind(userId, role)
      .first();
    
    return Boolean(result);
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

export default function Auth({ DB }: AuthProps) {
  // This is a server component that would use the above functions
  // In a real implementation, this would be connected to API routes
  return null;
}
