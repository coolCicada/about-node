import http from 'http';
import path from 'path';
import fs from 'fs';
import mime from 'mime';

const server = http.createServer((req, res) => {
  let filePath = path.resolve('.', './www', '.' + req.url);
  console.log('filePath:', filePath);

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const isDir = stats.isDirectory();
    if (isDir) {
      filePath = path.join(filePath, 'index.html');
    }
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const { ext } = path.parse(filePath);
      res.writeHead(200, { 'Content-Type': mime.getType(ext)});
      const fileStream = fs.createReadStream(filePath);
      return fileStream.pipe(res);
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>Not Found</h1>');
});

server.listen(8080, () => {
  console.log(`opened server on`, server.address());
})