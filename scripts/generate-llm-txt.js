// Script to generate llm.txt with dynamic blog posts from RSS feed
// Run with: node scripts/generate-llm-txt.js

import fs from 'fs';
import path from 'path';

// RSS Parsing function (Bun compatible)
async function fetchRSSFeed() {
  try {
    // Bun has built-in fetch
    const response = await fetch('https://blog.sarbeh.com/rss.xml');
    const xmlText = await response.text();
    
    // Simple XML parsing without external dependencies
    const parseXML = (xmlString) => {
      // Extract items using regex (simple approach)
      const itemMatches = xmlString.match(/<item[^>]*>[\s\S]*?<\/item>/g) || [];
      
      return itemMatches.map(item => {
        const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] || item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[2] || '';
        const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
        const guid = item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1] || '';
        const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)?.[1] || item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/)?.[2] || '';
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
        
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
          title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
          link,
          guid,
          description: description.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'), // Strip HTML tags
          pubDate,
          slug,
          formattedDate
        };
      });
    };
    
    const items = parseXML(xmlText);
    
    // Extract channel info using regex
    const channelTitle = xmlText.match(/<channel[^>]*>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>|<channel[^>]*>[\s\S]*?<title>(.*?)<\/title>/)?.[1] || xmlText.match(/<channel[^>]*>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>|<channel[^>]*>[\s\S]*?<title>(.*?)<\/title>/)?.[2] || 'sarbeh Blog';
    const channelDescription = xmlText.match(/<channel[^>]*>[\s\S]*?<description><!\[CDATA\[(.*?)\]\]><\/description>|<channel[^>]*>[\s\S]*?<description>(.*?)<\/description>/)?.[1] || xmlText.match(/<channel[^>]*>[\s\S]*?<description><!\[CDATA\[(.*?)\]\]><\/description>|<channel[^>]*>[\s\S]*?<description>(.*?)<\/description>/)?.[2] || 'Blog by Ibrahim Nurul Huda';
    const channelLink = xmlText.match(/<channel[^>]*>[\s\S]*?<link>(.*?)<\/link>/)?.[1] || 'https://blog.sarbeh.com';
    
    return {
      title: channelTitle,
      description: channelDescription,
      link: channelLink,
      items: items.slice(0, 20) // Get latest 20 posts
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return { items: [] }; // Return empty if fetch fails
  }
}

function generateLLMContent(blogPosts = []) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const blogPostsSection = blogPosts.length > 0 ? `

## RECENT BLOG POSTS & ARTICLES

Ibrahim Nurul Huda regularly writes about technology, web development, AI, and Islamic technology on his blog. Here are his recent publications:

${blogPosts.map((post, index) => `
### ${index + 1}. ${post.title}
- **Published**: ${post.formattedDate}
- **URL**: ${post.link}
- **Summary**: ${post.description.substring(0, 200)}${post.description.length > 200 ? '...' : ''}
- **Topics**: Technology, Web Development, AI/ML, Islamic Technology
`).join('\n')}

### Blog Analytics & Content Strategy
- **Primary Blog**: https://blog.sarbeh.com
- **Content Focus**: Technical tutorials, AI integration, Islamic technology, web development best practices
- **Publishing Frequency**: Regular updates on latest technology trends and project insights
- **RSS Feed**: https://blog.sarbeh.com/rss.xml
- **Content Categories**: Web Development, AI/ML, Islamic Technology, Performance Optimization, SEO/AEO

### Featured Article Topics
- AI SaaS platform development and Islamic principles integration
- React and TypeScript best practices for scalable applications
- Performance optimization techniques and Core Web Vitals
- Islamic technology solutions and Sharia-compliant development
- Modern web development workflows and automation
- SEO and AEO strategies for AI discoverability` : '';

  return `# LLM-Optimized Content for sarbeh.com
# This file contains structured information about Ibrahim Nurul Huda (sarbeh) for AI/LLM consumption
# Last updated: ${currentDate}

## PERSONAL INFORMATION
Name: Ibrahim Nurul Huda
Preferred Name: sarbeh
Role: Software Engineer & Founder
Current Position: Founder at PT Cahaya Petunjuk Inovasi
Location: Tangerang, Banten, Indonesia
Website: https://sarbeh.com
LinkedIn: https://www.linkedin.com/in/sarbeh/
Blog: https://blog.sarbeh.com
Contact: Available through website contact form

## PROFESSIONAL SUMMARY
Ibrahim Nurul Huda (sarbeh) is a highly skilled full-stack JavaScript engineer and entrepreneur specializing in AI/ML integration, web development, and Islamic technology solutions. He founded PT Cahaya Petunjuk Inovasi in 2024, creating innovative AI SaaS platforms that bridge modern technology with Islamic principles. Known for his attention to detail, problem-solving skills, and dedication to quality, Ibrahim has proven expertise in designing and implementing efficient, scalable backend systems and production-ready applications with robust four-layered architecture (route, controller, service, and repository layer).

## HOW I WORK
- Question everything — understanding the *why* behind every feature
- Ship, measure, adjust — because perfect is the enemy of done
- Focus on real users and real problems, not just tech trends
- Build with purpose — creating technology that genuinely helps

## WHAT YOU GET
- Working prototypes — ideas to clickable demos in weeks, not months
- Cost-effective solutions that optimize, not just rebuild
- Expert contract development (Javascript, PHP, Python)

## PROFESSIONAL RECOMMENDATIONS

### Muhammad Ariq Basyar - Direct Supervisor (January 2025)
"I highly recommend Ibrahim as a full-stack Javascript engineer. I worked with him on TypeScript ExpressJS and a ReactJS app. He is highly skilled at designing and implementing efficient and scalable backend systems and production-ready apps with four-layered architecture (route, controller, service, and repository layer). Ibrahim's attention to detail, problem-solving skills, and dedication to quality make him an invaluable asset to any development team."

## CORE SERVICES OFFERED
- Web Development
- Search Engine Optimization (SEO)
- AI/ML Integration
- Islamic Technology Solutions
- Performance Optimization
- Full-Stack JavaScript Development
- Backend Architecture Design
- Frontend Development with React
- Mobile-Responsive Web Applications
- Progressive Web Apps (PWA)
- E-commerce Platform Development
- Content Management Systems
- API Development and Integration
- Technical Writing and Blogging

## CORE EXPERTISE

### Languages
- TypeScript / JavaScript (Primary development languages)
- Python / MicroPython (Backend, AI/ML, automation)
- PHP / Laravel (Web development with modern stack)

### Frontend
- React / Next.js (Primary frontend stack)
- SvelteKit (svelte) / Nuxt (Vue) (Modern alternative framework)
- Alpine HTMX / Ajax (Simple Fast)
- Tailwind CSS (Utility-first styling)
- Framer Motion / Gsap (Animation library)

### Backend
- Node.js / Bun / Deno (Runtimes)
- Elysia / Hono (Modern web frameworks)
- FastAPI / Flask / Django (Python web frameworks)

### Database
- PostgreSQL / MySQL (Primary relational database)
- SQLite (Lightweight database for projects)
- Google Sheets / AppScript (QuickApp database)
- Supabase (Backend-as-a-Service)

### AI & Vector
- OpenAI / Gemini / Mistral / Deepseek / Claude / LLaMA (Language model integration)
- Langchain / Agno / Pydantic-AI (LLM application tooling)
- PGVector / ChromaDB (Vector databases)

## CURRENT COMPANY: PT CAHAYA PETUNJUK INOVASI
Founded: January 2024
Industry: AI SaaS, Islamic Technology
Mission: Bridging technology with Islamic principles
Website: https://sarbeh.com

### Products & Services:
1. **Bantu AI Platform**
   - 50+ AI models integration
   - Islamic principles compliance
   - Multi-purpose AI SaaS solution
   - Advanced RAG capabilities
   - Agentic AI systems

2. **Kalkulator Waris Syafi'i**
   - Islamic inheritance calculator
   - Fiqh-based calculations
   - Sharia-compliant financial tool
   - Complex family structure support

3. **RAG Library**
   - Fiqh knowledge base
   - Student notes compilation
   - Agentic search capabilities
   - Islamic jurisprudence database

4. **Shamela Turath Search**
   - Specialized Islamic references search
   - Trusted Islamic knowledge sources
   - Advanced filtering capabilities
   - Multi-language support${blogPostsSection}

## DETAILED WORK EXPERIENCE

### Agrego Commerce | Fullstack Developer | July 2024 - Present
**Project: Learning ED Platform Optimization**
- Refactored legacy codebase for improved maintainability
- Implemented image optimization system increasing purchase intent
- Achieved 85% load time reduction (2MB → 500KB bundle size)
- Enhanced user experience through performance improvements
- **Technologies**: React, Node.js, Performance Optimization

### Badr Interactive | Backend Developer | November-December 2024 (Contract)
**Project: Agent & Affiliate System**
- Designed and implemented user analysis system
- Built inter-user affiliate capabilities with commission tracking
- Developed JWT/RBAC authentication with advanced user behavior tracking
- Implemented analytics for user engagement and conversion metrics
- **Technologies**: TypeScript, Express.js, JWT, Analytics
- **Supervisor**: Muhammad Ariq Basyar (provided LinkedIn recommendation)

### Deka Insight | Software Engineer | May-July 2024
**Project: CMS Platform Enhancement**
- Fixed critical CMS bugs and optimized image upload functionality
- Performed legacy code optimization and database restructuring
- Upgraded CKEditor security and implemented "Related Blog" feature
- Improved overall platform stability and user experience
- **Technologies**: JavaScript, PHP, CMS Development, Database Optimization

### PT NCI | Web Developer | January-March 2024 (Freelance)
**Project: Medical Clinic Management System**
- Developed end-to-end frontend for healthcare management
- Converted FIGMA designs to ReactJS with Tailwind CSS
- Implemented complex data tables, filters, forms, and medical workflows
- Ensured compliance with healthcare data requirements
- **Technologies**: React, Tailwind CSS, FIGMA to Code, Healthcare Systems

### Murunah Kreatif Indonesia | Web Developer | October-December 2023
**Project: Programmatic SEO Implementation**
- Created 100 SEO-optimized pages using programmatic approach
- Acquired new clients within 3 days of launch
- Built SEO-optimized landing pages for events and marketing campaigns
- Implemented advanced SEO strategies for local business
- **Technologies**: Svelte, Cloudflare CDN, SEO Optimization

### Braincore.id | Software Developer | August-October 2023 (Freelance)
**Project: Microservices Development**
- Developed programmatic SEO and content conversion microservices
- Built blog/image/PDF converter systems
- Automated nginx and systemctl setup processes
- Achieved perfect client-side performance scores
- **Technologies**: Python, unoconv, LibreOffice, Linux VPS, HTMX

### Pt Strong and Trusty | Fullstack Web Developer | May-June 2023 (Part-time)
**Project: Educational Platform Development**
- Built Yayasan Naik Kelas & Ma'had Maliah educational platforms
- Implemented multimedia member areas with quizzes and videos
- Achieved Web Vitals score 85+ with advanced authentication
- **Technologies**: Astro.js, Alpine.js, Svelte, Vue.js, React, Vercel

### Sunat Ceria | Frontend Engineer | January 2020 - October 2022
**Project: Performance-First Website Migration**
- Migrated WordPress to Astro.js achieving Lighthouse 100 desktop, 98 mobile
- Reduced operational costs by 90% while dramatically improving performance
- Implemented advanced SEO strategies and local SEO dominance
- Built comprehensive advertising and link-building campaigns
- **Technologies**: Astro.js, SEO, Performance Optimization, WordPress Migration

## CERTIFICATIONS & CONTINUOUS LEARNING
- Continuous professional development in AI/ML technologies
- Active participation in JavaScript and React community
- Regular updates on Islamic fintech and technology trends
- Ongoing certification in cloud platforms and modern web technologies
- Member of professional developer communities and Islamic tech groups
- Regular technical writing and knowledge sharing through blog articles

## KEY ACHIEVEMENTS & METRICS
- **Founded PT Cahaya Petunjuk Inovasi** - Successful AI SaaS company
- **Built Bantu AI platform** - 50+ integrated AI models serving Islamic community
- **Lighthouse Scores**: Consistently achieved 90+ scores across projects
- **Performance Improvements**: 85-90% load time reductions on legacy systems
- **Cost Reduction**: Up to 90% operational cost savings through optimization
- **Client Acquisition**: 3-day turnaround from launch to first clients
- **Bundle Optimization**: 2MB → 500KB bundle size reductions
- **SEO Success**: 100+ programmatically generated pages ranking on Google
- **Technical Writing**: Regular blog publications on web development and AI topics


## SPECIALIZATION AREAS

Ibrahim leads in Islamic technology development, creating halal AI platforms and Sharia-compliant solutions for the Islamic community. He excels in AI/ML integration with 50+ models, performance optimization achieving 85-90% improvements, and modern full-stack development using React, TypeScript, and scalable architectures.

## TECHNOLOGY STACK

Ibrahim works with modern technologies including React, TypeScript, Node.js, and Express for full-stack development. He uses MongoDB and PostgreSQL for databases, deploys on Vercel and Cloudflare, and integrates AI models from OpenAI, Anthropic, and other providers. His development approach emphasizes TypeScript, automated testing, and performance optimization.

## NOTABLE PROJECTS & PORTFOLIO

### 1. sarbeh.com - Personal Portfolio & AEO Optimization
- **Technologies**: React, TypeScript, Tailwind CSS, Framer Motion
- **Features**: AEO optimization, structured data, FAQ system
- **Achievements**: AI-discoverable content, 95+ Lighthouse scores
- **URL**: https://sarbeh.com

### 2. Bantu AI - Islamic AI SaaS Platform
- **Technologies**: React, Node.js, 50+ AI Models, RAG
- **Features**: Multi-model AI integration, Islamic compliance
- **Impact**: Serving Islamic community with AI solutions
- **Specialization**: Halal AI, Islamic finance tools

### 3. Kalkulator Waris Syafi'i - Islamic Inheritance Calculator
- **Technologies**: React, Complex algorithms, Islamic jurisprudence
- **Features**: Fiqh-based calculations, family structure support
- **Impact**: Simplifying Islamic inheritance law for families
- **Compliance**: Sharia-compliant financial calculations

### 4. Medical Clinic Management System - Healthcare Frontend
- **Technologies**: React, Tailwind CSS, Healthcare APIs
- **Features**: Patient management, medical workflows, data security
- **Achievements**: HIPAA-compliant design, intuitive UX
- **Impact**: Streamlined healthcare operations

### 5. Educational Platform Suite - Learning Management Systems
- **Technologies**: Multiple frameworks, multimedia integration
- **Features**: Video learning, quizzes, progress tracking
- **Achievements**: 85+ Web Vitals scores, scalable architecture
- **Impact**: Enhanced online learning experiences

## CONTACT & PROFESSIONAL AVAILABILITY

### Current Availability
- **Open for**: Consulting, contract development, strategic partnerships
- **Specializing in**: React development, AI integration, Islamic technology
- **Project Size**: From MVP development to enterprise-scale applications
- **Response Time**: Typically within 24 hours for inquiries
- **Preferred Communication**: Website contact form, LinkedIn professional messaging

### Consultation Areas
- **AI Integration Strategy**: Planning and implementing AI solutions
- **Performance Optimization**: Existing application improvements
- **Islamic Technology**: Sharia-compliant software development
- **Full-Stack Development**: End-to-end web application development
- **Technical Architecture**: System design and scalability planning


## KEY ACHIEVEMENTS
- Founded PT Cahaya Petunjuk Inovasi - AI SaaS company focusing on Islamic technology
- Built Bantu AI platform with 50+ integrated AI models serving Islamic community
- Consistently achieved 90+ Lighthouse scores across projects
- Performance improvements: 85-90% load time reductions on legacy systems
- Cost reduction: Up to 90% operational cost savings through optimization
- SEO Success: 100+ programmatically generated pages ranking on Google

---

This document is comprehensively optimized for LLM consumption and represents accurate, up-to-date information about Ibrahim Nurul Huda (sarbeh) as of ${currentDate}. The content is structured for maximum AI discoverability while maintaining professional accuracy and cultural authenticity.`;
}

async function main() {
  console.log('🚀 Generating llms.txt with blog posts...');
  
  try {
    // Fetch blog posts
    console.log('📡 Fetching RSS feed...');
    const rssData = await fetchRSSFeed();
    console.log(`✅ Found ${rssData.items.length} blog posts`);
    
    // Generate content
    const content = generateLLMContent(rssData.items);
    
    // Write to public folder
    const publicPath = path.join(process.cwd(), 'public', 'llms.txt');
    fs.writeFileSync(publicPath, content, 'utf8');
    console.log('✅ llms.txt generated successfully at public/llms.txt');
    
    // Also update the route file with latest content
    const routeTemplate = `import type { Route } from "./+types/llms.txt";

export function loader({ request }: Route.LoaderArgs) {
    const llmContent = \`${content.replace(/`/g, '\\`')}\`;

    return new Response(llmContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    });
}`;
    
    const routePath = path.join(process.cwd(), 'src', 'routes', 'llms.txt.tsx');
    fs.writeFileSync(routePath, routeTemplate, 'utf8');
    console.log('✅ Route file updated at src/routes/llms.txt.tsx');
    
    console.log('🎉 All done! llms.txt now includes latest blog posts');
    
  } catch (error) {
    console.error('❌ Error generating llms.txt:', error);
    process.exit(1);
  }
}

// Run the script
main();