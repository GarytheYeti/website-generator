# Website Generator Application Documentation

## Overview

The Website Generator Application is a web-based platform that allows freelance web developers to create and manage websites for various clients and industries. The application provides a selection of layouts and themes that clients can choose from to generate their websites. Administrators have full control over the code and can add features as needed, while clients have limited access to edit layouts and content.

## Features

- **Theme and Layout Selection**: Browse and select from a variety of themes and layouts
- **Page Generation**: Generate website pages based on selected themes and layouts
- **User Authentication**: Secure login and registration with role-based access control
- **Content Management**: Edit and manage website content with a user-friendly interface
- **Media Library**: Upload and manage media files for use in website content

## User Roles

### Administrator
- Full access to all features
- Can manage users and their roles
- Can create, edit, and delete themes and layouts
- Can modify generated code and add custom features
- Can manage all client websites

### Client
- Limited access based on permissions
- Can select themes and layouts for their websites
- Can edit content on their websites
- Can upload and manage their media files

## Getting Started

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/website-generator.git
   cd website-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

### Deployment

To deploy the application to production:

1. Build the application:
   ```
   npm run build
   ```

2. Deploy using Cloudflare Workers:
   ```
   wrangler deploy
   ```

## Administrator Guide

### Managing Users

1. Navigate to the Admin Dashboard
2. Select "User Management" from the sidebar
3. From here, you can:
   - View all users
   - Change user roles
   - Delete users
   - Invite new users

### Managing Themes and Layouts

1. Navigate to the Admin Dashboard
2. Select "Theme Manager" from the sidebar
3. From here, you can:
   - Create new themes
   - Edit existing themes
   - Delete themes
   - Set theme-layout compatibility
   - Preview themes

### Customizing Generated Code

After a website is generated, you can customize the code:

1. Navigate to the Admin Dashboard
2. Select "Websites" from the sidebar
3. Find the website you want to customize and click "Edit Code"
4. Make your changes in the code editor
5. Click "Save" to apply your changes

## Client Guide

### Creating a Website

1. Log in to your account
2. Click "Create New Website" on the dashboard
3. Follow the step-by-step process:
   - Select a theme
   - Choose a layout
   - Preview your selection
4. Click "Generate Website" to create your website

### Editing Content

1. Log in to your account
2. Select the website you want to edit from the dashboard
3. Click "Edit Content"
4. From the Content Manager:
   - Add new components
   - Edit existing components
   - Reorder components
   - Delete components
5. Click "Save Page" when you're done

### Using the Media Library

1. While editing content, click "Media Library"
2. From here, you can:
   - Upload new media files
   - Search for existing media
   - Select media to use in your content
   - Delete media files

## Troubleshooting

### Common Issues

- **Login Problems**: Make sure you're using the correct email and password. If you've forgotten your password, use the "Forgot Password" link on the login page.
- **Page Generation Errors**: If you encounter errors during page generation, try selecting a different theme or layout, or contact the administrator for assistance.
- **Content Not Saving**: Make sure you click the "Save" button after making changes to your content.

### Contact Support

If you encounter any issues that aren't covered in this documentation, please contact support at support@websitegenerator.com.

## Technical Details

### Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Cloudflare Workers, D1 Database
- **Authentication**: Custom authentication system with bcrypt for password hashing
- **Deployment**: Cloudflare Pages

### Database Schema

The application uses a D1 database with the following tables:

- `users`: Stores user information
- `user_roles`: Manages user roles and permissions
- `themes`: Stores theme information and styling
- `layouts`: Stores layout structures and compatibility
- `components`: Stores reusable components for pages
- `websites`: Stores website information and settings
- `pages`: Stores page content and structure

### API Endpoints

The application provides the following API endpoints:

- `/api/auth`: Authentication endpoints (login, register, logout)
- `/api/users`: User management endpoints
- `/api/themes`: Theme management endpoints
- `/api/layouts`: Layout management endpoints
- `/api/websites`: Website management endpoints
- `/api/pages`: Page management endpoints
- `/api/media`: Media management endpoints

## License

This project is licensed under the MIT License - see the LICENSE file for details.
