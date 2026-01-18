export interface BlogPost {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
  slug: string;
  formattedDate: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  items: BlogPost[];
}

export async function fetchRSSFeed(): Promise<RSSFeed> {
  try {
    const response = await fetch('https://blog.sarbeh.com/rss.xml');
    const xmlText = await response.text();
    
    // Parse XML using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Extract channel info
    const channel = xmlDoc.querySelector('channel');
    const channelTitle = channel?.querySelector('title')?.textContent || '';
    const channelDescription = channel?.querySelector('description')?.textContent || '';
    const channelLink = channel?.querySelector('link')?.textContent || '';
    
    // Extract items
    const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const guid = item.querySelector('guid')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      
      // Extract slug from link
      const urlParts = link.split('/');
      const slug = urlParts[urlParts.length - 2] || urlParts[urlParts.length - 1];
      
      // Format date
      const date = new Date(pubDate);
      const formattedDate = date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return {
        title,
        link,
        guid,
        description,
        pubDate,
        slug,
        formattedDate
      };
    });
    
    return {
      title: channelTitle,
      description: channelDescription,
      link: channelLink,
      items
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw new Error('Failed to fetch blog data');
  }
}

export function findPostBySlug(posts: BlogPost[], slug: string): BlogPost | null {
  return posts.find(post => post.slug === slug) || null;
} 