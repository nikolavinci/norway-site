'use server';

import fs from 'fs';
import path from 'path';

export async function getLocalMedia() {
  const mediaDir = path.join(process.cwd(), 'public/images');
  let files: { name: string, url: string, bucket: string, created_at: string }[] = [];
  
  if (fs.existsSync(mediaDir)) {
    const list = fs.readdirSync(mediaDir);
    for (const item of list) {
      const itemPath = path.join(mediaDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isFile() && /\.(png|jpe?g|gif|webp|svg)$/i.test(item)) {
        files.push({
          name: item,
          url: `/images/${item}`,
          bucket: 'local',
          created_at: stat.mtime.toISOString(),
        });
      } else if (stat.isDirectory()) {
        const subList = fs.readdirSync(itemPath);
        for (const subItem of subList) {
          const subItemPath = path.join(itemPath, subItem);
          const subStat = fs.statSync(subItemPath);
          if (subStat.isFile() && /\.(png|jpe?g|gif|webp|svg)$/i.test(subItem)) {
            files.push({
              name: `${item}/${subItem}`,
              url: `/images/${item}/${subItem}`,
              bucket: 'local',
              created_at: subStat.mtime.toISOString(),
            });
          }
        }
      }
    }
  }
  
  return files;
}
