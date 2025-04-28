# Admin Guide for Website Generator Application

## Introduction

This guide is intended for administrators of the Website Generator Application. As an administrator, you have full access to all features of the application, including user management, theme and layout creation, and website customization.

## Getting Started

### Accessing the Admin Dashboard

1. Navigate to the login page at `/auth/login`
2. Enter your admin credentials
3. You will be automatically redirected to the admin dashboard

### Admin Dashboard Overview

The admin dashboard provides access to all administrative functions:

- **User Management**: Manage users and their roles
- **Theme Manager**: Create and manage themes
- **Layout Manager**: Create and manage layouts
- **Website Overview**: View and manage all client websites
- **System Settings**: Configure application settings

## User Management

### Viewing Users

1. Navigate to **Admin Dashboard > User Management**
2. You will see a list of all users with their details:
   - Name
   - Email
   - Role
   - Creation date

### Managing User Roles

1. Navigate to **Admin Dashboard > User Management**
2. Find the user whose role you want to change
3. Use the role dropdown to change their role
4. Changes are saved automatically

### Deleting Users

1. Navigate to **Admin Dashboard > User Management**
2. Find the user you want to delete
3. Click the "Delete" button
4. Confirm the deletion when prompted

### Inviting New Users

1. Navigate to **Admin Dashboard > User Management**
2. Click the "Invite New User" button
3. Enter the user's email address
4. Select the role for the new user
5. Click "Send Invitation"
6. The user will receive an email with instructions to set up their account

## Theme Management

### Creating a New Theme

1. Navigate to **Admin Dashboard > Theme Manager**
2. Click the "Add New Theme" button
3. Fill in the theme details:
   - Name
   - Description
   - Preview image URL
4. Define CSS variables for the theme
5. Click "Save" to create the theme

### Editing Themes

1. Navigate to **Admin Dashboard > Theme Manager**
2. Find the theme you want to edit
3. Click the "Edit" button
4. Make your changes to the theme details
5. Click "Save" to update the theme

### Deleting Themes

1. Navigate to **Admin Dashboard > Theme Manager**
2. Find the theme you want to delete
3. Click the "Delete" button
4. Confirm the deletion when prompted

## Layout Management

### Creating a New Layout

1. Navigate to **Admin Dashboard > Theme Manager** (Layouts tab)
2. Click the "Add New Layout" button
3. Fill in the layout details:
   - Name
   - Description
   - Preview image URL
4. Define the HTML structure and CSS classes
5. Select compatible themes
6. Click "Save" to create the layout

### Editing Layouts

1. Navigate to **Admin Dashboard > Theme Manager** (Layouts tab)
2. Find the layout you want to edit
3. Click the "Edit" button
4. Make your changes to the layout details
5. Click "Save" to update the layout

### Deleting Layouts

1. Navigate to **Admin Dashboard > Theme Manager** (Layouts tab)
2. Find the layout you want to delete
3. Click the "Delete" button
4. Confirm the deletion when prompted

## Website Management

### Viewing Client Websites

1. Navigate to **Admin Dashboard > Website Overview**
2. You will see a list of all client websites with their details:
   - Name
   - Owner
   - Theme
   - Creation date
   - Publication status

### Editing Client Websites

1. Navigate to **Admin Dashboard > Website Overview**
2. Find the website you want to edit
3. Click the "Edit" button
4. You will be taken to the website editor where you can:
   - Change the theme and layout
   - Edit content
   - Add custom code
   - Manage pages

### Publishing Websites

1. Navigate to **Admin Dashboard > Website Overview**
2. Find the website you want to publish
3. Click the "Publish" button
4. The website will be published and made available to the public

## Advanced Customization

### Adding Custom Code

1. Navigate to **Admin Dashboard > Website Overview**
2. Find the website you want to customize
3. Click the "Edit Code" button
4. You will be taken to the code editor where you can:
   - Add custom HTML, CSS, and JavaScript
   - Modify the generated code
   - Add new features and functionality

### Creating Custom Components

1. Navigate to **Admin Dashboard > Component Library**
2. Click the "Create New Component" button
3. Define the component:
   - Name
   - Description
   - HTML structure
   - CSS classes
   - JavaScript functionality
4. Click "Save" to add the component to the library

## Troubleshooting

### Common Issues

- **Database Connection Issues**: Check the database configuration in `wrangler.toml`
- **User Role Problems**: Ensure user roles are correctly assigned in the database
- **Theme Rendering Issues**: Verify CSS variables and HTML structure

### Accessing Logs

1. Navigate to **Admin Dashboard > System Settings > Logs**
2. You can view:
   - Error logs
   - Access logs
   - System logs

### System Maintenance

1. Navigate to **Admin Dashboard > System Settings > Maintenance**
2. You can:
   - Backup the database
   - Restore from backup
   - Clear cache
   - Update system settings

## Best Practices

- Regularly backup the database
- Test new themes and layouts before making them available to clients
- Monitor system logs for errors
- Keep the application updated with the latest security patches
- Document custom code and features for future reference

## Support

If you encounter any issues that you cannot resolve, please contact the development team at dev@websitegenerator.com.
