// Import Node's file-system functions.
import fs from 'fs';
// Import utilities for building file paths.
import path from 'path';
// Import the front matter parser.
import matter from 'gray-matter';
// Import the markdown processor.
import { remark } from 'remark';
// Import the markdown-to-HTML plugin.
import html from 'remark-html';

// Resolve the directory containing markdown posts.
const postsDirectory = path.join(process.cwd(), 'posts');

// Read post metadata and sort it by date.
export function getSortedPostsData() {
  // Get file names under /posts
  // Read every filename in the posts directory.
  const fileNames = fs.readdirSync(postsDirectory);
  // Convert each post file into metadata.
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    // Use the filename without its extension as the post id.
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    // Build the full path to the current post.
    const fullPath = path.join(postsDirectory, fileName);
    // Read the current post as UTF-8 text.
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    // Parse metadata and content from the file.
    const matterResult = matter(fileContents);

    // Combine the data with the id
    // Return the post id along with its metadata fields.
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  // Put newer dates before older dates.
  return allPostsData.sort((a, b) => {
    // Check whether the first post is older than the second.
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Return route parameters for all posts.
export function getAllPostIds() {
  // Read all post filenames.
  const fileNames = fs.readdirSync(postsDirectory);
  // Convert filenames into dynamic route parameters.
  return fileNames.map((fileName) => {
    return {
      params: {
        // Remove the extension to create the route id.
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Read one post and convert its markdown body to HTML.
export async function getPostData(id) {
  // Build the selected post's full file path.
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // Read the selected post as UTF-8 text.
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  // Separate front matter from markdown content.
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  // Process the markdown body with the HTML plugin.
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  // Convert the processed result into an HTML string.
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  // Return the id, HTML body, and metadata fields.
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}