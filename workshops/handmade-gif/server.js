let img = [];

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const GIFEncoder = require("gifencoder");
const uploadsDir = path.join(__dirname, "public");
const jsonFilePath = path.join(uploadsDir, "files.json");

const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

const fastifyStatic = require("@fastify/static");

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, ".data"), // Serve the "uploads" directory
  prefix: "/.data/", // URL path prefix for accessing files
  decorateReply: false,
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

const seo = require("./src/seo.json");

if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// page routes below

fastify.get("/editor", function (request, reply) {
  let params = { x: 0 };
  return reply.view("/src/pages/editor.hbs", params);
});

fastify.get("/examples", function (request, reply) {
  let params = { x: 0 };
  return reply.view("/src/pages/examples.hbs", params);
});

fastify.get("/archive", function (request, reply) {
  let fileList = [];
  let params;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      fileList = JSON.parse(data); // Parse existing JSON
    } catch (parseErr) {
      console.error("Error parsing JSON file:", parseErr);
    }
  });

  params = { list: fileList };
  return reply.view("/src/pages/archive.hbs", params);
});

fastify.get("/", function (request, reply) {
  let params = { seo: seo };

  return reply.view("/src/pages/index.hbs", params);
});

fastify.post("/del_img", function(request,reply){
  
  removeFilenameFromJSON(request.body.num);
  
  return reply.redirect("/archive");
  
});

fastify.post("/save_img", function (request, reply) {
  let params = {};

  let img = request.body.img;
  let rows = parseInt(request.body.rows);
  let cols = parseInt(request.body.cols);
  let x_off = parseInt(request.body.x_off);
  let y_off = parseInt(request.body.y_off);
  let wid = parseInt(request.body.w);
  let hig = parseInt(request.body.h);
  let alt = request.body.alt;

  saveBase64Image(img);

  return reply.view("/src/pages/archive.hbs", params);
  
  ///////////////////////////////////////////////// chopping function below
  async function saveBase64Image(base64String) {
    let filename;
    try {
      const uploadDir = path.join(__dirname, ".data");

      // Ensure uploads directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Extract Base64 data
      const matches = base64String.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!matches) throw new Error("Invalid Base64 string");

      const ext = matches[1].split("/")[1]; // Get file extension
      const buffer = Buffer.from(matches[2], "base64");
      filename = `image_${Date.now()}`;
      const filePath = path.join(uploadDir, `${filename}.png`);
      addFilenameToJson(filename);
      // Save file
      await fs.promises.writeFile(filePath, buffer);
      return { success: true, filePath: `/.data/${filename}.png` };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      fs.readFile(jsonFilePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading JSON file:", err);
          return;
        }
        try {
          let fileList = JSON.parse(data); // Parse existing JSON
          console.log(fileList);
          chopImage(fileList[0], cols, rows, x_off, y_off, wid, hig)
            .then(() => {console.log("GIF created successfully!");})
            .catch((err) => console.error("Error:", err));
        } catch (parseErr) {
          console.error("Error parsing JSON file:", parseErr);
        }finally{
          // delete image here?
        }
      });
    }
  }
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);



function removeFilenameFromJSON(index) {

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    let fileList = [];
    try {
      fileList = JSON.parse(data); // Parse existing JSON
      console.log(fileList);
    } catch (parseErr) {
      console.error("Error parsing JSON file:", parseErr);
    }

    fileList.splice(index,1); // remove element using splice
    console.log(fileList);

    fs.writeFile(
      jsonFilePath,
      JSON.stringify(fileList, null, 2),
      (writeErr) => {
        if (writeErr) console.error("Error writing JSON file:", writeErr);
      }
    );
  });
}


function addFilenameToJson(filename) {
  if (!fs.existsSync(jsonFilePath)) {
    fs.writeFileSync(jsonFilePath, JSON.stringify([]));
  }

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    let fileList = [];
    try {
      fileList = JSON.parse(data); // Parse existing JSON
      console.log(fileList);
    } catch (parseErr) {
      console.error("Error parsing JSON file:", parseErr);
    }

    fileList.unshift(filename); // add new filename to beginning of array

    fs.writeFile(
      jsonFilePath,
      JSON.stringify(fileList, null, 2),
      (writeErr) => {
        if (writeErr) console.error("Error writing JSON file:", writeErr);
      }
    );
  });
}

 function deleteImage(filename) {
  const filePath = path.join(__dirname, ".data", `${filename}.png`);
  
  console.log('Trying to delete:', filePath);
  
  try {
    fs.unlink(filePath); // Delete the file
    console.log(`Deleted: ${filePath}`);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

// async function deleteImage(filename) {
//   const filePath = path.join(__dirname, ".data", filename,".png");
  
//   console.log('Trying to delete:', filePath);
  
//   try {
//     await fs.unlink(filePath); // Delete the file
//     console.log(`Deleted: ${filePath}`);
//   } catch (err) {
//     console.error("Error deleting file:", err);
//   }
// }

async function chopImage(fileName, cols, rows, xoff, yoff, W, H) {
  const image = sharp(`.data/${fileName}.png`);
  const metadata = await image.metadata();
  const h = H;
  const w = W;
  // const h = Math.floor(metadata.height - yoff) / rows;
  // const w = Math.floor(metadata.width - xoff) / cols;
  console.log(h);
  console.log(w);

  const encoder = new GIFEncoder(w, h);
  encoder
    .createReadStream()
    .pipe(fs.createWriteStream(`.data/${fileName}.gif`));
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(100); // 500ms per frame
  encoder.setQuality(10);

  // Process each square
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col * w + xoff;
      const top = row * h + yoff;
      const outputBuffer = await image
        .extract({ left, top, width: w, height: h })
        .raw()
        .toBuffer();
      encoder.addFrame(outputBuffer);
    }
  }

  encoder.finish();
}

