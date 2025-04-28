# Website Generator Application

A web application that allows freelance web developers to create and manage websites for various clients and industries. Clients can select themes and layouts, while admins have full control over the code and can add custom features.

## Features

- **Theme and Layout Selection**: Browse and select from a variety of themes and layouts
- **Page Generation**: Generate website pages based on selected themes and layouts
- **User Authentication**: Secure login and registration with role-based access control
- **Content Management**: Edit and manage website content with a user-friendly interface
- **Media Library**: Upload and manage media files for use in website content

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/website-generator.git
   cd website-generator
   ```

2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```

3. Set up the database:
   ```
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   pnpm dev
   ```

5. Access the application at `http://localhost:3000`

## Deployment

To deploy the application to production:

1. Build the application:
   ```
   npm run build
   # or
   pnpm build
   ```

2. Deploy using Cloudflare Workers:
   ```
   wrangler deploy
   ```

## Project Structure

- `src/app/` - Next.js pages
  - `admin/` - Admin-only pages
  - `client/` - Client-facing pages
  - `auth/` - Authentication pages
- `src/components/` - Reusable components
  - `themes/` - Theme selection components
  - `layouts/` - Layout selection components
  - `content/` - Content management components
  - `page/` - Page generation components
  - `auth/` - Authentication components
- `migrations/` - Database migration files
- `public/` - Static assets

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

## Documentation

For more detailed information, please refer to:

- [General Documentation](documentation.md)
- [Admin Guide](admin-guide.md)
- [Client Guide](client-guide.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
