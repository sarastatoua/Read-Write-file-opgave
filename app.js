import express from "express";
import fs from "node:fs";
import { title } from "node:process";

const app = express();
app.set("view engine", "pug");
app.use(express.static("public")); //Middleware til at tilgå tingene i vores public folder (såsom billeder) - anvender faktisk primært pga. images i dette tilfælde

app.get(/.*/, (request, response) => {
  // /.*/ er et wildcard - den tager en vilkårlig path, som vi vælger
  const folderPath = request.path.substring(1); //Gør at folderpath er lig med det der bliver skrevet, i stedet for ':path'
  if (fs.statSync(folderPath).isDirectory()) {
    let list = fs.readdirSync(folderPath); // Går ind under den valgte path og kigger på de andre directories derinde (hence readdirSync )
    response.render("frontpage", { elements: list, currentDir: folderPath }); //Tager fat i frontpage.pug og tager fat  i de elementer der er i listen og den nuværende directory (den der er angivet)
  } else if (folderPath.endsWith(".txt")) {
    response.render("textFile", {
      fileName: folderPath,
      fileContent: fs.readFileSync(folderPath, "utf-8"),
    }); //filecontent er hvad der indeholder i .txt filen - derfor læser vi den
  } else {
    response.render("imagesPug", { fileName: folderPath.substring(6)}); //substring(6) fjerner "public/" fra pathen, så det passer med hvordan vi har sat vores static middleware op
  }
});

app.listen(2020, () => {
  console.log("Serveren kører på: http://localhost:2020/public/");
});
