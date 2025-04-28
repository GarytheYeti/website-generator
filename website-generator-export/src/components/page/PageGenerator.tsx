import React from 'react';
import { D1Database } from '@cloudflare/workers-types';

interface PageGeneratorProps {
  DB: D1Database;
}

interface PageData {
  websiteId: number;
  title: string;
  slug: string;
  layoutId: number;
  content: string; // JSON string of page content
  metaDescription?: string;
  isHomepage: boolean;
}

export async function saveGeneratedPage(
  DB: D1Database,
  pageData: PageData
): Promise<{ success: boolean; pageId?: number; error?: string }> {
  try {
    // Check if the page with this slug already exists for the website
    const existingPage = await DB.prepare(
      'SELECT id FROM pages WHERE website_id = ? AND slug = ?'
    )
      .bind(pageData.websiteId, pageData.slug)
      .first();
    
    if (existingPage) {
      // Update existing page
      await DB.prepare(`
        UPDATE pages 
        SET title = ?, layout_id = ?, content = ?, meta_description = ?, is_homepage = ?, updated_at = CURRENT_TIMESTAMP
        WHERE website_id = ? AND slug = ?
      `)
        .bind(
          pageData.title,
          pageData.layoutId,
          pageData.content,
          pageData.metaDescription || '',
          pageData.isHomepage ? 1 : 0,
          pageData.websiteId,
          pageData.slug
        )
        .run();
      
      return { success: true, pageId: existingPage.id as number };
    } else {
      // Insert new page
      const result = await DB.prepare(`
        INSERT INTO pages (website_id, title, slug, layout_id, content, meta_description, is_homepage)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
        .bind(
          pageData.websiteId,
          pageData.title,
          pageData.slug,
          pageData.layoutId,
          pageData.content,
          pageData.metaDescription || '',
          pageData.isHomepage ? 1 : 0
        )
        .run();
      
      return { success: true, pageId: result.meta.last_row_id as number };
    }
  } catch (error) {
    console.error('Error saving page:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function publishWebsite(
  DB: D1Database,
  websiteId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Update website status to published
    await DB.prepare(
      'UPDATE websites SET is_published = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    )
      .bind(websiteId)
      .run();
    
    return { success: true };
  } catch (error) {
    console.error('Error publishing website:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function generateWebsiteHTML(
  DB: D1Database,
  websiteId: number
): Promise<{ success: boolean; html?: string; error?: string }> {
  try {
    // Get website information
    const website = await DB.prepare(
      'SELECT * FROM websites WHERE id = ?'
    )
      .bind(websiteId)
      .first();
    
    if (!website) {
      return { success: false, error: 'Website not found' };
    }
    
    // Get theme information
    const theme = await DB.prepare(
      'SELECT * FROM themes WHERE id = ?'
    )
      .bind(website.theme_id)
      .first();
    
    if (!theme) {
      return { success: false, error: 'Theme not found' };
    }
    
    // Get all pages for the website
    const pages = await DB.prepare(
      'SELECT * FROM pages WHERE website_id = ? ORDER BY is_homepage DESC, title ASC'
    )
      .bind(websiteId)
      .all();
    
    if (!pages.results || pages.results.length === 0) {
      return { success: false, error: 'No pages found for this website' };
    }
    
    // Generate HTML for each page
    // This is a simplified version - in a real implementation, 
    // you would generate complete HTML files for each page
    const htmlOutput = {
      websiteName: website.name,
      domain: website.domain,
      theme: theme.name,
      cssVariables: JSON.parse(theme.css_variables as string),
      pages: await Promise.all(pages.results.map(async (page: any) => {
        // Get layout information
        const layout = await DB.prepare(
          'SELECT * FROM layouts WHERE id = ?'
        )
          .bind(page.layout_id)
          .first();
        
        return {
          title: page.title,
          slug: page.slug,
          isHomepage: Boolean(page.is_homepage),
          layout: layout ? layout.name : 'default',
          content: JSON.parse(page.content),
          metaDescription: page.meta_description
        };
      }))
    };
    
    return { 
      success: true, 
      html: JSON.stringify(htmlOutput, null, 2) // In a real app, this would be actual HTML
    };
  } catch (error) {
    console.error('Error generating website HTML:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default function PageGenerator({ DB }: PageGeneratorProps) {
  // This is a server component that would use the above functions
  // In a real implementation, this would be connected to API routes
  return null;
}
